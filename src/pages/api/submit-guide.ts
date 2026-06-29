export const prerender = false;

import type { APIRoute } from 'astro';
import { GHL } from '../../data/site';

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { 'cf-turnstile-response': token, ...formData } = body as Record<string, string>;

  const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;

  if (secretKey) {
    if (!token) {
      return new Response(JSON.stringify({ error: 'Security check failed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const verifyRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: request.headers.get('CF-Connecting-IP') ?? undefined,
        }),
      }
    );

    const verifyData = await verifyRes.json() as { success: boolean };

    if (!verifyData.success) {
      return new Response(JSON.stringify({ error: 'Security check failed.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  try {
    const ghlRes = await fetch(GHL.guideWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, source: 'informed-delivery-guide' }),
    });

    if (!ghlRes.ok) throw new Error('GHL webhook failed');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Submission failed. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
