import React from "react";
import { Link, useLocation } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function CatalogueFab({ to = "/catalogue" }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      aria-label="Open catalogue"
      className={cx(
        "fixed z-[80] right-4 bottom-20 sm:right-6 sm:bottom-20",
        "pulse-float",
        "group"
      )}
    >
      <div
        className={cx(
  "relative overflow-hidden rounded-2xl",
  "bg-emerald-950/35 backdrop-blur",                 // ✅ green tint
  "ring-1 ring-emerald-200/20",                      // ✅ green ring
  "shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
  "transition",
  "hover:ring-emerald-200/35",
  "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.12)]",
  isActive ? "ring-emerald-200/40" : ""
)}
      >
        {/* subtle gradient sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,211,238,0.10), rgba(52,211,153,0.08), transparent 65%)",
          }}
        />

        <div className="relative flex items-center gap-3 px-4 py-3">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-emerald-300/10 ring-1 ring-emerald-200/20">
  <CatalogueIcon />
</span>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Catalogue
            </span>
            <span className="text-[11px] text-white/50">Browse titles</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CatalogueIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-emerald-100/90 group-hover:text-white transition"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* book/catalog */}
      <path d="M6 4.5h10a2 2 0 0 1 2 2V20H8a2 2 0 0 0-2 2V4.5z" />
      <path d="M6 20h12" />
      <path d="M9 8h6" />
      <path d="M9 11h6" />
      <path d="M9 14h5" />
    </svg>
  );
}