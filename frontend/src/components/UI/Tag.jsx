import React from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Tag({
  children,
  className = "",
  tone = "cyan", // "neutral" | "cyan"
  size = "sm" // "sm" | "xs"
}) {
  const base =
    "inline-flex items-center rounded-full border backdrop-blur transition-colors";

  const sizing = size === "xs" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  const tones =
    tone === "cyan"
      ? "border-cyan-300/25 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15"
      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10";

  return (
    <span className={cx(base, sizing, tones, className)}>
      {children}
    </span>
  );
}