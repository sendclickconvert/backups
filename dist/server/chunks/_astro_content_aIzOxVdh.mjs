import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { g as removeBase, a as isCoreRemotePath, V as VALID_INPUT_FORMATS, p as prependForwardSlash } from './astro/assets-service_BYKmPoOG.mjs';
import { A as AstroError, a9 as UnknownContentCollectionError, g as createComponent, aa as renderUniqueStylesheet, ab as renderScriptElement, ac as createHeadAndContent, j as renderComponent, r as renderTemplate, u as unescapeHTML } from './astro/server_CTVANr5S.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isCoreRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1);
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class DataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_BcEe_9wP.mjs');
      if (data.default instanceof Map) {
        return DataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return DataStore.fromMap(map);
    } catch {
    }
    return new DataStore();
  }
  static async fromMap(data) {
    const store = new DataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = DataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://crst.net", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./_astro_asset-imports_D9aVaOQr.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        const entry = {
          ...rawEntry,
          data,
          collection
        };
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, {})?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/data-articles/how-often-to-update-your-mailing-list.md": () => import('./how-often-to-update-your-mailing-list_PKgi3hX-.mjs'),"/src/content/data-articles/how-to-clean-a-mailing-list.md": () => import('./how-to-clean-a-mailing-list_Bi8LVMFN.mjs'),"/src/content/data-articles/mailing-list-accuracy.md": () => import('./mailing-list-accuracy_UJe97jhB.mjs'),"/src/content/data-articles/mailing-list-selects.md": () => import('./mailing-list-selects_CU6D81Uh.mjs'),"/src/content/data-articles/saturation-vs-targeted-mailing-lists.md": () => import('./saturation-vs-targeted-mailing-lists_CgJdTWLL.mjs'),"/src/content/data-articles/voter-file-mailing-lists.md": () => import('./voter-file-mailing-lists_9aAkGgtt.mjs'),"/src/content/data-articles/what-is-ncoa-processing.md": () => import('./what-is-ncoa-processing_B4oXfHj6.mjs'),"/src/content/dm-articles/direct-mail-for-real-estate-agents-hudson-valley.md": () => import('./direct-mail-for-real-estate-agents-hudson-valley_CAN-Sa-b.mjs'),"/src/content/dm-articles/direct-mail-response-rates.md": () => import('./direct-mail-response-rates_BGn2_7hK.mjs'),"/src/content/dm-articles/direct-mail-roi.md": () => import('./direct-mail-roi_CuLgLBSl.mjs'),"/src/content/dm-articles/direct-mail-vs-digital-marketing.md": () => import('./direct-mail-vs-digital-marketing_DKuDym_X.mjs'),"/src/content/dm-articles/eddm-every-door-direct-mail.md": () => import('./eddm-every-door-direct-mail_DAOJKZk7.mjs'),"/src/content/dm-articles/eddm-vs-targeted-direct-mail.md": () => import('./eddm-vs-targeted-direct-mail_Du5ZIBI0.mjs'),"/src/content/dm-articles/how-long-does-direct-mail-take.md": () => import('./how-long-does-direct-mail-take_B9-s1U7B.mjs'),"/src/content/dm-articles/how-much-does-direct-mail-cost.md": () => import('./how-much-does-direct-mail-cost_C3u53LAU.mjs'),"/src/content/dm-articles/how-to-build-a-mailing-list-for-direct-mail.md": () => import('./how-to-build-a-mailing-list-for-direct-mail_CGl9iKVk.mjs'),"/src/content/dm-articles/postcard-marketing.md": () => import('./postcard-marketing_B2zkT9gk.mjs'),"/src/content/dm-articles/postcard-vs-letter-direct-mail.md": () => import('./postcard-vs-letter-direct-mail_Bda3JT12.mjs'),"/src/content/dm-articles/usps-informed-delivery-direct-mail-campaign.md": () => import('./usps-informed-delivery-direct-mail-campaign_E6S3BKud.mjs'),"/src/content/eddm-articles/eddm-postcard-sizes-and-specs.md": () => import('./eddm-postcard-sizes-and-specs_BMamh_wy.mjs'),"/src/content/eddm-articles/eddm-printing-requirements.md": () => import('./eddm-printing-requirements_CEjcNDfX.mjs'),"/src/content/eddm-articles/eddm-retail-vs-eddm-bmeu.md": () => import('./eddm-retail-vs-eddm-bmeu_BAcEMl9S.mjs'),"/src/content/eddm-articles/how-much-does-eddm-cost.md": () => import('./how-much-does-eddm-cost_aoUkTdWB.mjs'),"/src/content/eddm-articles/how-to-set-up-an-eddm-campaign.md": () => import('./how-to-set-up-an-eddm-campaign_ddIYgzkv.mjs'),"/src/content/eddm-articles/what-is-every-door-direct-mail.md": () => import('./what-is-every-door-direct-mail_Pgv1DRaZ.mjs'),"/src/content/graphic-design-articles/brochure-design-for-direct-mail.md": () => import('./brochure-design-for-direct-mail_CN0M1Y0f.mjs'),"/src/content/graphic-design-articles/direct-mail-call-to-action-guide.md": () => import('./direct-mail-call-to-action-guide_DDDtCsJr.mjs'),"/src/content/graphic-design-articles/direct-mail-design-best-practices.md": () => import('./direct-mail-design-best-practices_Cra0XXcG.mjs'),"/src/content/graphic-design-articles/eddm-design-requirements-and-specs.md": () => import('./eddm-design-requirements-and-specs_BDxGYFyo.mjs'),"/src/content/graphic-design-articles/how-to-design-a-direct-mail-postcard.md": () => import('./how-to-design-a-direct-mail-postcard_Mi2qKwz1.mjs'),"/src/content/mailing-articles/bulk-mailing-vs-first-class.md": () => import('./bulk-mailing-vs-first-class_5RiwFrIK.mjs'),"/src/content/mailing-articles/diy-vs-mail-house-direct-mail.md": () => import('./diy-vs-mail-house-direct-mail_D979xfpS.mjs'),"/src/content/mailing-articles/inkjet-addressing-for-direct-mail.md": () => import('./inkjet-addressing-for-direct-mail_DFxO7CYY.mjs'),"/src/content/mailing-articles/presort-mail-discount-guide.md": () => import('./presort-mail-discount-guide_DzwoZaYa.mjs'),"/src/content/mailing-articles/what-is-a-lettershop.md": () => import('./what-is-a-lettershop_D9PTGwjS.mjs'),"/src/content/nonprofit-articles/annual-fund-direct-mail-strategy.md": () => import('./annual-fund-direct-mail-strategy_B07PtBa8.mjs'),"/src/content/nonprofit-articles/eddm-vs-targeted-mail-for-nonprofits.md": () => import('./eddm-vs-targeted-mail-for-nonprofits_DFsEioPE.mjs'),"/src/content/nonprofit-articles/how-to-qualify-for-nonprofit-bulk-mail.md": () => import('./how-to-qualify-for-nonprofit-bulk-mail_DVxg3xO1.mjs'),"/src/content/nonprofit-articles/nonprofit-donor-acquisition-by-mail.md": () => import('./nonprofit-donor-acquisition-by-mail_xFBDNFmL.mjs'),"/src/content/nonprofit-articles/nonprofit-postage-rates.md": () => import('./nonprofit-postage-rates_CX5KiEg0.mjs'),"/src/content/nonprofit-articles/writing-nonprofit-fundraising-letters.md": () => import('./writing-nonprofit-fundraising-letters_C_iYnG2l.mjs'),"/src/content/printing-articles/brochure-printing-guide.md": () => import('./brochure-printing-guide_CbfCs6Cv.mjs'),"/src/content/printing-articles/commercial-printing-vs-online-printing.md": () => import('./commercial-printing-vs-online-printing_SVksd0CB.mjs'),"/src/content/printing-articles/direct-mail-paper-stock-guide.md": () => import('./direct-mail-paper-stock-guide_Cb5ubJ2u.mjs'),"/src/content/printing-articles/flyer-printing-for-small-business.md": () => import('./flyer-printing-for-small-business_Bm1F7Dxp.mjs'),"/src/content/printing-articles/how-to-prepare-print-ready-files.md": () => import('./how-to-prepare-print-ready-files_BPTuf9R5.mjs'),"/src/content/printing-articles/postcard-printing-for-direct-mail.md": () => import('./postcard-printing-for-direct-mail_-vFoP9dT.mjs'),"/src/content/products/banner.md": () => import('./banner_TumSLND4.mjs'),"/src/content/products/brochure.md": () => import('./brochure_ZDBHXs1M.mjs'),"/src/content/products/car-magnet.md": () => import('./car-magnet_DeLyKT2Z.mjs'),"/src/content/products/certified-mailing-package.md": () => import('./certified-mailing-package_06ds9jyN.mjs'),"/src/content/products/eddm-card.md": () => import('./eddm-card_CcXJsS9Z.mjs'),"/src/content/products/envelope.md": () => import('./envelope_BIAzSXxV.mjs'),"/src/content/products/greeting-card.md": () => import('./greeting-card_DfzIYzB5.mjs'),"/src/content/products/lawn-sign.md": () => import('./lawn-sign_BLphwf_B.mjs'),"/src/content/products/magnet-postcard.md": () => import('./magnet-postcard_V1PJV-0e.mjs'),"/src/content/products/palm-card.md": () => import('./palm-card_BwnKix7a.mjs'),"/src/content/products/plastic-postcard.md": () => import('./plastic-postcard_T49Ofyqq.mjs'),"/src/content/products/postcard.md": () => import('./postcard_0si2U7Ah.mjs'),"/src/content/products/presentation-folder.md": () => import('./presentation-folder_CLF_D2uG.mjs'),"/src/content/products/raffle-ticket.md": () => import('./raffle-ticket_Cpy0DDk8.mjs'),"/src/content/products/scratchoff-postcard.md": () => import('./scratchoff-postcard_Dez4XxN0.mjs'),"/src/content/products/simple-mail-package.md": () => import('./simple-mail-package_CTLxQXg4.mjs'),"/src/content/products/up-envelope.md": () => import('./up-envelope_Dtfnu9w0.mjs'),"/src/content/products/up-letter.md": () => import('./up-letter_CKqPYlJ8.mjs'),"/src/content/products/up-palm-card.md": () => import('./up-palm-card_CAJa9PZQ.mjs'),"/src/content/products/up-postcard.md": () => import('./up-postcard_D72Xvx93.mjs'),"/src/content/school-articles/how-to-reach-voters-for-school-elections.md": () => import('./how-to-reach-voters-for-school-elections_Byx7y-1W.mjs'),"/src/content/school-articles/school-budget-vote-direct-mail-guide.md": () => import('./school-budget-vote-direct-mail-guide_CNKDyHeL.mjs'),"/src/content/school-articles/school-district-mailing-list-guide.md": () => import('./school-district-mailing-list-guide_B7WVANqz.mjs'),"/src/content/union-articles/union-printing-for-political-campaigns.md": () => import('./union-printing-for-political-campaigns_CaHDC3ux.mjs'),"/src/content/union-articles/what-is-the-union-bug.md": () => import('./what-is-the-union-bug_fSHgZsfW.mjs'),"/src/content/union-articles/why-choose-a-union-print-shop.md": () => import('./why-choose-a-union-print-shop_CTEgWXHA.mjs'),"/src/content/web-design-articles/local-web-designer-vs-national-agency.md": () => import('./local-web-designer-vs-national-agency_Cnrfhqwh.mjs'),"/src/content/web-design-articles/small-business-website-cost-guide.md": () => import('./small-business-website-cost-guide_BA2wVB40.mjs'),"/src/content/web-design-articles/website-design-for-hudson-valley-businesses.md": () => import('./website-design-for-hudson-valley-businesses_CnqWD90P.mjs'),"/src/content/web-design-articles/what-to-expect-from-web-design-project.md": () => import('./what-to-expect-from-web-design-project_DvBxXdzM.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"data-articles":{"type":"content","entries":{"how-often-to-update-your-mailing-list":"/src/content/data-articles/how-often-to-update-your-mailing-list.md","mailing-list-accuracy":"/src/content/data-articles/mailing-list-accuracy.md","how-to-clean-a-mailing-list":"/src/content/data-articles/how-to-clean-a-mailing-list.md","mailing-list-selects":"/src/content/data-articles/mailing-list-selects.md","saturation-vs-targeted-mailing-lists":"/src/content/data-articles/saturation-vs-targeted-mailing-lists.md","voter-file-mailing-lists":"/src/content/data-articles/voter-file-mailing-lists.md","what-is-ncoa-processing":"/src/content/data-articles/what-is-ncoa-processing.md"}},"dm-articles":{"type":"content","entries":{"direct-mail-for-real-estate-agents-hudson-valley":"/src/content/dm-articles/direct-mail-for-real-estate-agents-hudson-valley.md","direct-mail-response-rates":"/src/content/dm-articles/direct-mail-response-rates.md","direct-mail-roi":"/src/content/dm-articles/direct-mail-roi.md","direct-mail-vs-digital-marketing":"/src/content/dm-articles/direct-mail-vs-digital-marketing.md","eddm-vs-targeted-direct-mail":"/src/content/dm-articles/eddm-vs-targeted-direct-mail.md","how-long-does-direct-mail-take":"/src/content/dm-articles/how-long-does-direct-mail-take.md","eddm-every-door-direct-mail":"/src/content/dm-articles/eddm-every-door-direct-mail.md","how-to-build-a-mailing-list-for-direct-mail":"/src/content/dm-articles/how-to-build-a-mailing-list-for-direct-mail.md","how-much-does-direct-mail-cost":"/src/content/dm-articles/how-much-does-direct-mail-cost.md","postcard-vs-letter-direct-mail":"/src/content/dm-articles/postcard-vs-letter-direct-mail.md","postcard-marketing":"/src/content/dm-articles/postcard-marketing.md","usps-informed-delivery-direct-mail-campaign":"/src/content/dm-articles/usps-informed-delivery-direct-mail-campaign.md"}},"eddm-articles":{"type":"content","entries":{"eddm-postcard-sizes-and-specs":"/src/content/eddm-articles/eddm-postcard-sizes-and-specs.md","eddm-printing-requirements":"/src/content/eddm-articles/eddm-printing-requirements.md","eddm-retail-vs-eddm-bmeu":"/src/content/eddm-articles/eddm-retail-vs-eddm-bmeu.md","how-much-does-eddm-cost":"/src/content/eddm-articles/how-much-does-eddm-cost.md","how-to-set-up-an-eddm-campaign":"/src/content/eddm-articles/how-to-set-up-an-eddm-campaign.md","what-is-every-door-direct-mail":"/src/content/eddm-articles/what-is-every-door-direct-mail.md"}},"mailing-articles":{"type":"content","entries":{"bulk-mailing-vs-first-class":"/src/content/mailing-articles/bulk-mailing-vs-first-class.md","diy-vs-mail-house-direct-mail":"/src/content/mailing-articles/diy-vs-mail-house-direct-mail.md","inkjet-addressing-for-direct-mail":"/src/content/mailing-articles/inkjet-addressing-for-direct-mail.md","presort-mail-discount-guide":"/src/content/mailing-articles/presort-mail-discount-guide.md","what-is-a-lettershop":"/src/content/mailing-articles/what-is-a-lettershop.md"}},"nonprofit-articles":{"type":"content","entries":{"annual-fund-direct-mail-strategy":"/src/content/nonprofit-articles/annual-fund-direct-mail-strategy.md","how-to-qualify-for-nonprofit-bulk-mail":"/src/content/nonprofit-articles/how-to-qualify-for-nonprofit-bulk-mail.md","eddm-vs-targeted-mail-for-nonprofits":"/src/content/nonprofit-articles/eddm-vs-targeted-mail-for-nonprofits.md","nonprofit-donor-acquisition-by-mail":"/src/content/nonprofit-articles/nonprofit-donor-acquisition-by-mail.md","writing-nonprofit-fundraising-letters":"/src/content/nonprofit-articles/writing-nonprofit-fundraising-letters.md","nonprofit-postage-rates":"/src/content/nonprofit-articles/nonprofit-postage-rates.md"}},"graphic-design-articles":{"type":"content","entries":{"brochure-design-for-direct-mail":"/src/content/graphic-design-articles/brochure-design-for-direct-mail.md","direct-mail-call-to-action-guide":"/src/content/graphic-design-articles/direct-mail-call-to-action-guide.md","direct-mail-design-best-practices":"/src/content/graphic-design-articles/direct-mail-design-best-practices.md","eddm-design-requirements-and-specs":"/src/content/graphic-design-articles/eddm-design-requirements-and-specs.md","how-to-design-a-direct-mail-postcard":"/src/content/graphic-design-articles/how-to-design-a-direct-mail-postcard.md"}},"printing-articles":{"type":"content","entries":{"brochure-printing-guide":"/src/content/printing-articles/brochure-printing-guide.md","direct-mail-paper-stock-guide":"/src/content/printing-articles/direct-mail-paper-stock-guide.md","commercial-printing-vs-online-printing":"/src/content/printing-articles/commercial-printing-vs-online-printing.md","flyer-printing-for-small-business":"/src/content/printing-articles/flyer-printing-for-small-business.md","how-to-prepare-print-ready-files":"/src/content/printing-articles/how-to-prepare-print-ready-files.md","postcard-printing-for-direct-mail":"/src/content/printing-articles/postcard-printing-for-direct-mail.md"}},"products":{"type":"content","entries":{"brochure":"/src/content/products/brochure.md","car-magnet":"/src/content/products/car-magnet.md","banner":"/src/content/products/banner.md","certified-mailing-package":"/src/content/products/certified-mailing-package.md","eddm-card":"/src/content/products/eddm-card.md","lawn-sign":"/src/content/products/lawn-sign.md","greeting-card":"/src/content/products/greeting-card.md","magnet-postcard":"/src/content/products/magnet-postcard.md","palm-card":"/src/content/products/palm-card.md","postcard":"/src/content/products/postcard.md","presentation-folder":"/src/content/products/presentation-folder.md","plastic-postcard":"/src/content/products/plastic-postcard.md","envelope":"/src/content/products/envelope.md","raffle-ticket":"/src/content/products/raffle-ticket.md","scratchoff-postcard":"/src/content/products/scratchoff-postcard.md","simple-mail-package":"/src/content/products/simple-mail-package.md","up-envelope":"/src/content/products/up-envelope.md","up-letter":"/src/content/products/up-letter.md","up-palm-card":"/src/content/products/up-palm-card.md","up-postcard":"/src/content/products/up-postcard.md"}},"school-articles":{"type":"content","entries":{"how-to-reach-voters-for-school-elections":"/src/content/school-articles/how-to-reach-voters-for-school-elections.md","school-budget-vote-direct-mail-guide":"/src/content/school-articles/school-budget-vote-direct-mail-guide.md","school-district-mailing-list-guide":"/src/content/school-articles/school-district-mailing-list-guide.md"}},"union-articles":{"type":"content","entries":{"union-printing-for-political-campaigns":"/src/content/union-articles/union-printing-for-political-campaigns.md","why-choose-a-union-print-shop":"/src/content/union-articles/why-choose-a-union-print-shop.md","what-is-the-union-bug":"/src/content/union-articles/what-is-the-union-bug.md"}},"web-design-articles":{"type":"content","entries":{"small-business-website-cost-guide":"/src/content/web-design-articles/small-business-website-cost-guide.md","website-design-for-hudson-valley-businesses":"/src/content/web-design-articles/website-design-for-hudson-valley-businesses.md","what-to-expect-from-web-design-project":"/src/content/web-design-articles/what-to-expect-from-web-design-project.md","local-web-designer-vs-national-agency":"/src/content/web-design-articles/local-web-designer-vs-national-agency.md"}}};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/data-articles/how-often-to-update-your-mailing-list.md": () => import('./how-often-to-update-your-mailing-list_BYD-zTeb.mjs'),"/src/content/data-articles/how-to-clean-a-mailing-list.md": () => import('./how-to-clean-a-mailing-list_BwxihcCU.mjs'),"/src/content/data-articles/mailing-list-accuracy.md": () => import('./mailing-list-accuracy_C_tILYBa.mjs'),"/src/content/data-articles/mailing-list-selects.md": () => import('./mailing-list-selects_DClEDkB2.mjs'),"/src/content/data-articles/saturation-vs-targeted-mailing-lists.md": () => import('./saturation-vs-targeted-mailing-lists_A2qX7--z.mjs'),"/src/content/data-articles/voter-file-mailing-lists.md": () => import('./voter-file-mailing-lists_xn4QtsNS.mjs'),"/src/content/data-articles/what-is-ncoa-processing.md": () => import('./what-is-ncoa-processing_DxYNv1tR.mjs'),"/src/content/dm-articles/direct-mail-for-real-estate-agents-hudson-valley.md": () => import('./direct-mail-for-real-estate-agents-hudson-valley_DDB8nhmc.mjs'),"/src/content/dm-articles/direct-mail-response-rates.md": () => import('./direct-mail-response-rates_IBYBwVAt.mjs'),"/src/content/dm-articles/direct-mail-roi.md": () => import('./direct-mail-roi_B5urLVYP.mjs'),"/src/content/dm-articles/direct-mail-vs-digital-marketing.md": () => import('./direct-mail-vs-digital-marketing_DAq-VoFG.mjs'),"/src/content/dm-articles/eddm-every-door-direct-mail.md": () => import('./eddm-every-door-direct-mail_CxKBJy03.mjs'),"/src/content/dm-articles/eddm-vs-targeted-direct-mail.md": () => import('./eddm-vs-targeted-direct-mail_B0D7Ff89.mjs'),"/src/content/dm-articles/how-long-does-direct-mail-take.md": () => import('./how-long-does-direct-mail-take_DjjTXUii.mjs'),"/src/content/dm-articles/how-much-does-direct-mail-cost.md": () => import('./how-much-does-direct-mail-cost_Cvf9tYc4.mjs'),"/src/content/dm-articles/how-to-build-a-mailing-list-for-direct-mail.md": () => import('./how-to-build-a-mailing-list-for-direct-mail_CyjoHcJS.mjs'),"/src/content/dm-articles/postcard-marketing.md": () => import('./postcard-marketing_BLB9rdpj.mjs'),"/src/content/dm-articles/postcard-vs-letter-direct-mail.md": () => import('./postcard-vs-letter-direct-mail_BrfBl0tT.mjs'),"/src/content/dm-articles/usps-informed-delivery-direct-mail-campaign.md": () => import('./usps-informed-delivery-direct-mail-campaign_XhJCCurX.mjs'),"/src/content/eddm-articles/eddm-postcard-sizes-and-specs.md": () => import('./eddm-postcard-sizes-and-specs_DfGplsg6.mjs'),"/src/content/eddm-articles/eddm-printing-requirements.md": () => import('./eddm-printing-requirements_DNbr5dXa.mjs'),"/src/content/eddm-articles/eddm-retail-vs-eddm-bmeu.md": () => import('./eddm-retail-vs-eddm-bmeu_y_eaHiwr.mjs'),"/src/content/eddm-articles/how-much-does-eddm-cost.md": () => import('./how-much-does-eddm-cost_1WI0ovNK.mjs'),"/src/content/eddm-articles/how-to-set-up-an-eddm-campaign.md": () => import('./how-to-set-up-an-eddm-campaign_B_evxCeu.mjs'),"/src/content/eddm-articles/what-is-every-door-direct-mail.md": () => import('./what-is-every-door-direct-mail_BEGvxHbD.mjs'),"/src/content/graphic-design-articles/brochure-design-for-direct-mail.md": () => import('./brochure-design-for-direct-mail_ByKsIcua.mjs'),"/src/content/graphic-design-articles/direct-mail-call-to-action-guide.md": () => import('./direct-mail-call-to-action-guide_D76b8SvL.mjs'),"/src/content/graphic-design-articles/direct-mail-design-best-practices.md": () => import('./direct-mail-design-best-practices_TwtaJVbO.mjs'),"/src/content/graphic-design-articles/eddm-design-requirements-and-specs.md": () => import('./eddm-design-requirements-and-specs_ZFtjN8hU.mjs'),"/src/content/graphic-design-articles/how-to-design-a-direct-mail-postcard.md": () => import('./how-to-design-a-direct-mail-postcard_B6IjzjH5.mjs'),"/src/content/mailing-articles/bulk-mailing-vs-first-class.md": () => import('./bulk-mailing-vs-first-class_DJW9IFwB.mjs'),"/src/content/mailing-articles/diy-vs-mail-house-direct-mail.md": () => import('./diy-vs-mail-house-direct-mail_DYxaVjTw.mjs'),"/src/content/mailing-articles/inkjet-addressing-for-direct-mail.md": () => import('./inkjet-addressing-for-direct-mail_BuzkvnFO.mjs'),"/src/content/mailing-articles/presort-mail-discount-guide.md": () => import('./presort-mail-discount-guide_CfsTtA_V.mjs'),"/src/content/mailing-articles/what-is-a-lettershop.md": () => import('./what-is-a-lettershop_DRBjdk__.mjs'),"/src/content/nonprofit-articles/annual-fund-direct-mail-strategy.md": () => import('./annual-fund-direct-mail-strategy_BxqbiABw.mjs'),"/src/content/nonprofit-articles/eddm-vs-targeted-mail-for-nonprofits.md": () => import('./eddm-vs-targeted-mail-for-nonprofits_CMn0k80q.mjs'),"/src/content/nonprofit-articles/how-to-qualify-for-nonprofit-bulk-mail.md": () => import('./how-to-qualify-for-nonprofit-bulk-mail_B2bpuh6G.mjs'),"/src/content/nonprofit-articles/nonprofit-donor-acquisition-by-mail.md": () => import('./nonprofit-donor-acquisition-by-mail_DW0IHjyr.mjs'),"/src/content/nonprofit-articles/nonprofit-postage-rates.md": () => import('./nonprofit-postage-rates_CLN14IEm.mjs'),"/src/content/nonprofit-articles/writing-nonprofit-fundraising-letters.md": () => import('./writing-nonprofit-fundraising-letters_BcFMec4n.mjs'),"/src/content/printing-articles/brochure-printing-guide.md": () => import('./brochure-printing-guide_DG2iT10D.mjs'),"/src/content/printing-articles/commercial-printing-vs-online-printing.md": () => import('./commercial-printing-vs-online-printing_CH5j627h.mjs'),"/src/content/printing-articles/direct-mail-paper-stock-guide.md": () => import('./direct-mail-paper-stock-guide_LRp2jiDK.mjs'),"/src/content/printing-articles/flyer-printing-for-small-business.md": () => import('./flyer-printing-for-small-business_Cd0f3hZ7.mjs'),"/src/content/printing-articles/how-to-prepare-print-ready-files.md": () => import('./how-to-prepare-print-ready-files_DII_36rT.mjs'),"/src/content/printing-articles/postcard-printing-for-direct-mail.md": () => import('./postcard-printing-for-direct-mail_CRFyhkfp.mjs'),"/src/content/products/banner.md": () => import('./banner_-iSaIktB.mjs'),"/src/content/products/brochure.md": () => import('./brochure_CcyArU_V.mjs'),"/src/content/products/car-magnet.md": () => import('./car-magnet_D1C3stIj.mjs'),"/src/content/products/certified-mailing-package.md": () => import('./certified-mailing-package_BeUfTTpD.mjs'),"/src/content/products/eddm-card.md": () => import('./eddm-card_DkTEqyLx.mjs'),"/src/content/products/envelope.md": () => import('./envelope_D3TCOIL1.mjs'),"/src/content/products/greeting-card.md": () => import('./greeting-card_DN_pqA-b.mjs'),"/src/content/products/lawn-sign.md": () => import('./lawn-sign_IbaL7fDn.mjs'),"/src/content/products/magnet-postcard.md": () => import('./magnet-postcard_BrMpDViO.mjs'),"/src/content/products/palm-card.md": () => import('./palm-card_Dsf_SoFi.mjs'),"/src/content/products/plastic-postcard.md": () => import('./plastic-postcard_DvR9CrO6.mjs'),"/src/content/products/postcard.md": () => import('./postcard_DKDROE1I.mjs'),"/src/content/products/presentation-folder.md": () => import('./presentation-folder_DDQyTVBS.mjs'),"/src/content/products/raffle-ticket.md": () => import('./raffle-ticket_C74Lbuc0.mjs'),"/src/content/products/scratchoff-postcard.md": () => import('./scratchoff-postcard_60enrLt3.mjs'),"/src/content/products/simple-mail-package.md": () => import('./simple-mail-package_Dl0Rzr5W.mjs'),"/src/content/products/up-envelope.md": () => import('./up-envelope_DsxGeNsz.mjs'),"/src/content/products/up-letter.md": () => import('./up-letter_D59sL0qG.mjs'),"/src/content/products/up-palm-card.md": () => import('./up-palm-card_BsV6lOq6.mjs'),"/src/content/products/up-postcard.md": () => import('./up-postcard_CXdOjT0c.mjs'),"/src/content/school-articles/how-to-reach-voters-for-school-elections.md": () => import('./how-to-reach-voters-for-school-elections_Bt6uPLzl.mjs'),"/src/content/school-articles/school-budget-vote-direct-mail-guide.md": () => import('./school-budget-vote-direct-mail-guide_CFuamv9f.mjs'),"/src/content/school-articles/school-district-mailing-list-guide.md": () => import('./school-district-mailing-list-guide_DiNEQiGb.mjs'),"/src/content/union-articles/union-printing-for-political-campaigns.md": () => import('./union-printing-for-political-campaigns_CgbocPlv.mjs'),"/src/content/union-articles/what-is-the-union-bug.md": () => import('./what-is-the-union-bug_B3QBsgrO.mjs'),"/src/content/union-articles/why-choose-a-union-print-shop.md": () => import('./why-choose-a-union-print-shop_BdrIClKB.mjs'),"/src/content/web-design-articles/local-web-designer-vs-national-agency.md": () => import('./local-web-designer-vs-national-agency_Dz_nInX9.mjs'),"/src/content/web-design-articles/small-business-website-cost-guide.md": () => import('./small-business-website-cost-guide_DurSnGcs.mjs'),"/src/content/web-design-articles/website-design-for-hudson-valley-businesses.md": () => import('./website-design-for-hudson-valley-businesses_D1S5297e.mjs'),"/src/content/web-design-articles/what-to-expect-from-web-design-project.md": () => import('./what-to-expect-from-web-design-project_0zrnMRV9.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

export { getCollection as g };
