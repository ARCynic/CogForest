import React, { useMemo } from "react";
import stamp from "../../../assets/stamp_fables.png";
import { fables } from "../../../data/forest/fables.js";
import SectionGrid from "../../../components/forest/SectionGrid.jsx";
import ForestCardLite2 from "../../../components/forest/ForestCardLite2.jsx";

// function shuffle(arr) {
//   const a = [...arr];
//   for (let i = a.length - 1; i > 0; i--) {
//     const j = (Math.random() * (i + 1)) | 0;
//     [a[i], a[j]] = [a[j], a[i]];
//   }
//   return a;
// }

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    // ✅ FIX: Removed unnecessary escape (\-) -> (-)
    .replace(/[^a-z0-9-]/g, "");
}

// ✅ minimal helper: pick header meta from the first item in that category
function getCategoryMeta(items) {
  const first = items?.[0] ?? {};
  return {
    emoji: first.subemoji ?? "",
    // supports both spellings
    summary: first.subsummary ??  "",
    time: first.time ?? ""
  };
}

export default function FablesIndex() {
  const sections = useMemo(() => {
    const seriesItems = fables.filter((e) => !!e.seriesKey || !!e.isSeries);
    const singles = fables.filter((e) => !e.seriesKey && !e.isSeries);

    // group series by seriesKey
    const seriesMap = new Map();
    for (const e of seriesItems) {
      const key = e.seriesKey ?? "series";
      if (!seriesMap.has(key)) seriesMap.set(key, []);
      seriesMap.get(key).push(e);
    }

    // sort within each series (if order exists)
          const seriesSections = [...seriesMap.entries()].map(([seriesKey, data]) => {
        const sorted = [...data].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
        const seriesTitle = sorted[0]?.seriesTitle || seriesKey;
        const meta = getCategoryMeta(sorted);

        const episodesLabel = `${sorted.length} ${sorted.length === 1 ? "episode" : "episodes"}`;

        // ✅ Title line becomes: "(emoji) Series: Catacomb — 6 episodes"
        const headerTitle = meta.emoji
          ? `${meta.emoji} Series: ${seriesTitle} — ${episodesLabel}`
          : `Series: ${seriesTitle} — ${episodesLabel}`;

        // ✅ Keep subtitle for summary/time only (no more "6 parts" here)
        const subtitleParts = [];
        if (meta.summary) subtitleParts.push(meta.summary);
        if (meta.time) subtitleParts.push(`⏱ ${meta.time}`);

        return {
          id: `series-${slugify(seriesKey)}`,
          title: headerTitle,
          subtitle: subtitleParts.join(" · "),
          data: sorted
        };
      });

    // group singles by category/subsection
    const singlesMap = new Map();
    for (const e of singles) {
      const key = e.category ?? e.subsection ?? "All";
      if (!singlesMap.has(key)) singlesMap.set(key, []);
      singlesMap.get(key).push(e);
    }

    // ✅ only change: title/subtitle enriched with emoji + summary + time + count
    const singlesSections = [...singlesMap.entries()].map(([title, data]) => {
      const meta = getCategoryMeta(data);
      const count = data.length;

      const headerTitle = meta.emoji ? `${meta.emoji} ${title}` : String(title);

      // Build a single subtitle line like:
      // "Short parables and morals. · ⏱ 18 min total · 7 writings"
      const parts = [];
      if (meta.summary) parts.push(meta.summary);
      if (meta.time) parts.push(`⏱ ${meta.time}`);
      parts.push(`${count} ${count === 1 ? "Writing" : "Writings"}`);

      return {
        id: `singles-${slugify(title)}`,
        title: headerTitle,
        subtitle: parts.join(" · "),
        data
      };
    });

    return [...seriesSections, ...singlesSections].filter((s) => (s?.data?.length ?? 0) > 0);
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-2 sm:px-0">
      <Header
        emoji="🦊"
        title="Fables for Kids"
        desc="Simple stories with clear scenes and quiet lessons."
        stamp={stamp}
      />

      <div className="mt-10">
        <SectionGrid
          sections={sections}
          gridClassName="grid-cols-1 lg:grid-cols-2"
          renderCard={(item) => (
            <ForestCardLite2
              to={`/${item.section}/${item.slug}`}
              title={item.title}
              description={item.excerpt ?? item.summary ?? item.description ?? ""}
              stampSrc={item.img ?? stamp}
              emoji={null}
              accent="#00e5ff"
            >
              <div className="mt-3 text-xs text-white/55 flex flex-wrap gap-x-3 gap-y-1">
                <span>{item.author ?? item.by ?? "—"}</span>
                <span className="text-white/35">•</span>
                <span>{item.date ? String(item.date) : "—"}</span>

                {item.seriesKey ? (
                  <>
                    <span className="text-white/35">•</span>
                    <span className="text-white/60">#{item.order ?? "—"}</span>
                  </>
                ) : null}
              </div>
            </ForestCardLite2>
          )}
        />
      </div>

      <div className="h-5" />
    </div>
  );
}

function Header({ emoji, title, desc, stamp }) {
  return (
    <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2 text-white/85">
          <span className="text-2xl" aria-hidden="true">{emoji}</span>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">{desc}</p>
      </div>

      <div className="relative w-full max-w-[320px] shrink-0 overflow-hidden rounded-3xl bg-black/70 ring-1 ring-white/10 sm:mt-1 mx-auto sm:mx-0">
        <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/10 to-transparent" />
        <img src={stamp} alt="" className="relative h-44 w-full object-contain p-5 opacity-90" draggable="false" />
      </div>
    </div>
  );
}