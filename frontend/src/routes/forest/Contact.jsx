import React, { useMemo, useState } from "react";
import BlurText from "../../components/forest/BlurText.jsx";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Contact() {
  const [topic, setTopic] = useState("Feedback");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  // Turn this on later when your backend is ready.
  // When true + VITE_API_BASE is set, submission will work immediately.
  const SUBMISSIONS_ENABLED = false;

  // Set this later:
  // VITE_API_BASE=https://api.mydomain.tld
  const API_BASE = import.meta.env.VITE_API_BASE || "https://api.mydomain.tld";
  const CONTACT_ENDPOINT = `${API_BASE.replace(/\/$/, "")}/contact`;

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const tooShort = msg.trim().length > 0 && msg.trim().length < 10;

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`[Cognitive Forest] ${topic}`);
    const body = encodeURIComponent(
      `Topic: ${topic}\nName: ${name || "(not provided)"}\nEmail: ${
        email || "(not provided)"
      }\n\nMessage:\n${msg || "(empty)"}\n`
    );
    return `mailto:contact@polymathictrail.org?subject=${subject}&body=${body}`;
  }, [topic, name, email, msg]);

  async function handleSubmit(e) {
    e.preventDefault();

    // Keep submissions OFF for now (as requested)
    if (!SUBMISSIONS_ENABLED) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const payload = {
        email: email || "",
        name: name || "",
        subject: topic, // (collab/feedback/question/etc)
        message: msg || "",
      };

      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Request failed (${res.status})`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-5xl px-2 sm:px-0">
        <section className="mt-2">
          <div
            className={cx(
              "rounded-3xl p-6 sm:p-8",
              "bg-black/45 backdrop-blur-md ring-1 ring-white/10",
              "transition",
              "hover:ring-emerald-200/30",
              "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.10)]",
              "text-center"
            )}
          >
            <BlurText
              text="Message received"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-2xl font-semibold tracking-tight text-white"
            />
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70">
              Thanks — I’ll read it soon.
            </p>

            <div className="mt-5 flex justify-center">
              <a
                href="/"
                className={cx(
                  "inline-flex items-center justify-center rounded-xl px-5 py-3",
                  "text-sm font-bold uppercase tracking-[0.10em]",
                  "bg-gradient-to-r from-cyan-300 to-emerald-300 text-black",
                  "ring-1 ring-emerald-200/40",
                  "transition hover:brightness-110"
                )}
              >
                Back to home
              </a>
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-2 sm:px-0">
      {/* Page header card */}
      <section className="mt-2">
        <div
          className={cx(
            "rounded-3xl p-6 sm:p-8",
            "bg-black/45 backdrop-blur-md ring-1 ring-white/10",
            "transition",
            "hover:ring-emerald-200/30",
            "hover:shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_18px_60px_rgba(16,185,129,0.10)]"
          )}
        >
          <div className="flex justify-center">
            <BlurText
              text="Contact"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-2xl font-semibold tracking-tight text-white"
            />
          </div>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70 text-center">
            Send feedback, questions, collaboration ideas, or a note. Submission will be enabled
            when the backend is ready.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section className="mt-6">
        <div className="rounded-3xl bg-black/60 ring-1 ring-white/10 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-[12px] font-medium text-white/55">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={cx(
                    "w-full appearance-none rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                    "text-sm text-white/80 outline-none",
                    "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                  )}
                >
                  <option>Feedback</option>
                  <option>Question</option>
                  <option>Collaboration</option>
                  <option>Translation / Adaptation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-[12px] font-medium text-white/55">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Optional"
                  className={cx(
                    "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                    "text-sm text-white/80 outline-none placeholder:text-white/30",
                    "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                  )}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-[12px] font-medium text-white/55">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional (so I can reply)"
                type="email"
                className={cx(
                  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                  "text-sm text-white/80 outline-none placeholder:text-white/30",
                  "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                )}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-[12px] font-medium text-white/55">Message</label>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Write your message..."
                rows={7}
                className={cx(
                  "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3",
                  "text-sm text-white/80 outline-none placeholder:text-white/30",
                  "focus:border-emerald-200/30 focus:ring-2 focus:ring-emerald-200/10"
                )}
              />
              <div className="text-xs text-white/40">
                (Minimum 10 characters.)
                {tooShort ? <span className="ml-2 text-rose-300/80">Too short.</span> : null}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="text-xs text-white/45">
                Submission via form is currently disabled. Please hit "Email instead" to contact for the time being.
                
              </div>

              <div className="flex gap-3">
                <a
                  href={mailtoHref}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-5 py-3",
                    "text-sm font-bold uppercase tracking-[0.10em]",
                    "bg-white/5 text-white ring-1 ring-white/10",
                    "transition hover:bg-white/10"
                  )}
                >
                  Email instead
                </a>

                <button
                  type="submit"
                  disabled
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-5 py-3",
                    "text-sm font-bold uppercase tracking-[0.10em]",
                    "bg-gradient-to-r from-cyan-300 to-emerald-300 text-black",
                    "ring-1 ring-emerald-200/40",
                    "opacity-60 cursor-not-allowed"
                  )}
                  title="Backend not wired yet"
                >
                  {status === "submitting" ? "Sending…" : "Send"}
                </button>
              </div>
            </div>

            {status === "error" ? (
              <div className="text-sm text-rose-300/90">
                {errorMsg || "Something went wrong. Try again later."}
              </div>
            ) : null}
          </form>
        </div>
      </section>

      <div className="h-4" />
    </div>
  );
}