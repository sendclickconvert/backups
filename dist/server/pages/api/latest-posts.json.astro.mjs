export { renderers } from '../../renderers.mjs';

const prerender = false;
let cache = null;
const TTL_MS = 10 * 60 * 1e3;
function stripHtml(input) {
  return (input || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
async function GET() {
  const now = Date.now();
  const cacheHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=60",
    "Surrogate-Control": "max-age=600, stale-while-revalidate=60"
  };
  if (cache && now - cache.ts < TTL_MS) {
    return new Response(JSON.stringify(cache.data), { headers: cacheHeaders });
  }
  const wpUrl = "https://blog.crst.net/wp-json/wp/v2/posts?per_page=6&_fields=link,date,title";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5e3);
    const res = await fetch(wpUrl, {
      headers: { "User-Agent": "crst.net latest-posts fetch" },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const payload2 = { ok: false, error: `WP_HTTP_${res.status}`, posts: [] };
      cache = { ts: now, data: payload2 };
      return new Response(JSON.stringify(payload2), {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    }
    const raw = await res.json();
    const posts = raw.map((p) => ({
      url: p.link,
      title: stripHtml(p.title?.rendered || "Untitled"),
      date: p.date
    }));
    const payload = { ok: true, posts };
    cache = { ts: now, data: payload };
    return new Response(JSON.stringify(payload), { headers: cacheHeaders });
  } catch (e) {
    const payload = { ok: false, error: "FETCH_FAILED", posts: [] };
    cache = { ts: now, data: payload };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
