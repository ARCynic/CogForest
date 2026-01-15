import React, { useEffect, useMemo, useRef } from "react";

const cx = (...c) => c.filter(Boolean).join(" ");

/**
 * StickyStack (Approach B)
 * - Cards are `position: sticky`
 * - Minimal scroll listener updates a CSS var for scale/opacity
 * - No Lenis, no pin math, no transform fighting => no jitter
 */
export default function StickyStack({
  children,
  className = "",
  top = "18vh", // where the card "sticks"
  step = 12, // px offset per card (stack spacing)
  minScale = 0.92,
  maxScale = 1.0,
  minOpacity = 0.78,
  maxOpacity = 1.0
}) {
  const refs = useRef([]);

  const items = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const els = refs.current.filter(Boolean);
      if (!els.length) return;

      const stickLine = window.innerHeight * 0.18; // aligns with top=18vh (rough)
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        const r = el.getBoundingClientRect();

        // distance from sticky line (smaller => more "active")
        const d = Math.abs(r.top - stickLine);

        // normalize (0..1)
        const t = Math.max(0, Math.min(1, 1 - d / 420));

        const scale = minScale + (maxScale - minScale) * t;
        const opacity = minOpacity + (maxOpacity - minOpacity) * t;

        el.style.setProperty("--ss-scale", String(scale));
        el.style.setProperty("--ss-opacity", String(opacity));
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [minScale, maxScale, minOpacity, maxOpacity]);

  return (
    <div className={cx("relative mx-auto w-full max-w-5xl", className)}>
      {items.map((child, i) => (
        <div
          key={i}
          ref={(el) => (refs.current[i] = el)}
          className="relative"
          style={{
            position: "sticky",
            top,
            transform: "translateZ(0)",
            // stack spacing (each later card sits slightly lower)
            paddingTop: i === 0 ? 0 : step
          }}
        >
          <div
            className="transform-gpu will-change-transform"
            style={{
              transform: "scale(var(--ss-scale, 0.96))",
              opacity: "var(--ss-opacity, 0.9)",
              transition: "transform 120ms ease-out, opacity 120ms ease-out"
            }}
          >
            {child}
          </div>
        </div>
      ))}

      {/* bottom spacer so last sticky releases cleanly */}
      <div className="h-[40vh]" aria-hidden="true" />
    </div>
  );
}