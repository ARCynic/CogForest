import { fables } from "./fables.js";
import { satire } from "./satire.js";
import { language } from "./language.js";
import { musicAsRegulation } from "./music-as-regulation.js";
import { fragments } from "./fragments.js";

// Map by section key (used everywhere)
export const forestBySection = {
  fables,
  satire,
  language,
  "music-as-regulation": musicAsRegulation,
  fragments
};

// Optional: flattened list (sometimes useful)
export const allForestWritings = Object.values(forestBySection).flat();

/**
 * Find a writing by (section + slug) OR by id.
 * - If `section` matches a known key, we search in that section first.
 * - If not found, we fallback to global search.
 */
export function findWriting(sectionOrId, maybeSlug) {
  // Case A: findWriting(section, slug)
  if (maybeSlug) {
    const section = sectionOrId;
    const slug = maybeSlug;

    const list = forestBySection[section] || [];
    const hit = list.find((w) => w?.slug === slug);
    if (hit) return hit;

    // fallback (in case data has wrong section)
    return allForestWritings.find((w) => w?.slug === slug) || null;
  }

  // Case B: findWriting(id)
  const id = sectionOrId;
  return allForestWritings.find((w) => w?.id === id) || null;
}