import Stripe from 'stripe';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const GHL_WEBHOOK = "https://services.leadconnectorhq.com/hooks/qS83M3cJvj01NjchLqjy/webhook-trigger/2d374217-8302-4e79-95c9-4786777a4a29";
const POST = async ({ request }) => {
  try {
    const { amount, currency, metadata } = await request.json();
    const stripeMetadata = {};
    if (metadata?.company_name) stripeMetadata.company_name = String(metadata.company_name).slice(0, 200);
    if (metadata?.invoice_number) stripeMetadata.invoice_number = String(metadata.invoice_number).slice(0, 500);
    if (metadata?.invoice_amount) stripeMetadata.invoice_amount = String(metadata.invoice_amount).slice(0, 50);
    if (metadata?.convenience_fee) stripeMetadata.convenience_fee = String(metadata.convenience_fee).slice(0, 50);
    if (metadata?.service_type) stripeMetadata.service_type = String(metadata.service_type).slice(0, 100);
    if (metadata?.notes) stripeMetadata.notes = String(metadata.notes).slice(0, 500);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: stripeMetadata
    });
    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    const { company_name, invoice_number, service_needed, notes, amount, invoice_amount, convenience_fee } = await request.json();
    fetch(GHL_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_name: String(company_name || "").slice(0, 200),
        invoice_number: String(invoice_number || "").slice(0, 500),
        service_needed: String(service_needed || "").slice(0, 100),
        notes: String(notes || "").slice(0, 500),
        amount: String(amount || ""),
        invoice_amount: String(invoice_amount || ""),
        convenience_fee: String(convenience_fee || "")
      })
    }).catch(() => {
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
