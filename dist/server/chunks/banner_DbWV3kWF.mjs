import { g as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';

const html = "";

				const frontmatter = {"intro":"TODO_SPEC","specs":{"sizes":"TODO_SPEC","stock":"TODO_SPEC","inkFinish":"TODO_SPEC","minQuantity":"TODO_SPEC","quantityBreaks":"TODO_SPEC","turnaround":"5–7 business days from proof approval"},"useCases":["TODO_SPEC"],"howToOrder":["TODO_SPEC"],"faqs":[{"q":"TODO_SPEC","a":"TODO_SPEC"}],"relatedProducts":["lawn-sign","car-magnet","postcard"]};
				const file = "/home/runner/workspace/src/content/products/banner.md";
				const url = undefined;
				function rawContent() {
					return "";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
