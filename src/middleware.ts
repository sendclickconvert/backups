import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const clean = url.pathname.slice(0, -1) + url.search;
    return new Response(null, {
      status: 301,
      headers: { Location: clean }
    });
  }

  return next();
});
