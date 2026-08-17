import { f as createAstro, g as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://crst.net");
const $$AnswerBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AnswerBlock;
  const { answer } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<p class="answer-block"><strong>${answer}</strong></p>`;
}, "/home/runner/workspace/src/components/AnswerBlock.astro", void 0);

export { $$AnswerBlock as $ };
