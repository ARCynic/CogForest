import React from "react";
import { Link } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function ForestActionButton({
  to,
  onClick,
  children,
  className = "",
  variant = "ghost", // "ghost" | "solid"
  size = "sm", // "sm" | "md"
  title
}) {
  const base = cx(
    "inline-flex items-center gap-2 rounded-xl",
    "ring-1 ring-stone-900/10",
    "font-semibold select-none",
    "transition",
    size === "sm" ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm",
    variant === "solid"
      ? "bg-stone-900 text-stone-50 hover:bg-stone-800"
      : "bg-stone-900/5 text-stone-700 hover:bg-stone-900/10 hover:text-stone-900",
    className
  );

  if (to) {
    return (
      <Link to={to} className={base} title={title}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base} title={title}>
      {children}
    </button>
  );
}