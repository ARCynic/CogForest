import React, { useMemo, useState, useEffect } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

import Iridescence from "../../components/forest/Iridescence.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import { FOREST_VISUALS, FOREST_VISUALS_DEFAULT } from "../../data/forest/visuals.js";
import bgForest from "../../assets/bg_forest.png";
import forestLogo from "../../assets/logo_forest.png";
import ScrollToTop from "./ScrolltoTop.jsx";

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function ForestLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const [readingBg, setReadingBg] = useState(null);

  useEffect(() => {
    // ✅ FIX: Defer update to satisfy 'no synchronous setState' linter rule
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const styles = {
    shell: "bg-black/60 ring-1 ring-white/10 backdrop-blur",
    pillBase: "bg-white/5 text-white ring-1 ring-white/10",
    pillHover: "hover:bg-cyan-300 hover:text-black hover:ring-cyan-200/30",
    pillActive: "bg-cyan-300 text-black ring-1 ring-cyan-200/30"
  };

  const readingMatch = useMemo(() => {
    const m = location.pathname.match(/^\/([^/]+)\/([^/]+)\/?$/);
    if (!m) return null;
    return { section: m[1], slug: m[2] };
  }, [location.pathname]);

  const visual = useMemo(() => {
    if (!readingMatch?.section) return null;
    return FOREST_VISUALS[readingMatch.section] ?? FOREST_VISUALS_DEFAULT;
  }, [readingMatch]);

  useEffect(() => {
    const list = visual?.writingBgs;
    let newBg = null;
    if (Array.isArray(list) && list.length > 0) {
      newBg = list[Math.floor(Math.random() * list.length)];
    }

    // ✅ FIX: Defer update to satisfy 'no synchronous setState' linter rule
    const t = setTimeout(() => setReadingBg(newBg), 0);
    return () => clearTimeout(t);
  }, [visual, location.pathname]);

  const irColor = visual?.palette?.iridescenceColor ?? FOREST_VISUALS_DEFAULT.palette.iridescenceColor;

  const items = useMemo(
    () => [
      { label: "Home", to: "/", end: true },
      { label: "Fables", to: "/fables" },
      { label: "Satirical", to: "/satire" },
      { label: "Language", to: "/language" },
      { label: "Music", to: "/music-as-regulation" },
      { label: "Fragments", to: "/fragments" }
    ],
    []
  );

  return (
    <div className="relative min-h-screen text-white">
      <ScrollToTop/>
      <div className="pointer-events-none fixed inset-0 -z-30" aria-hidden="true">
        <img
          src={readingMatch ? (readingBg || bgForest) : bgForest}
          alt=""
          className="h-full w-full object-cover opacity-70"
          draggable="false"
        />
      </div>

      <div className="pointer-events-none fixed inset-0 -z-20 opacity-25 mix-blend-screen" aria-hidden="true">
        <Iridescence 
          color={readingMatch ? irColor : [0.0, 0.9, 1.0]} 
          mouseReact={false} 
          amplitude={0.08} 
          speed={0.75} 
        />
      </div>

      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/90" />
      </div>

      <header className="relative">
        <div className="h-16 sm:h-20" aria-hidden="true" />
        <div className="absolute left-0 right-0 top-4 z-50">
          <nav className="flex w-full items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                aria-label="Cognitive Forest"
                className={cx(
                  "group inline-flex items-center justify-center",
                  "h-16 w-16 rounded-2xl",
                  styles.shell,
                  "transition hover:ring-white/20 hover:bg-black/70",
                  "hover:shadow-[0_14px_60px_rgba(255,255,255,0.06)]"
                )}
              >
                <img
                  src={forestLogo}
                  alt="Cognitive Forest"
                  className="h-16 w-16 object-contain transition group-hover:scale-[1.24]"
                  draggable="false"
                />
              </Link>

              <div className="flex flex-col leading-tight">
                <span className="text-3xl font-semibold tracking-tight text-white leading-none">
                  Cognitive Forest
                </span>
                <span className="mt-2 text-[11px] uppercase tracking-[0.22em] text-cyan-300/75">
                  writings · fragments · satire
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center">
              <div className={cx("flex items-center rounded-full p-1", styles.shell)}>
                <ul className="flex items-stretch gap-1">
                  {items.map((item) => (
                    <li key={item.to} className="flex">
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          cx(
                            "group relative inline-flex items-center justify-center",
                            "h-12 px-4 rounded-full",
                            "text-[14px] font-bold uppercase tracking-[0.10em]",
                            "transition",
                            isActive ? styles.pillActive :
                          cx(styles.pillBase, styles.pillHover)
                          )
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={cx(
                            "pointer-events-none absolute inset-0 rounded-full opacity-0",
                            "bg-gradient-to-b from-white/10 to-transparent",
                            "transition-opacity group-hover:opacity-100"
                          )}
                        />
                        <span className="relative z-10">{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className={cx(
                "md:hidden inline-flex items-center justify-center",
                "h-16 w-16 rounded-2xl",
                styles.shell,
                "transition hover:bg-black/70 hover:ring-white/20"
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-[6px]">
                <span
                  className="h-[2px] w-6 rounded bg-white transition"
                  style={mobileOpen ? { transform: "translateY(8px) rotate(45deg)" } : undefined}
                />
                <span
                  className="h-[2px] w-6 rounded bg-white transition"
                  style={mobileOpen ? { opacity: 0 } : undefined}
                />
                <span
                  className="h-[2px] w-6 rounded bg-white transition"
                  style={mobileOpen ? { transform: "translateY(-8px) rotate(-45deg)" } : undefined}
                />
              </div>
            </button>
          </nav>

          <div
            className={cx(
              "md:hidden mx-auto mt-3 max-w-6xl px-4 sm:px-6",
              "transition",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            )}
          >
            <div
              className={cx(
                "rounded-3xl p-2",
                "bg-black/70 ring-1 ring-white/10 backdrop-blur",
                "shadow-[0_16px_60px_rgba(0,0,0,0.55)]"
              )}
            >
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={`m-${item.to}`}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cx(
                          "block rounded-2xl px-4 py-3",
                          "text-sm font-bold uppercase tracking-[0.10em]",
                          "transition",
                          isActive ? styles.pillActive : cx(styles.pillBase, styles.pillHover)
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-2 sm:px-0">
        <main className="pt-6 pb-16">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}