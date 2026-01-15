import React from "react";
import { Link } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function ForestCardLite({
  to,
  title,
  description,

  // stamp
  stampSrc,
  stampAlt = "",

  // header emoji (optional)
  emoji,

  // accent glow
  accent = "#00e5ff",

  // NEW: meta (optional)
  author,
  date,
  // optional tiny label (eg “Draft”, “New”, “Series #3”)
  badge,

  // NEW: layout controls
  minHeight = 260,          // card height (x)
  split = [1.75, 1],           // [text, stamp] ratio (2x : x)
  stampSide = "right",      // "right" | "left"

  // NEW: CTA
  ctaLabel = "Enter",

  className = "",
  children
}) {
  const [textRatio, stampRatio] = Array.isArray(split) ? split : [2, 1];
  const gridTemplateColumns =
    stampSide === "right"
      ? `${textRatio}fr ${stampRatio}fr`
      : `${stampRatio}fr ${textRatio}fr`;

  const TextCol = (
    <div className="flex flex-col justify-center p-6 sm:p-8">
      <div className="flex items-center gap-2">
        {emoji ? (
          <span className="text-3xl leading-none" aria-hidden="true">
            {emoji}
          </span>
        ) : null}

        {to ? (
          <Link
            to={to}
            className="text-2xl font-semibold tracking-tight text-white hover:underline underline-offset-4 sm:text-4xl"
          >
            {title}
          </Link>
        ) : (
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
        )}
      </div>

      {/* Meta row */}
      {(author || date || badge) ? (
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/55">
          {badge ? (
            <span className="rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10">
              {badge}
            </span>
          ) : null}
          {author ? <span className="text-white/60">{author}</span> : null}
          {author && date ? <span className="text-white/25">•</span> : null}
          {date ? <span>{date}</span> : null}
        </div>
      ) : null}

      {description ? (
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70 sm:text-[15px]">
          {description}
        </p>
      ) : null}

      {children ? <div className="mt-4">{children}</div> : null}

      {to ? (
        <div className="mt-6">
          <Link
            to={to}
            className={cx(
              "inline-flex items-center gap-2 rounded-xl",
              "bg-white/5 px-4 py-2",
              "ring-1 ring-white/10",
              "text-normal font-semibold text-white/85",
              "hover:bg-white/8 hover:text-white hover:ring-white/15",
              "transition"
            )}
          >
            {ctaLabel} <span className="text-white/60">⁉️</span>
          </Link>
        </div>
      ) : null}
    </div>
  );

  const StampCol = (
    <div className="relative flex items-center justify-center p-1 sm:p-1">
      <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-black/10 to-transparent" />
      {stampSrc ? (
        <img
          src={stampSrc}
          alt={stampAlt || `${title} stamp`}
          className={cx(
            "relative z-[1] h-full w-full object-contain",
            "opacity-90",
            "transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          )}
          draggable="false"
        />
      ) : (
        <div className="relative z-[1] flex h-full w-full items-center justify-center rounded-2xl ring-1 ring-white/10 bg-white/5">
          <span className="text-white/40 text-sm">stamp missing</span>
        </div>
      )}
    </div>
  );

  return (
    <article
      className={cx(
        "group relative overflow-hidden rounded-3xl",
        "bg-black/90 ring-1 ring-white/10",
        "transition-transform duration-200 ease-out hover:-translate-y-0.5",
        className
      )}
      style={{ minHeight }}
    >
      {/* accent glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(700px circle at 15% 0%, ${hexToRgba(
            accent,
            0.18
          )}, transparent 55%)`
        }}
      />

      {/* Grid: 1 col on mobile, custom split on md+ */}
      <div
        className="relative grid grid-cols-1 md:grid-cols-2"
        style={{
          ...(typeof window !== "undefined"
            ? { gridTemplateColumns: undefined }
            : null)
        }}
      >
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns, gridColumn: "1 / -1" }}
        >
          {stampSide === "left" ? StampCol : TextCol}
          {stampSide === "left" ? TextCol : StampCol}
        </div>

        {/* Mobile fallback: stack */}
        <div className="md:hidden">
          {TextCol}
          {StampCol}
        </div>
      </div>
    </article>
  );
}

function hexToRgba(hex, a = 1) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}