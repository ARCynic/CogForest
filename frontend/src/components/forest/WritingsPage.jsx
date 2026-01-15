// src/components/forest/WritingsPage.jsx
import React, { useRef, useLayoutEffect, useMemo } from "react";
import gsap from "gsap";

import ForestActionButton from "./ForestActionButton.jsx";

const WritingsPage = ({
  mode = "list",
  writings = [],
  selectedId,
  onSelect,

  fxSlot,
  fxRef,
  fxPosition = "over",
  fxPointerEvents = "none",

  className = ""
}) => {
  const rootRef = useRef(null);
  const paperRef = useRef(null);

  const activeContent = useMemo(() => {
    if (mode === "single" && selectedId) {
      return writings.filter((w) => w?.id === selectedId);
    }
    return writings;
  }, [mode, writings, selectedId]);

  const activeWriting = useMemo(() => {
    return mode === "single" ? activeContent?.[0] ?? null : null;
  }, [mode, activeContent]);

  useLayoutEffect(() => {
    // ✅ Keep only entrance animation; remove floating/breathing/crease loops
    const ctx = gsap.context(() => {
      gsap.from(paperRef.current, {
        y: 120,
        opacity: 0,
        rotation: 0,
        scale: 0.98,
        duration: 0.9,
        ease: "power3.out"
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (id) => onSelect?.(id);

  const getBodyText = (writing) => {
    if (Array.isArray(writing?.content)) return writing.content.join("\n\n");
    if (typeof writing?.content === "string") return writing.content;
    if (typeof writing?.body === "string") return writing.body;
    return "";
  };

  const pageTitle =
    mode === "single" && activeWriting?.title ? activeWriting.title : "Writings";

  const authorText = activeWriting?.author ?? activeWriting?.by ?? null;
  const dateText = activeWriting?.date ? String(activeWriting.date) : null;

  const backToSection =
    mode === "single" && activeWriting?.section ? `/${activeWriting.section}` : null;

  return (
    <div
      ref={rootRef}
      // ✅ FIX: Removed 'overflow-x-hidden' which was forcing an inner scroll container
      // ✅ FIX: Removed 'min-h-screen' to let Layout handle height
      className={`relative w-full bg-gradient-to-r from-black/10 via-transparent to-black/10 flex justify-center p-4 ${className}`}
    >

      {/* Ambient desk background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#292524_0%,#0c0a09_100%)]" />

      {/* Paper */}
      <div
        ref={paperRef}
        // ✅ REMOVE overflow-hidden (was clipping content)
        className="relative w-full max-w-4xl bg-[#f2efe9] text-stone-800 shadow-2xl flex flex-col"
        style={{
          // ✅ REMOVE clipPath (was clipping bottom)
          boxShadow:
            "0px 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        }}
      >
        {/* 1) grain */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none z-0 mix-blend-multiply"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0px, transparent 2px, #a8a29e 2px, #a8a29e 2.5px)"
          }}
        />

        {/* 2) stains */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 10% 20%, rgba(139, 115, 85, 0.1) 0%, transparent 150px), radial-gradient(circle at 85% 85%, rgba(60, 50, 40, 0.05) 0%, transparent 200px)"
          }}
        />

        {/* 3) crease shimmer (static now) */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none z-10 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(0,0,0,0.05) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            backgroundPositionX: "0%"
          }}
        />

        {/* FX Slot (under) */}
        {fxSlot && fxPosition === "under" && (
          <div
            ref={fxRef}
            className={`absolute inset-0 z-0 ${
              fxPointerEvents === "none" ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {fxSlot}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-14">
          <header className="mb-10 border-b-2 border-stone-800/10 pb-4">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900 opacity-90">
              {pageTitle}
            </h1>

            {mode === "single" ? (
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
                {authorText ? <span className="font-semibold">{authorText}</span> : null}
                {authorText && dateText ? <span className="text-stone-400">•</span> : null}
                {dateText ? <span className="font-mono">{dateText}</span> : null}
              </div>
            ) : (
              <div className="mt-2 text-xs uppercase tracking-widest text-stone-500 font-semibold">
                Archive
              </div>
            )}

          </header>

          <div className="space-y-12">
            {activeContent.map((writing, idx) => {
              const bodyText = getBodyText(writing);

              return (
                <article key={writing.id} className="group relative">
                  {mode === "list" && idx > 0 && (
                    <div className="absolute -top-6 left-0 right-0 h-px bg-stone-300 opacity-50 border-t border-dashed border-stone-400" />
                  )}

                  <div
                    className={`transition-opacity duration-300 ${
                      mode === "list" && onSelect ? "cursor-pointer hover:opacity-80" : ""
                    }`}
                    onClick={() => mode === "list" && handleSelect(writing.id)}
                    tabIndex={mode === "list" ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && mode === "list") handleSelect(writing.id);
                    }}
                  >
                    {mode === "list" ? (
                      <div className="flex items-baseline justify-between mb-3">
                        {writing.title ? (
                          <h2 className="text-xl font-serif font-medium text-stone-800">
                            {writing.title}
                          </h2>
                        ) : null}

                        {writing.date ? (
                          <span className="text-xs font-mono text-stone-500 ml-4 shrink-0">
                            {String(writing.date)}
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="prose prose-stone prose-sm sm:prose-base max-w-none font-serif leading-snug text-stone-700 whitespace-pre-line leading snug">
                      {mode === "list" ? (
                        <p className="line-clamp-3 opacity-80">{bodyText}</p>
                      ) : (
                        <div>{bodyText}</div>
                      )}
                    </div>

                    {mode === "single" && writing?.img ? (
                      <div className="mt-12">
                        <img
                          src={writing.img}
                          alt={writing.title ? `${writing.title} image` : "writing image"}
                          className="mx-auto max-h-[520px] w-auto rounded-2xl ring-1 ring-stone-900/10"
                          draggable="false"
                        />
                      </div>
                    ) : null}
                  </div>
                </article>
                
              );
            })}
              {backToSection ? (
              <div className="mt-4">
                <ForestActionButton to={backToSection} variant="ghost" size="sm" title="Back to section">
                  Back to section
                </ForestActionButton>
              </div>
            ) : null}
          </div>
        </div>

        {/* FX Slot (over) */}
        {fxSlot && fxPosition === "over" && (
          <div
            ref={fxRef}
            className={`absolute inset-0 z-20 mix-blend-multiply ${
              fxPointerEvents === "none" ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            {fxSlot}
          </div>
        )}

        {/* corner curl: kept, but now it won’t clip content */}
        <div
          className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-stone-300 to-transparent pointer-events-none z-30 opacity-50"
          style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
        />
      </div>
    </div>
  );
};

export default WritingsPage;