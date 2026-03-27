"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Activity,
  AlertTriangle,
  Apple,
  Download,
  Laptop,
  Menu,
  Monitor,
  Sparkles,
  X,
} from "lucide-react";

const downloads = [
  {
    os: "macOS",
    href: "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest/download/Typerr-macOS.dmg",
    icon: Apple,
    label: "Download for macOS",
  },
  {
    os: "Windows",
    href: "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest/download/Typerr-Windows-Setup.exe",
    icon: Monitor,
    label: "Download for Windows",
  },
  {
    os: "Linux",
    href: "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest/download/Typerr-Linux.AppImage",
    icon: Laptop,
    label: "Download for Linux",
  },
];

const pillars = [
  {
    icon: Activity,
    title: "Track",
    body: "Live WPM, rhythm, and correction rate — measured during your actual work, not synthetic tests.",
  },
  {
    icon: AlertTriangle,
    title: "Analyze",
    body: "A ranked log of your most repeated mistakes, with confidence levels and suggested corrections.",
  },
  {
    icon: Sparkles,
    title: "Improve",
    body: "AI session missions, drill words, and a focused checklist built around your weak spots.",
  },
];

const releaseFallback =
  "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest";

const releaseDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

// ── Typewriter title ──────────────────────────────────────────────────────────

type CharState = "normal" | "error" | "correct";
interface DisplayChar {
  char: string;
  state: CharState;
}
type ScriptStep =
  | { kind: "type"; char: string; delay: number }
  | { kind: "error"; char: string; delay: number }
  | { kind: "backspace"; delay: number }
  | { kind: "correct"; char: string; delay: number };

// Target: "You type all day. No one tells you how."
// Chars at index >= 18 ('N' in 'No') get the muted color.
const MUTED_AT = 18;

function buildScript(): ScriptStep[] {
  const steps: ScriptStep[] = [];
  function ty(s: string, d = 68) {
    for (const c of s) steps.push({ kind: "type", char: c, delay: d });
  }
  ty("You type all d");
  steps.push({ kind: "error", char: "s", delay: 72 });  // typo
  steps.push({ kind: "backspace", delay: 240 });
  steps.push({ kind: "correct", char: "a", delay: 110 });
  ty("y. No one tell");
  steps.push({ kind: "error", char: "k", delay: 70 });  // typo
  steps.push({ kind: "backspace", delay: 220 });
  steps.push({ kind: "correct", char: "l", delay: 100 });
  ty("s you ho");
  steps.push({ kind: "error", char: "r", delay: 70 });  // typo
  steps.push({ kind: "backspace", delay: 210 });
  steps.push({ kind: "correct", char: "w", delay: 100 });
  ty(".");
  return steps;
}

