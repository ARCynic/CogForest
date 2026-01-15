import React from "react";
import { Link } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold transition " +
  "focus:outline-none focus:ring-2 focus:ring-cyan-300/40 focus:ring-offset-0 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  md: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm"
};

const variants = {
  // signal button (cyan accent) but not “blob”
  primary:
    "bg-cyan-400/12 text-white ring-1 ring-cyan-300/25 " +
    "hover:bg-cyan-400/18 hover:ring-cyan-200/35",

  // neutral obsidian button
  secondary:
    "bg-white/5 text-white ring-1 ring-white/12 " +
    "hover:bg-white/8 hover:ring-white/18",

  // minimal
  ghost:
    "text-white/80 hover:text-white hover:bg-white/5 ring-1 ring-transparent"
};

export default function Button({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ...rest
}) {
  const cls = cx(base, sizes[size] || sizes.md, variants[variant] || variants.primary, className);

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    const rel = external ? "noreferrer noopener" : rest.rel;
    const target = external ? "_blank" : rest.target;

    return (
      <a href={href} className={cls} target={target} rel={rel} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}