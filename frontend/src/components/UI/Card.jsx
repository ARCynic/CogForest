import React from "react";
import ElectricBorder from "./ElectricBorder.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Card({
  className = "",
  children,
  borderColor = "#9dd9fcff", // default cyan
  borderSpeed = 0.5,
  borderChaos = 0.1,
  borderThickness = 0.5,
  ...props
}) {
  return (
    <ElectricBorder
      color={borderColor}
      speed={borderSpeed}
      chaos={borderChaos}
      thickness={borderThickness}
      className={cx("rounded-2xl", className)}
      {...props}
    >
      {/* group enables hover/focus effects */}
      <div
        className={cx(
          "group relative overflow-hidden rounded-2xl",
          // motion
          "transition-transform duration-200 ease-out",
          "hover:-translate-y-0.5 hover:scale-[1.01]",
          "focus-within:-translate-y-0.5 focus-within:scale-[1.01]"
        )}
      >
        {/* Spotlight layer (subtle) */}
        <div
          aria-hidden="true"
          className={cx(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200",
            "group-hover:opacity-100 group-focus-within:opacity-100"
          )}
          style={{
            background:
              "radial-gradient(600px circle at 20% 0%, rgba(0,229,255,0.14), transparent 55%), radial-gradient(420px circle at 85% 20%, rgba(255,255,255,0.05), transparent 60%)"
          }}
        />

        {/* Surface */}
        <div
          className={cx(
            "relative rounded-2xl bg-black/55 backdrop-blur",
            "ring-1 ring-white/10",
            // hover/focus ring + shadow (ashy glow)
            "transition-all duration-200 ease-out",
            "group-hover:ring-white/18 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
            "group-focus-within:ring-white/18 group-focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
            "p-5 text-white/80"
          )}
        >
          {children}
        </div>
      </div>
    </ElectricBorder>
  );
}

/**
 * InnerCard: “parallel side borders” (rails), not edge outline.
 * Use inside <Card> for nested content blocks.
 */
export function InnerCard({
  className = "",
  children,
  rails = "vertical", // "vertical" | "horizontal"
  ...props
}) {
  const railClasses =
    rails === "horizontal"
      ? "border-y border-white/12"
      : "border-x border-white/12";

  return (
    <div
      {...props}
      className={cx(
        "rounded-xl bg-white/5 px-4 py-3",
        railClasses,
        // small interaction (keeps it quieter than Card)
        "transition-colors duration-200",
        "hover:bg-white/7",
        className
      )}
    >
      {children}
    </div>
  );
}