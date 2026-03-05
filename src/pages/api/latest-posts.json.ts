export const prerender = false;

type WPPost = {
  link: string;
  date: string;
  title: { rendered: string };
};

let cache: { ts: number; data: any } | null = null;
const TTL_MS = 10 * 60 * 1000;

function stripHtml(input: string) {
  return (input || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function GET() {
  const now = Date.now();
  if (cache && now - cache.ts < TTL_MS) {
    return new Response(JSON.stringify(cache.data), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=600',
      },
    });
  }

  const wpUrl =
    'https://blog.crst.net/wp-json/wp/v2/posts?per_page=6&_fields=link,date,title';

  try {
    const res = await fetch(wpUrl, {
      headers: { 'User-Agent': 'crst.net latest-posts fetch' },
    });

    if (!res.ok) {
      const payload = { ok: false, error: `WP_HTTP_${res.status}`, posts: [] as any[] };
      cache = { ts: now, data: payload };
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    const raw = (await res.json()) as WPPost[];

    const posts = raw.map((p) => ({
      url: p.link,
      title: stripHtml(p.title?.rendered || 'Untitled'),
      date: p.date,
    }));

    const payload = { ok: true, posts };
    cache = { ts: now, data: payload };

    return new Response(JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=600',
      },
    });
  } catch (e: any) {
    const payload = { ok: false, error: 'FETCH_FAILED', posts: [] as any[] };
    cache = { ts: now, data: payload };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }
}
