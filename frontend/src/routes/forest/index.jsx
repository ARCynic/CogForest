import React from "react";

import StickyStack from "../../components/forest/StickyStack.jsx";
import ForestCardLite from "../../components/forest/ForestCardLite.jsx";

import Iridescence from "../../components/forest/Iridescence.jsx";
import bgForest from "../../assets/bg_forest.png";

import stampFables from "../../assets/stamp_fables.png";
import stampSatire from "../../assets/stamp_satire.png";
import stampLanguage from "../../assets/stamp_language.png";
import stampMusic from "../../assets/stamp_music.png";
import stampFragments from "../../assets/stamp_fragments.png";

const regions = [
  {
    key: "fables",
    to: "/fables",
    emoji: "🦊",
    title: "Fables for Kids",
    description:
      "Simple stories with clear scenes and quiet lessons.",
    stamp: stampFables,
    accent: "#00e5ff"
  },
  {
    key: "satire",
    to: "/satire",
    emoji: "☠️",
    title: "Satirical Theatre",
    description:
      "Short scenes that expose incentives, status, and institutional nonsense.",
    stamp: stampSatire,
    accent: "#ff3bd4"
  },
  {
    key: "language",
    to: "/language",
    emoji: "🌍",
    title: "Language & Culture",
    description:
      "Notes on self-learning languages, cultural patterning, and how meaning shifts across contexts.",
    stamp: stampLanguage,
    accent: "#2dd4bf"
  },
  {
    key: "music-regulation",
    to: "/music-as-regulation",
    emoji: "🎛️",
    title: "Music as Regulation",
    description:
      "Pieces on using sound and rhythm to steady attention and mood.",
    stamp: stampMusic,
    accent: "#8b5cf6"
  },
  {
    key: "fragments",
    to: "/fragments",
    emoji: "🪶",
    title: "Philosophical Fragments",
    description:
      "Short reflections on choice, control, responsibility, and meaning.",
    stamp: stampFragments,
    accent: "#a3a3a3"
  }
];

export default function ForestIndex() {
  return (
    <div className="relative min-h-[calc(100vh-6rem)]">
      {/* PAGE-WIDE BACKGROUND (image) */}
      <div className="pointer-events-none fixed inset-0 -z-30" aria-hidden="true">
        <img src={bgForest} alt="" className="h-full w-full object-cover opacity-70" />
      </div>

      {/* IRIDESCENCE LAYER (visible + subtle) */}
      <div
        className="pointer-events-none fixed inset-0 -z-20 opacity-25 mix-blend-screen"
        aria-hidden="true"
      >
        <Iridescence
          color={[0.0, 0.9, 1.0]} // dark-cyan/cyan vibe
          mouseReact={false}
          amplitude={0.08}
          speed={0.75}
        />
      </div>

      {/* READABILITY WASH */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/90" />
      </div>

      {/* Header */}
      <header className="mx-auto max-w-5xl px-2 sm:px-0">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Cognitive Forest
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            Short writings and small tools about attention, bias, meaning, and modern life.
          </p>
        </div>
      </header>

      {/* Sticky stack (Approach B) */}
      <div className="mt-5">
        <StickyStack top="18vh" step={14} minScale={0.92} maxScale={1.0} minOpacity={0.78} maxOpacity={1.0}>
          {regions.map((r) => (
            <ForestCardLite
              key={r.key}
              to={r.to}
              title={r.title}
              description={r.description}
              stampSrc={r.stamp}
              emoji={r.emoji}
              accent={r.accent}
            />
          ))}
        </StickyStack>
      </div>
      {/* About / disclaimer */}
      <section className="mx-auto mt-14 max-w-5xl px-2 sm:px-0">
        <div className="rounded-3xl bg-black/60 ring-1 ring-white/10 p-6 sm:p-8">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            About the Cognitive Forest
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/70">
            These writings come from long observation of human systems—how people learn, adapt,
            cooperate, lie, heal, and leave. Some pieces are playful; some are sharp; some are
            unfinished by design. Characters and events are fictional and are not intended to depict
            any real person. If a reader finds similarities, that’s a mirror—not a claim.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Unless stated otherwise, this work is not offered for unsolicited commercial reuse or
            replication. If you want to reference, translate, adapt, or collaborate, contact me and
            we’ll do it properly.
          </p>
        </div>

        <div className="h-16" />
      </section>


    </div>
  );
}