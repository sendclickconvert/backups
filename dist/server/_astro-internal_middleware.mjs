import { d as defineMiddleware, s as sequence } from './chunks/index_84XdVqQq.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_DcPDsK_A.mjs';
import 'cookie';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    const clean = url.pathname.slice(0, -1) + url.search;
    return new Response(null, {
      status: 301,
      headers: { Location: clean }
    });
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
