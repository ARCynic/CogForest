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
import BlurText from "../../components/forest/BlurText.jsx";
// const handleAnimationComplete = () => {
//   console.log('Animation completed!');
// };
const regions = [
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
    key: "fragments",
    to: "/fragments",
    emoji: "🪶",
    title: "Philosophical Fragments",
    description:
      "Short reflections on choice, control, responsibility, and meaning.",
    stamp: stampFragments,
    accent: "#a3a3a3"
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
    key: "music-regulation",
    to: "/music-as-regulation",
    emoji: "🎛️",
    title: "Music as Regulation",
    description:
      "Pieces on using sound and rhythm to steady attention and mood.",
    stamp: stampMusic,
    accent: "#8b5cf6"
  },

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
        <div className="flex justify-center">
          <div
            className={[
              "inline-block rounded-3xl p-5 sm:p-6",
              "bg-black/45 backdrop-blur-md",
              "ring-1 ring-white/10",
              "transition",
              "hover:ring-emerald-200/30",
              "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.10)]",
              "text-center", // center text inside box
              "min-w-[min(520px,100%)]", // keeps it nicely sized but responsive
            ].join(" ")}
          >
            <div className="flex justify-center">
            <BlurText
              text="Welcome to CogForest"
              delay={120}
              animateBy="words"
              direction="top"
              // onAnimationComplete={handleAnimationComplete}
              className="text-2xl font-semibold tracking-tight text-white"
            />
            </div>

            <BlurText
              text="A curated collection by ARCynic: philosophical lenses, short observations, satire, and fragments on cognition, learning, and modern life. Scroll down to explore the sections."
              delay={160}
              animateBy="words"
              direction="top"
              className="mt-2 text-sm justify-center sm:text-base text-white/70"
            />
          </div>
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
          <h2 className="text-lg font-semibold tracking-tight text-white text-center">
          Important Disclaimer!
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-white/70 text-center">
          Characters, images and events in this site are fictional and do not depict any real person. If any reader finds similarities, that reflects the reader’s interpretation, not a claim of identity.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/70 text-center">
            Unless stated otherwise, this work is not available for unsolicited commercial reuse, reproduction, or redistribution.
            If you wish to reference, adapt, or collaborate, reach out via the{" "}
            <a
              href="/contact"
              className="text-cyan-300 hover:text-emerald-200 underline decoration-white/20 underline-offset-4 transition"
            >
              Contact Form
            </a>{" "}
            .
          </p>
        </div>

        <div className="h-3" />
      </section>


    </div>
  );
}