import { handler as ssrHandler } from './dist/server/entry.mjs';
import express from 'express';
import compression from 'compression';
import fs from 'fs';
import path from 'path';

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
// Inserted at line 1 of the middleware chain so every response path is covered:
// pre-rendered HTML (res.sendFile), static assets (express.static), SSR + /api (ssrHandler).
// Enforced — verified clean via Incognito (0 blocked:csp), all payment/form paths confirmed.
// NO Strict-Transport-Security — Replit's edge sets it (blog.crst.net is HTTPS, includeSubDomains safe).
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://*.leadconnectorhq.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com https://*.leadconnectorhq.com https://assets.msgsndr.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.leadconnectorhq.com https://assets.msgsndr.com",
      "script-src 'self' https://*.leadconnectorhq.com https://*.googletagmanager.com https://*.google-analytics.com https://challenges.cloudflare.com https://links.crst.net https://js.stripe.com 'sha256-TIsCKC0x7tZhZK7IVj5sCCzZ9NyIKk+7KhLv5fngT3E=' 'sha256-Uwx7m+npaVrfQX0+ekjf3jcN4DpKG3Y09NyqV3nvrTc=' 'sha256-9da8aMdYj5v2hE3Y5rGvruXvd3YJFJp+vHaZEt9fnaU=' 'sha256-JD1vc3qRW6f9ySVFLMEjAtO/uLsIq6WZ9LjS37Q2+H8=' 'sha256-WN0hqek1jEauhlhWVVXeQPa5BD3f0rsMdmwSZtw1Cys='",
      "connect-src 'self' https://*.leadconnectorhq.com https://*.googletagmanager.com https://*.google-analytics.com https://services.msgsndr.com https://api.stripe.com",
      "frame-src https://player.vimeo.com https://*.leadconnectorhq.com https://challenges.cloudflare.com https://*.stripe.com",
      "upgrade-insecure-requests",
    ].join('; ')
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

app.use(compression({ threshold: 0 }));

// Trailing-slash redirect: enforce trailingSlash: 'never' at the request layer
app.use((req, res, next) => {
  if (req.path !== '/' && req.path.endsWith('/')) {
    const newPath = req.path.slice(0, -1);
    const queryString = req.originalUrl.includes('?')
      ? req.originalUrl.substring(req.originalUrl.indexOf('?'))
      : '';
    return res.redirect(301, newPath + queryString);
  }
  next();
});

// Short cache for crawlable index files — must-revalidate, no immutable.
// Sitemaps and robots.txt change on every build; a 1-year immutable header
// would prevent Googlebot from picking up new URLs after content updates.
app.use((req, res, next) => {
  if (/^\/(sitemap[^/]*\.xml|robots\.txt)$/.test(req.path)) {
    res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
    return express.static('dist/client', { redirect: false })(req, res, next);
  }
  next();
});

// Serve static assets (CSS, JS, images, fonts).
// redirect: false prevents express.static from issuing its own directory→slash
// redirect, which would conflict with the trailing-slash middleware above.
app.use(express.static('dist/client', { maxAge: '1y', immutable: true, redirect: false }));

// Serve pre-rendered Astro HTML pages.
// express.static falls through for directory paths when redirect: false.
// This layer maps /path → dist/client/path/index.html so those pages are served.
app.use((req, res, next) => {
  const indexPath = path.resolve(path.join('dist/client', req.path, 'index.html'));
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

app.use(ssrHandler);

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`);
});
