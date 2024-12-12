/* empty css                                     */
import { e as createComponent, r as renderTemplate, i as renderComponent, h as createAstro, m as maybeRenderHead, g as addAttribute } from '../../chunks/astro/server_AzqMR3Zz.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from '../../chunks/Layout_DFs_uayn.mjs';
import { b as background } from '../../chunks/background_Cs_XLUeZ.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$uuid = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$uuid;
  const { uuid } = Astro2.params;
  const res = await fetch(`https://valorant-api.com/v1/agents/${uuid}`);
  const agent = await res.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-xbpwlimq": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="container" data-astro-cid-xbpwlimq> <img id="background"${addAttribute(background.src, "src")} alt="" fetchpriority="high" data-astro-cid-xbpwlimq> <main data-astro-cid-xbpwlimq> <div class="container mx-auto p-8" data-astro-cid-xbpwlimq> <div class="bg-valorant-pattern bg-cover bg-center min-h-screen p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center" data-astro-cid-xbpwlimq> <div class="md:w-1/2" data-astro-cid-xbpwlimq> <h1 class="text-4xl font-bold text-valorant" data-astro-cid-xbpwlimq> ${agent.data.displayName} </h1> <p class="text-lg mb-4" data-astro-cid-xbpwlimq>${agent.data.description}</p> <h2 class="text-2xl font-semibold mb-4" data-astro-cid-xbpwlimq>Habilidades</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-astro-cid-xbpwlimq> ${agent.data.abilities.map((ability) => renderTemplate`<div${addAttribute(ability.slot, "key")} class="bg-valorant-dark p-4 rounded-lg shadow-2xl" data-astro-cid-xbpwlimq> <h3 class="text-xl font-bold" data-astro-cid-xbpwlimq>${ability.displayName}</h3> <p data-astro-cid-xbpwlimq>${ability.description}</p> <img${addAttribute(ability.displayIcon, "src")}${addAttribute(ability.displayName, "alt")} class="w-12 h-12 mt-2" data-astro-cid-xbpwlimq> </div>`)} </div> </div> <div class="md:w-1/2 flex justify-center" data-astro-cid-xbpwlimq> <img${addAttribute(agent.data.fullPortrait, "src")}${addAttribute(agent.data.displayName, "alt")} class="w-full max-w-lg" data-astro-cid-xbpwlimq> </div> </div> </div> </main> </div> ` })} `;
}, "C:/Users/crist/Desktop/ASTRO/api-valorant/src/pages/agent/[uuid].astro", void 0);

const $$file = "C:/Users/crist/Desktop/ASTRO/api-valorant/src/pages/agent/[uuid].astro";
const $$url = "/agent/[uuid]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$uuid,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