function TypewriterTitle() {
  const [chars, setChars] = useState<DisplayChar[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const script = buildScript();

    // Pre-compute the final array index for each 'correct' step.
    let tempLen = 0;
    const correctPositions: number[] = [];
    for (const s of script) {
      if (s.kind === "correct") {
        correctPositions.push(tempLen++);
      } else if (s.kind === "type" || s.kind === "error") {
        tempLen++;
      } else {
        tempLen--;
      }
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    let cIdx = 0;

    for (const s of script) {
      elapsed += s.delay;
      const t = elapsed;

      if (s.kind === "type") {
        const ch = s.char;
        timers.push(
          setTimeout(
            () => setChars((p) => [...p, { char: ch, state: "normal" }]),
            t
          )
        );
      } else if (s.kind === "error") {
        const ch = s.char;
        timers.push(
          setTimeout(
            () => setChars((p) => [...p, { char: ch, state: "error" }]),
            t
          )
        );
      } else if (s.kind === "backspace") {
        timers.push(setTimeout(() => setChars((p) => p.slice(0, -1)), t));
      } else {
        const ch = s.char;
        const pos = correctPositions[cIdx++];
        timers.push(
          setTimeout(
            () => setChars((p) => [...p, { char: ch, state: "correct" }]),
            t
          )
        );
        // Settle green → normal after a beat
        timers.push(
          setTimeout(
            () =>
              setChars((p) => {
                const copy = [...p];
                if (copy[pos]) copy[pos] = { ...copy[pos], state: "normal" };
                return copy;
              }),
            t + 750
          )
        );
      }
    }

    timers.push(setTimeout(() => setDone(true), elapsed + 200));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <h1 className="mx-auto max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-[4.5rem]">
      {chars.map((c, i) => {
        const muted = c.state === "normal" && i >= MUTED_AT;
        return (
          <span
            key={i}
            className={
              c.state === "error"
                ? "text-red-500 transition-colors duration-100"
                : c.state === "correct"
                  ? "text-emerald-500 transition-colors duration-500"
                  : muted
                    ? "text-muted-foreground/70 transition-colors duration-500"
                    : "transition-colors duration-500"
            }
          >
            {c.char}
          </span>
        );
      })}
      {!done && (
        <span className="ml-0.5 animate-pulse text-sky-500">|</span>
      )}
    </h1>
  );
}

export default function Home() {
  const year = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [releaseLinks, setReleaseLinks] = useState<Record<string, string>>({});
  const [releaseMeta, setReleaseMeta] = useState<{
    version: string | null;
    tagName: string | null;
    publishedAt: string | null;
  }>({ version: null, tagName: null, publishedAt: null });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadReleaseLinks() {
      try {
        const res = await fetch("/api/download-links");
        if (!res.ok) return;
        const data = (await res.json()) as {
          links?: Record<string, string>;
          version?: string | null;
          tagName?: string | null;
          publishedAt?: string | null;
        };
        if (!isMounted) return;
        if (data.links) setReleaseLinks(data.links);
        setReleaseMeta({
          version: data.version ?? null,
          tagName: data.tagName ?? null,
          publishedAt: data.publishedAt ?? null,
        });
      } catch {
        // Keep fallback links.
      }
    }
    loadReleaseLinks();
    return () => {
      isMounted = false;
    };
  }, []);

  const resolvedDownloads = downloads.map((item) => ({
    ...item,
    href: releaseLinks[item.os] ?? item.href,
  }));

  const versionLabel = releaseMeta.version
    ? `v${releaseMeta.version}`
    : releaseMeta.tagName ?? "latest";

  const releaseDateLabel = releaseMeta.publishedAt
    ? releaseDateFormatter.format(new Date(releaseMeta.publishedAt))
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-sky-300/30 dark:selection:bg-sky-500/25">
      {/* Subtle dot grid */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Header ── */}
      <header
        className={`sticky top-0 z-50 border-b border-border/40 bg-background/85 backdrop-blur-xl transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-sky-500 text-white">
              <span className="text-xs font-bold leading-none">T</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">Typerr</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#downloads" className="transition-colors hover:text-foreground">
              Downloads
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button
              size="sm"
              className="hidden h-8 bg-sky-500 px-3 text-white hover:bg-sky-400 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400 sm:inline-flex"
              nativeButton={false}
              render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              {mobileNavOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="border-t border-border/40 bg-background/95 px-5 pb-4 pt-3 md:hidden">
            <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a
                href="#features"
                onClick={() => setMobileNavOpen(false)}
                className="transition-colors hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#downloads"
                onClick={() => setMobileNavOpen(false)}
                className="transition-colors hover:text-foreground"
              >
                Downloads
              </a>
              <Button
                size="sm"
                className="mt-1 h-9 w-full bg-sky-500 text-white hover:bg-sky-400"
                nativeButton={false}
                render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
              >
                <Apple className="h-4 w-4" />
                Download for macOS
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8">
        {/* ── Hero ── */}
        <section className="pb-20 pt-20 text-center sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Live pill */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/8 px-3.5 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
              Real-time typing coach for desktop
            </div>

            {/* Headline — typewriter with mistake feedback */}
            <TypewriterTitle />

            {/* Solution */}
            <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-[1.0625rem]">
              Typerr watches your real typing, surfaces your actual mistakes,
              and builds an AI-powered plan to fix them — without changing how
              you work.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-11 bg-sky-500 px-6 text-white hover:bg-sky-400 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
                nativeButton={false}
                render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
              >
                <Apple className="h-4 w-4" />
                Download for macOS
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-6"
                nativeButton={false}
                render={<a href="#downloads" />}
              >
                Other platforms
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Free · macOS · Windows · Linux · Local-first
            </p>
          </motion.div>

          {/* App screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mt-16"
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 shadow-[0_32px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_80px_rgba(0,0,0,0.55)]">
              {/* macOS-style title bar */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/50 px-4 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 text-xs text-muted-foreground">
                  Typerr — Live Dashboard
                </span>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-sky-600 dark:text-sky-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500" />
                  Live
                </div>
              </div>
              <Image
                src="/demo-app-live.png"
                alt="Typerr live typing dashboard showing WPM, corrections, and mistake patterns"
                width={1000}
                height={640}
                className="w-full"
                priority
              />
            </div>
          </motion.div>
        </section>

        {/* ── Three pillars ── */}
        <section id="features" className="pb-20 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 text-center"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Track. Analyze. Improve.
            </h2>
            <p className="mt-2.5 text-muted-foreground">
              Everything in one lightweight desktop app.
            </p>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border/60 bg-card/40 p-6"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <pillar.icon className="h-4 w-4" />
                </div>
                <h3 className="mb-2 font-semibold">{pillar.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Downloads ── */}
        <section id="downloads">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border/60 bg-card/40 px-8 py-12 text-center"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Start improving today.
            </h2>
            <p className="mt-2.5 text-sm text-muted-foreground">
              Free · {versionLabel}
              {releaseDateLabel ? ` · Released ${releaseDateLabel}` : ""}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {resolvedDownloads.map((dl) => (
                <Button
                  key={dl.os}
                  variant="outline"
                  size="lg"
                  className="h-11 px-5"
                  nativeButton={false}
                  render={<a href={dl.href} />}
                >
                  <dl.icon className="h-4 w-4" />
                  {dl.label}
                </Button>
              ))}
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              Requires keyboard accessibility permission · No raw keystroke data
              is exported
            </p>
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        © {year} Typerr · Built for people who type all day.
      </footer>
    </div>
  );
}
