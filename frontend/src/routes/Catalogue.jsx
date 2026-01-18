import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { fables } from "../data/forest/fables.js";
import { satire } from "../data/forest/satire.js";
import { language } from "../data/forest/language.js";
import { fragments } from "../data/forest/fragments.js";
// IMPORTANT: adjust this import/export name to whatever your file actually exports
// Example possibilities:
//   export const musicAsRegulation = [...]
//   export const music = [...]
//   export const music_as_regulation = [...]
import { musicAsRegulation } from "../data/forest/music-as-regulation.js";

const cx = (...c) => c.filter(Boolean).join(" ");

function slugify(s) {
  return String(s ?? "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeItem(it) {
  const section = String(it.section ?? "unknown").trim();
  const category = String(it.category ?? "All").trim() || "All";

  const rawSeriesKey = typeof it.seriesKey === "string" ? it.seriesKey.trim() : null;
  const rawSeriesTitle = typeof it.seriesTitle === "string" ? it.seriesTitle.trim() : null;

  // Empty string seriesKey/seriesTitle are treated as "missing"
  const seriesKey =
    rawSeriesKey ||
    (it.isSeries ? `series-${slugify(rawSeriesTitle || it.title || it.id)}` : null);

  const seriesTitle = seriesKey ? (rawSeriesTitle || it.title || "Series") : null;

  return {
    id: it.id,
    title: it.title ?? "Untitled",
    to: `/${section}/${it.slug}`, // matches your existing pattern: /{section}/{slug}
    section,
    category,
    seriesKey,
    seriesTitle,
  };
}

function buildTree(entries) {
  // section -> category -> series? -> items
  const root = new Map();

  for (const e of entries) {
    if (!root.has(e.section)) root.set(e.section, new Map());
    const secMap = root.get(e.section);

    if (!secMap.has(e.category)) secMap.set(e.category, new Map());
    const catMap = secMap.get(e.category);

    const bucketKey = e.seriesKey ?? "__no_series__";
    if (!catMap.has(bucketKey)) {
      catMap.set(bucketKey, { title: e.seriesTitle, items: [] });
    }
    catMap.get(bucketKey).items.push(e);
  }

  // maps -> sorted arrays
  const sections = [];
  for (const [section, catMap] of root.entries()) {
    const categories = [];
    for (const [category, seriesMap] of catMap.entries()) {
      const buckets = [];
      for (const [k, b] of seriesMap.entries()) {
        buckets.push({
          id: `${section}/${category}/${k}`,
          title: b.title, // null for non-series
          items: [...b.items].sort((a, b) => a.title.localeCompare(b.title)),
        });
      }

      // non-series first
      buckets.sort((a, b) => {
        const aNo = a.title == null;
        const bNo = b.title == null;
        if (aNo !== bNo) return aNo ? -1 : 1;
        return String(a.title).localeCompare(String(b.title));
      });

      const count = buckets.reduce((s, b) => s + b.items.length, 0);
      categories.push({ id: `${section}/${category}`, title: category, count, buckets });
    }

    categories.sort((a, b) => a.title.localeCompare(b.title));
    const count = categories.reduce((s, c) => s + c.count, 0);
    sections.push({ id: section, title: section, count, categories });
  }

  sections.sort((a, b) => a.title.localeCompare(b.title));
  return sections;
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-white/65 ring-1 ring-white/10">
      {children}
    </span>
  );
}

export default function Catalogue() {
  const { pathname } = useLocation();
  const [q, setQ] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const all = useMemo(() => {
    const merged = [
      ...fables,
      ...satire,
      ...language,
      ...fragments,
      ...musicAsRegulation,
    ].map(normalizeItem);

    return merged;
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return all;
    return all.filter((e) => e.title.toLowerCase().includes(needle));
  }, [all, q]);

  const tree = useMemo(() => buildTree(filtered), [filtered]);

  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-0">
      {/* Header box (glass) */}
      <div
        className={cx(
          "mt-6 rounded-3xl p-5 sm:p-6",
          "bg-black/60 backdrop-blur",
          "ring-1 ring-emerald-200/15",
          "shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_0_0_1px_rgba(52,211,153,0.08)]",
          "transition",
          "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_0_0_1px_rgba(52,211,153,0.14)]"
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">Catalogue</h1>
            <p className="mt-1 text-sm text-white/60">
              Browse everything by section. Titles only.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-[420px] sm:flex-row sm:items-center sm:justify-end">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search titles…"
              className={cx(
                "h-11 w-full rounded-2xl bg-black/40 px-4 text-sm text-white/85",
                "ring-1 ring-white/10 outline-none",
                "focus:ring-emerald-200/30"
              )}
            />
            <button
              type="button"
              onClick={() => setResetKey((k) => k + 1)}
              className={cx(
                "h-11 rounded-2xl px-4 text-sm font-semibold",
                "bg-white/5 text-white/80 ring-1 ring-white/10",
                "hover:bg-white/10 hover:ring-white/15 transition"
              )}
              title="Collapse all"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* Tree */}
      <div key={resetKey} className="mt-5 space-y-3">
        {tree.map((sec) => (
          <details
            key={sec.id}
            className="rounded-3xl bg-black/55 backdrop-blur ring-1 ring-white/10"
          >
            <summary className="cursor-pointer list-none select-none flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-white/70">▸</span>
                <span className="text-white font-semibold uppercase tracking-[0.12em] text-[13px]">
                  {sec.title}
                </span>
                <Badge>{sec.count}</Badge>
              </div>
            </summary>

            <div className="px-4 pb-4 space-y-3">
              {sec.categories.map((cat) => (
                <details
                  key={cat.id}
                  className="rounded-2xl bg-black/30 ring-1 ring-white/10"
                >
                  <summary className="cursor-pointer list-none select-none flex items-center justify-between gap-4 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-white/60">▸</span>
                      <span className="text-white/80">{cat.title}</span>
                      <Badge>{cat.count}</Badge>
                    </div>
                  </summary>

                  <div className="px-4 pb-4 space-y-3">
                    {cat.buckets.map((bucket) => (
                      <div key={bucket.id} className="rounded-2xl bg-black/25 ring-1 ring-white/10">
                        {bucket.title ? (
                          <div className="px-4 py-2 text-xs text-white/60 border-b border-white/10">
                            Series:{" "}
                            <span className="text-white/85 font-semibold">
                              {bucket.title}
                            </span>
                          </div>
                        ) : null}

                        <ul className="p-2">
                          {bucket.items.map((it) => (
                            <li key={it.id} className="px-2">
                              <Link
                                to={it.to}
                                className={cx(
                                  "block rounded-xl px-3 py-2",
                                  "text-sm text-white/75",
                                  "hover:text-white hover:bg-gradient-to-r hover:from-cyan-300/10 hover:to-emerald-300/10",
                                  "hover:ring-1 hover:ring-emerald-200/20 transition",
                                  pathname === it.to
                                    ? "bg-white/5 ring-1 ring-white/10 text-white"
                                    : ""
                                )}
                              >
                                {it.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </details>
        ))}

        {tree.length === 0 ? (
          <div className="rounded-3xl bg-black/55 backdrop-blur ring-1 ring-white/10 p-6 text-sm text-white/60">
            No matches.
          </div>
        ) : null}
      </div>

      <div className="h-16" />
    </div>
  );
}