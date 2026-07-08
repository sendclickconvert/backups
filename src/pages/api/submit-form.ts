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

  // Required-field validation — must run before Turnstile/GHL so empty
  // submissions never reach the CRM.
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const firstName = (formData.firstName ?? '').trim();
  const lastName = (formData.lastName ?? '').trim();
  const email = (formData.email ?? '').trim();
  const message = (formData.message ?? '').trim();

  if (!firstName || !lastName || !email || !message || !EMAIL_PATTERN.test(email)) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify Turnstile token server-side (skip in dev if secret not set)
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

  // Forward to GHL webhook
  try {
    const ghlRes = await fetch(GHL.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, source: 'website' }),
    });

    if (!ghlRes.ok) throw new Error('GHL webhook failed');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Submission failed. Please call us.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
