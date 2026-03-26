"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Activity,
  AlertTriangle,
  Apple,
  CheckCircle2,
  ChevronDown,
  Download,
  Gauge,
  Keyboard,
  Laptop,
  LineChart,
  ListChecks,
  LockKeyhole,
  Menu,
  Monitor,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  ChevronRight,
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

const faqs = [
  {
    question: "Why does Typerr request keyboard accessibility permissions?",
    answer:
      "Typerr needs keyboard accessibility permission to observe typing patterns in real time and calculate speed, accuracy, rhythm, and correction behavior while you work.",
  },
  {
    question: "Does Typerr work offline?",
    answer:
      "Core tracking, KPI scoring, and dashboard feedback run locally. You can continue using Typerr without a constant internet connection.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "Typerr is packaged for macOS, Windows, and Linux.",
  },
  {
    question: "How does the AI report work?",
    answer:
      "Typerr turns your latest typing snapshot into a session mission, strengths and risks, drill words with hints, and a practical checklist with time estimates.",
  },
];

const stepFlow = [
  {
    title: "Track",
    body: "Measure live typing performance while you work: WPM, rhythm, corrections, and tracking health.",
    icon: Activity,
  },
  {
    title: "Analyze",
    body: "Surface recurring mistakes with confidence levels and suggested corrections.",
    icon: AlertTriangle,
  },
  {
    title: "Practice",
    body: "Use AI session missions, drill words, and checklist actions focused on your weak spots.",
    icon: ListChecks,
  },
  {
    title: "Improve",
    body: "Verify gains over time with a 12-week activity heatmap and improvement focus tips.",
    icon: TrendingUp,
  },
];

const problems = [
  {
    title: "You type all day with zero feedback",
    body: "No tool tells you your real WPM, correction rate, or rhythm during actual work — only synthetic tests that don't reflect reality.",
  },
  {
    title: "You repeat the same typos forever",
    body: "Without a mistake log you never know which words trip you up most, or how often. The same errors compound silently.",
  },
  {
    title: "Speed tests don't translate to real work",
    body: "Copying pangrams measures copying. It doesn't capture how you type emails, code, documents, or messages under real pressure.",
  },
];

function WpmCounter() {
  const n = useCounter(18);
  return <>{n}+</>;
}

function MistakeCounter() {
  const n = useCounter(73);
  return <>{n}%</>;
}

function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

const releaseFallback = "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest";

const releaseDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function Home() {
  const year = new Date().getFullYear();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [releaseLinks, setReleaseLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [releaseMeta, setReleaseMeta] = useState<{
    version: string | null;
    tagName: string | null;
    publishedAt: string | null;
  }>({
    version: null,
    tagName: null,
    publishedAt: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadReleaseLinks() {
      try {
        const res = await fetch("/api/download-links");
        if (!res.ok) {
          return;
        }

        const data = (await res.json()) as {
          links?: Record<string, string>;
          version?: string | null;
          tagName?: string | null;
          publishedAt?: string | null;
        };

        if (!isMounted) {
          return;
        }

        if (data.links) {
          setReleaseLinks(data.links);
        }

        setReleaseMeta({
          version: data.version ?? null,
          tagName: data.tagName ?? null,
          publishedAt: data.publishedAt ?? null,
        });
      } catch {
        // Keep fallback links if latest release links fail to load.
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

  const releaseDateLabel = releaseMeta.publishedAt
    ? releaseDateFormatter.format(new Date(releaseMeta.publishedAt))
    : "Unknown";

  const versionLabel = releaseMeta.version
    ? `v${releaseMeta.version}`
    : releaseMeta.tagName ?? "latest";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-sky-300/40 dark:selection:bg-sky-500/30">
      {/* Background: radial glows */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(ellipse_80%_50%_at_-10%_-10%,rgba(56,189,248,0.18),transparent),radial-gradient(ellipse_60%_40%_at_110%_-5%,rgba(14,165,233,0.16),transparent),radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(34,211,238,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_-10%_-10%,rgba(56,189,248,0.22),transparent),radial-gradient(ellipse_60%_40%_at_110%_-5%,rgba(14,165,233,0.2),transparent),radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(34,211,238,0.1),transparent),linear-gradient(to_bottom,transparent,rgba(2,6,23,0.6))]" />
      {/* Background: dot grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <header className={`sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl transition-shadow duration-200 ${scrolled ? "shadow-sm" : ""}`}>
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/25 to-cyan-400/15 text-sky-700 ring-1 ring-sky-500/20 dark:text-sky-300">
              <Keyboard className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Typerr</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#privacy" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#downloads" className="transition-colors hover:text-foreground">Downloads</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden h-8 bg-sky-600 px-3 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400 sm:inline-flex"
              nativeButton={false} render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
            >
              Download
            </Button>
            <ModeToggle />
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {/* Mobile nav drawer */}
        {mobileNavOpen && (
          <div className="border-t border-border/60 bg-background/95 px-4 pb-4 pt-3 md:hidden">
            <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="#features" onClick={() => setMobileNavOpen(false)} className="transition-colors hover:text-foreground">Features</a>
              <a href="#privacy" onClick={() => setMobileNavOpen(false)} className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#downloads" onClick={() => setMobileNavOpen(false)} className="transition-colors hover:text-foreground">Downloads</a>
              <Button
                size="sm"
                className="mt-1 h-9 w-full bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
                nativeButton={false} render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
              >
                <Download className="h-4 w-4" />
                Download for macOS
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
        <section className="grid items-center gap-10 pb-16 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Badge variant="outline" className="mb-5 border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300">
              Real-time typing coach for desktop
            </Badge>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Typing coaching that{" "}
              <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
                works while you work.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Typerr turns live typing behavior into KPI clarity, mistake intelligence, and AI-guided practice plans so speed and accuracy improve together.
            </p>
            <div className="mt-5 flex items-center gap-6 text-sm">
              <div>
                <span className="text-2xl font-semibold tabular-nums text-foreground">
                  <WpmCounter />
                </span>
                <span className="ml-1 text-xs text-muted-foreground">avg WPM gain</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <span className="text-2xl font-semibold tabular-nums text-foreground">
                  <MistakeCounter />
                </span>
                <span className="ml-1 text-xs text-muted-foreground">fewer repeated mistakes</span>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-11 bg-sky-600 px-5 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
                nativeButton={false} render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
              >
                <Apple className="h-4 w-4" />
                Download for macOS
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-5" nativeButton={false} render={<a href="#walkthrough" />}>
                See it in action
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full">macOS</Badge>
              <Badge variant="secondary" className="rounded-full">Windows</Badge>
              <Badge variant="secondary" className="rounded-full">Linux</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative"
          >
            {/* Glow blobs */}
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-sky-500/25 blur-3xl" />
            <div className="absolute -bottom-10 -right-8 h-44 w-44 rounded-full bg-cyan-500/25 blur-3xl" />

            {/* macOS-style app window frame */}
            <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-[0_32px_96px_rgba(2,6,23,0.28)] dark:shadow-[0_32px_96px_rgba(0,0,0,0.5)]">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-zinc-100 px-4 py-2.5 dark:bg-zinc-900">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-muted-foreground">Typerr — Live Dashboard</span>
                <div className="ml-auto">
                  <Badge variant="outline" className="border-sky-500/30 text-sky-700 dark:text-sky-300 h-4 text-[10px]">● Live</Badge>
                </div>
              </div>
              {/* Screenshot */}
              <Image
                src="/demo-app-live.png"
                alt="Typerr live typing dashboard showing WPM, corrections, and mistake patterns"
                width={680}
                height={460}
                className="w-full"
                priority
              />
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -bottom-4 -left-4 hidden rounded-xl border border-sky-500/30 bg-background/95 p-3 shadow-xl backdrop-blur-sm md:block"
            >
              <p className="text-[10px] font-medium text-muted-foreground">Session WPM</p>
              <p className="text-2xl font-semibold tracking-tight text-sky-700 dark:text-sky-300">87</p>
              <div className="mt-1 flex h-6 items-end gap-0.5">
                {[35, 52, 48, 64, 60, 76, 87].map((h, i) => (
                  <div key={i} className="w-3 rounded-sm bg-sky-500/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── The Problem ── */}
        <section className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The problem</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Most people who type for a living have{" "}
              <span className="text-muted-foreground">no idea how they actually type.</span>
            </h2>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="h-full rounded-2xl border-border/60 bg-card/70">
                  <CardHeader>
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base">{p.title}</CardTitle>
                    <CardDescription className="text-sm leading-6">{p.body}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Typerr fixes all three — without changing how you work.
          </motion.div>
        </section>

        {/* ── Trust strip ── */}
        <section className="pb-16 sm:pb-24">
          <Card className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm">
            <CardContent className="grid gap-5 py-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-sm font-medium text-foreground">Built for people who type all day: students, developers, writers, operators, and knowledge workers.</p>
                <p className="mt-2 text-sm text-muted-foreground">Local-first processing. Privacy-conscious by design. No raw keystroke export.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-sky-500/30 text-sky-700 dark:text-sky-300">Local-first</Badge>
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-700 dark:text-cyan-300">No raw keystroke export</Badge>
                <Badge variant="outline">Desktop app</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── M2: Bento feature grid ── */}
        <section id="features" className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Features</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Everything you need to improve.</h2>
            <p className="mt-3 text-muted-foreground">Measure live, understand mistakes, and train with clear AI coaching actions — all in one desktop app.</p>
          </motion.div>

          {/* Row 1: large dashboard screenshot + mistake audit stacked */}
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full overflow-hidden rounded-2xl border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Gauge className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                    Real-time KPI dashboard
                  </CardTitle>
                  <CardDescription>Live WPM, rhythm state, corrections/min, and tracking status — always visible while you work.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-b-2xl border-t border-border/60">
                    <Image
                      src="/demo-app-dashboard.png"
                      alt="Typerr full analytics dashboard"
                      width={720}
                      height={420}
                      className="w-full object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="rounded-2xl border-border/60 bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                      Deep mistake audit
                    </CardTitle>
                    <CardDescription>Recurring typos ranked by confidence. Know exactly which words trip you up and how often.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 rounded-xl border border-border/70 bg-background/80 p-3 text-sm">
                      {[["definately → definitely", "93%"], ["seperate → separate", "88%"], ["teh → the", "97%"]].map(([err, conf]) => (
                        <div key={err} className="flex items-center justify-between">
                          <span className="font-mono text-xs">{err}</span>
                          <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px]">{conf}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="rounded-2xl border-border/60 bg-card/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                      AI session missions
                    </CardTitle>
                    <CardDescription>Focused coaching actions generated from your latest snapshot — no guesswork required.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5 rounded-xl border border-border/70 bg-background/80 p-3 text-sm">
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-500" />4-min ring-finger drill</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-500" />8 target words with hints</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-500" />2-point accuracy checklist</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Row 2: three metric cards */}
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { icon: Activity, label: "WPM & rhythm", value: "87 WPM", sub: "Steady rhythm", color: "text-sky-600 dark:text-sky-300", bars: [35, 52, 48, 64, 60, 76, 87] },
              { icon: Target, label: "Corrections/min", value: "2.4", sub: "↓ from 4.1 last week", color: "text-emerald-600 dark:text-emerald-400", bars: [80, 72, 68, 60, 55, 50, 42] },
              { icon: ListChecks, label: "Session score", value: "84 / 100", sub: "Tracking health: good", color: "text-sky-600 dark:text-sky-300", bars: [60, 65, 70, 72, 78, 82, 84] },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Card className="rounded-2xl border-border/60 bg-card/70">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
                    </div>
                    <p className={`mt-1 text-2xl font-semibold tracking-tight ${item.color}`}>{item.value}</p>
                    <p className="mb-2 text-[11px] text-muted-foreground">{item.sub}</p>
                    <div className="flex h-7 items-end gap-0.5">
                      {item.bars.map((h, j) => (
                        <div key={j} className="flex-1 rounded-sm bg-sky-500/60" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── M2: Timeline walkthrough ── */}
        <section id="walkthrough" className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-12 max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">A closed loop. No habit changes required.</h2>
            <p className="mt-3 text-muted-foreground">Typerr works in the background while you do your actual job. The loop tightens automatically.</p>
          </motion.div>

          <div className="relative">
            {/* Connector line — desktop only */}
            <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent md:block" />

            <div className="grid gap-8 md:grid-cols-4 md:gap-4">
              {stepFlow.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-start md:items-center md:text-center"
                >
                  {/* Number bubble */}
                  <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-sky-500/30 bg-card shadow-sm">
                    <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <step.icon className="h-6 w-6 text-sky-600 dark:text-sky-300" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section className="pb-16 sm:pb-24">
          <Card className="rounded-2xl border-sky-500/20 bg-gradient-to-r from-sky-500/8 to-cyan-500/5 backdrop-blur-sm">
            <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold">Ready for your first analysis report?</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Install Typerr, complete one real work session, then run your first AI mission.</p>
              </div>
              <Button className="shrink-0 bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400" nativeButton={false} render={<a href="#downloads" />}>
                Get Typerr free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* ── M3: Progress heatmap ── */}
        <section className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Progress</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">See momentum build week by week.</h2>
            <p className="mt-3 text-muted-foreground">The 12-week heatmap and improvement focus card keep you on track without random drilling.</p>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="rounded-2xl border-border/60 bg-card/70">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <LineChart className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                      12-week activity heatmap
                    </CardTitle>
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                      🔥 14-day streak
                    </Badge>
                  </div>
                  <CardDescription>Visual consistency cues help you spot off-weeks early and keep momentum.</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Month labels */}
                  <div className="mb-1 grid grid-cols-12 gap-1 px-0.5 text-[9px] text-muted-foreground">
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                      <div key={m} className="text-center">{m}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-12 gap-1 rounded-xl border border-border/70 bg-background/70 p-3">
                    {Array.from({ length: 84 }, (_, idx) => {
                      const intensity = idx > 60 ? 0.7 : idx > 40 ? 0.5 : idx % 7 === 0 ? 0.55 : idx % 5 === 0 ? 0.35 : 0.18;
                      return (
                        <div
                          key={idx}
                          className="aspect-square rounded-sm transition-opacity hover:opacity-80"
                          style={{ background: `rgba(14,165,233,${intensity})` }}
                        />
                      );
                    })}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 rounded-sm" style={{ background: "rgba(14,165,233,0.18)" }} />Less
                    </div>
                    <div className="flex gap-0.5">
                      {[0.25,0.4,0.55,0.7].map((o) => (
                        <div key={o} className="h-2.5 w-2.5 rounded-sm" style={{ background: `rgba(14,165,233,${o})` }} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full rounded-2xl border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Target className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                    Improvement focus
                  </CardTitle>
                  <CardDescription>Prioritized guidance from your latest snapshot vs previous sessions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-2">
                    <p className="text-[10px] font-medium text-muted-foreground">WPM trend</p>
                    <p className="text-xl font-semibold text-sky-600 dark:text-sky-300">87 → 104 <span className="text-xs text-emerald-600 dark:text-emerald-400">+18%</span></p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2 rounded-lg border border-border/70 bg-background/80 p-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                      Stabilize rhythm for 2 × 4-min blocks
                    </li>
                    <li className="flex items-start gap-2 rounded-lg border border-border/70 bg-background/80 p-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                      Reduce e/i swaps in common words
                    </li>
                    <li className="flex items-start gap-2 rounded-lg border border-border/70 bg-background/80 p-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                      Target 1.5 corrections/min
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── M3: Privacy ── */}
        <section id="privacy" className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-500/20">
              <ShieldCheck className="h-7 w-7 text-sky-600 dark:text-sky-300" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Privacy</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Your keystrokes stay on your machine.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Typerr is local-first by design. Processing happens on-device. Nothing raw ever leaves.</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full rounded-2xl border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    What Typerr does
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Processes typing signals locally — WPM, rhythm, corrections, accuracy.",
                      "Builds mistake patterns from your own sessions, stored on-device.",
                      "Generates AI coaching missions from your local snapshot.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="h-full rounded-2xl border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                    What Typerr never does
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    {[
                      "Export raw keystrokes or send them to any server.",
                      "Require you to leave your workflow for synthetic typing tests.",
                      "Store or transmit the content of what you type.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                        <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── M4: Downloads ── */}
        <section id="downloads" className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">Downloads</p>
            <div className="mt-2 flex flex-wrap items-end gap-4">
              <h2 className="text-3xl font-semibold tracking-tight">Download Typerr</h2>
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xl font-semibold tabular-nums text-sky-600 dark:text-sky-300">{versionLabel}</span>
                <Badge variant="outline" className="border-border/60 text-muted-foreground text-[11px]">{releaseDateLabel}</Badge>
              </div>
            </div>
            <p className="mt-2 text-muted-foreground">Free download. No account required. Start improving in your first session.</p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {resolvedDownloads.map((item, i) => {
              const isMac = item.os === "macOS";
              return (
                <motion.div
                  key={item.os}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <Card className={`relative h-full rounded-2xl transition-shadow hover:shadow-md ${isMac ? "border-sky-500/40 ring-1 ring-sky-500/30 bg-card/70" : "border-border/60 bg-card/70"}`}>
                    {isMac && (
                      <div className="absolute -top-2.5 left-4">
                        <Badge className="bg-sky-500 text-white text-[10px] px-2 py-0.5">Recommended</Badge>
                      </div>
                    )}
                    <CardHeader className="pt-6">
                      <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${isMac ? "bg-sky-500/10 ring-1 ring-sky-500/20" : "bg-muted"}`}>
                        <item.icon className={`h-5 w-5 ${isMac ? "text-sky-600 dark:text-sky-300" : "text-muted-foreground"}`} />
                      </div>
                      <CardTitle className="text-base">{item.os}</CardTitle>
                      <CardDescription>
                        {item.os === "macOS" && ".dmg universal installer"}
                        {item.os === "Windows" && ".exe setup installer"}
                        {item.os === "Linux" && ".AppImage portable"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className={`h-10 w-full ${isMac ? "bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                        nativeButton={false} render={<a href={item.href} />}
                      >
                        <Download className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── M3: FAQ accordion ── */}
        <section className="pb-16 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-10 max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400">FAQ</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Common questions.</h2>
          </motion.div>
          <div className="space-y-2">
            {faqs.map((item, i) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full rounded-xl border px-5 py-4 text-left transition-colors ${openFaq === i ? "border-sky-500/30 bg-sky-500/5" : "border-border/60 bg-card/70 hover:bg-card"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">{item.question}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </div>
                  {openFaq === i && (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── M4: Final CTA ── */}
        <section className="pb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-sky-500/20 px-6 py-14 text-center sm:px-12"
            style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.18) 0%, rgba(34,211,238,0.12) 50%, rgba(99,102,241,0.1) 100%)" }}
          >
            {/* Decorative blobs inside banner */}
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 ring-1 ring-sky-500/30">
                <Keyboard className="h-6 w-6 text-sky-600 dark:text-sky-300" />
              </div>
              <div>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Stop guessing.<br />
                  <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">Start improving.</span>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                  Install Typerr, do one real work session, and you&apos;ll have your first analysis report before lunch.
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 bg-sky-600 px-8 text-base text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
                  nativeButton={false} render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
                >
                  <Apple className="h-5 w-5" />
                  Download for macOS
                </Button>
                <Button size="lg" variant="outline" className="h-12 border-border/60 bg-background/60 px-6 text-base backdrop-blur" nativeButton={false} render={<a href="#downloads" />}>
                  All platforms
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Free. No account. Works on macOS, Windows, and Linux.</p>
            </div>
          </motion.div>
        </section>

        <footer className="flex flex-col items-center gap-2 pt-10 pb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Keyboard className="h-3 w-3" />
            </div>
            <span className="font-medium text-foreground">Typerr</span>
          </div>
          <p>© {year} · Built for measurable typing improvement · Local-first, privacy-conscious</p>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </main>
    </div>
  );
}
