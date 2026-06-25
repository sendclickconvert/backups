import { G as GHL } from '../../chunks/site_B1N_EUh-.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const { "cf-turnstile-response": token, ...formData } = body;
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (secretKey) {
    if (!token) {
      return new Response(JSON.stringify({ error: "Security check failed." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: request.headers.get("CF-Connecting-IP") ?? void 0
        })
      }
    );
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response(JSON.stringify({ error: "Security check failed." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
  try {
    const ghlRes = await fetch(GHL.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, source: "website" })
    });
    if (!ghlRes.ok) throw new Error("GHL webhook failed");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(JSON.stringify({ error: "Submission failed. Please call us." }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
