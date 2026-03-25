"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
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
  Download,
  Gauge,
  Keyboard,
  Laptop,
  LineChart,
  ListChecks,
  LockKeyhole,
  Monitor,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  ArrowRight,
  ChevronRight,
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

const releaseFallback = "https://github.com/hamzafa1d1/typerr-desktop-app/releases/latest";

const releaseDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function Home() {
  const year = new Date().getFullYear();
  const [releaseLinks, setReleaseLinks] = useState<Record<string, string>>({});
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
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.14),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0),rgba(2,6,23,0.03))] dark:bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.2),transparent_35%),linear-gradient(to_bottom,rgba(2,6,23,0),rgba(2,6,23,0.5))]" />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
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
              className="h-8 bg-sky-600 px-3 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
              render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
            >
              Download
            </Button>
            <ModeToggle />
          </div>
        </div>
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
              Typing coaching that works while you work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Typerr turns live typing behavior into KPI clarity, mistake intelligence, and AI-guided practice plans so speed and accuracy improve together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-11 bg-sky-600 px-5 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
                render={<a href={resolvedDownloads[0]?.href ?? releaseFallback} />}
              >
                <Apple className="h-4 w-4" />
                Download for macOS
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-5" render={<a href="#walkthrough" />}>
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
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
            <Card className="overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-3 shadow-[0_28px_80px_rgba(2,6,23,0.2)]">
              <div className="rounded-xl border border-border/70 bg-background/80 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium">Live Dashboard</p>
                  <Badge variant="outline" className="border-sky-500/30 text-sky-700 dark:text-sky-300">Tracking: Live</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/70 bg-background/80 p-3">
                    <p className="text-xs text-muted-foreground">Session Avg WPM</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">87</p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-background/80 p-3">
                    <p className="text-xs text-muted-foreground">Corrections/min</p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight">2.4</p>
                  </div>
                </div>
                <div className="mt-3 rounded-lg border border-border/70 bg-background/80 p-3">
                  <p className="text-xs text-muted-foreground">Top mistakes</p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center justify-between"><span>definately -&gt; definitely</span><span className="text-muted-foreground">93%</span></div>
                    <div className="flex items-center justify-between"><span>adress -&gt; address</span><span className="text-muted-foreground">88%</span></div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="absolute -bottom-4 -left-4 hidden w-52 rounded-xl border-sky-500/30 bg-background/90 p-0 shadow-lg backdrop-blur md:block">
              <CardContent className="space-y-1 p-3 text-xs">
                <p className="font-medium">Tracking status</p>
                <p className="text-2xl font-semibold tracking-tight text-sky-700 dark:text-sky-300">Live</p>
                <p className="text-muted-foreground">Corrections/min: 2.4</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

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

        <section id="features" className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Core Features</h2>
            <p className="mt-3 text-muted-foreground">Measure live, understand mistakes, and train with clear AI coaching actions.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gauge className="h-4 w-4 text-sky-600 dark:text-sky-300" />Real-time stats</CardTitle>
                <CardDescription>Live WPM hero, mini trend bars, rhythm state, corrections/min, and tracking status.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border/70 bg-background/80 p-3">
                  <div className="text-2xl font-semibold tracking-tight">87 <span className="text-xs font-medium text-muted-foreground">WPM</span></div>
                  <div className="mt-2 flex h-8 items-end gap-1">
                    {[35, 62, 58, 72, 64, 80, 87].map((h) => (
                      <div key={h} className="w-full rounded-sm bg-sky-500/70" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />Deep mistake audit</CardTitle>
                <CardDescription>See recurring typo patterns, mistyped-to-suggested corrections, confidence, and count.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 rounded-xl border border-border/70 bg-background/80 p-3 text-sm">
                  <div className="flex items-center justify-between"><span>definately -&gt; definitely</span><span className="text-muted-foreground">93%</span></div>
                  <div className="flex items-center justify-between"><span>seperate -&gt; separate</span><span className="text-muted-foreground">88%</span></div>
                  <div className="flex items-center justify-between"><span>teh -&gt; the</span><span className="text-muted-foreground">97%</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-sky-600 dark:text-sky-300" />AI mission and checklist</CardTitle>
                <CardDescription>Get session missions, strengths and risks, drill words with hints, and a focused action list.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 rounded-xl border border-border/70 bg-background/80 p-3 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-600 dark:text-sky-300" />4-minute ring-finger drill</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-600 dark:text-sky-300" />8 target words with hints</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-sky-600 dark:text-sky-300" />2-point accuracy checklist</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="walkthrough" className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Product Walkthrough</h2>
            <p className="mt-3 text-muted-foreground">A simple closed loop: track, analyze, practice, improve.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {stepFlow.map((step, index) => (
              <Card key={step.title} className="relative rounded-2xl border-border/60 bg-card/70">
                <CardHeader>
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">Step {index + 1}</div>
                  <CardTitle className="flex items-center gap-2">
                    <step.icon className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                    {step.title}
                  </CardTitle>
                  <CardDescription>{step.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Feature Deep Dives</h2>
            <p className="mt-3 text-muted-foreground">Everything in one dashboard: live KPIs, mistake intelligence, and practical AI coaching.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-4 w-4 text-sky-600 dark:text-sky-300" />WPM and KPI rhythm</CardTitle>
                <CardDescription>Session Avg WPM, rhythm state, corrections/min, tracking status, and refresh interval controls.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/80 px-3 py-2"><span>Rhythm</span><span className="text-sky-700 dark:text-sky-300">Steady</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/80 px-3 py-2"><span>Corrections/min</span><span>2.4</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/80 px-3 py-2"><span>Tracking</span><span className="text-sky-700 dark:text-sky-300">Live</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-amber-600 dark:text-amber-400" />Top mistakes intelligence</CardTitle>
                <CardDescription>Dictionary-aware correction suggestions help you fix repeat errors with high confidence.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="rounded-lg border border-border/70 bg-background/80 p-2">occurence -&gt; occurrence <span className="text-muted-foreground">(x11)</span></div>
                  <div className="rounded-lg border border-border/70 bg-background/80 p-2">adress -&gt; address <span className="text-muted-foreground">(x8)</span></div>
                  <div className="rounded-lg border border-border/70 bg-background/80 p-2">enviroment -&gt; environment <span className="text-muted-foreground">(x6)</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListChecks className="h-4 w-4 text-sky-600 dark:text-sky-300" />Drill words and actions</CardTitle>
                <CardDescription>Session mission, word drills with hints, and action checklist with estimated time.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="rounded-lg border border-border/70 bg-background/80 p-2">Mission: stabilize pace above 80 WPM for 6 minutes</div>
                  <div className="rounded-lg border border-border/70 bg-background/80 p-2">Drill words: occurrence, rhythm, separate</div>
                  <div className="rounded-lg border border-border/70 bg-background/80 p-2">Checklist: 2 actions, 9 min total</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur-sm">
            <CardContent className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-medium">Ready for your first analysis report?</p>
                <p className="text-sm text-muted-foreground">Install Typerr, complete one real work session, then run your first AI mission.</p>
              </div>
              <Button className="bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400" render={<a href="#downloads" />}>
                Go to Downloads
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Progress and Consistency</h2>
            <p className="mt-3 text-muted-foreground">Use the 12-week heatmap and improvement focus card to sustain practice and avoid random drilling.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><LineChart className="h-4 w-4 text-sky-600 dark:text-sky-300" />12-week activity heatmap</CardTitle>
                <CardDescription>Visual consistency cues help you keep momentum and spot off-weeks early.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-1 rounded-xl border border-border/70 bg-background/70 p-3">
                  {Array.from({ length: 84 }, (_, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-sm"
                      style={{
                        background:
                          idx % 7 === 0
                            ? "rgba(14, 165, 233, 0.55)"
                            : idx % 5 === 0
                              ? "rgba(14, 165, 233, 0.35)"
                              : "rgba(148, 163, 184, 0.24)",
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-4 w-4 text-amber-600 dark:text-amber-400" />Improvement focus</CardTitle>
                <CardDescription>Prioritized guidance based on your latest snapshot versus previous sessions.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="rounded-lg border border-border/70 bg-background/80 p-2">Stabilize rhythm for 2 x 4-minute blocks</li>
                  <li className="rounded-lg border border-border/70 bg-background/80 p-2">Reduce repeated e/i swaps in common words</li>
                  <li className="rounded-lg border border-border/70 bg-background/80 p-2">Target 1.5 corrections/min threshold</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="privacy" className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Privacy and Trust</h2>
            <p className="mt-3 text-muted-foreground">Typerr is privacy-conscious and local-first. You keep control of your typing data.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-300" />What Typerr does</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>- Processes typing performance signals locally for real-time KPIs and feedback.</li>
                  <li>- Builds mistake patterns and practice recommendations from your sessions.</li>
                  <li>- Presents AI mission, drill words, and checklist actions in one dashboard.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-amber-600 dark:text-amber-400" />What Typerr does not do</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>- Does not market itself as a raw keystroke export tool.</li>
                  <li>- Does not require you to leave your normal workflow to run synthetic typing tests.</li>
                  <li>- Only requests keyboard accessibility permission to enable live tracking and coaching signals.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="downloads" className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">Download Typerr</h2>
            <p className="mt-3 text-muted-foreground">Choose your platform and start your first analysis report today.</p>
          </div>
          <Card className="mb-4 rounded-2xl border-border/60 bg-card/60">
            <CardContent className="flex flex-wrap items-center gap-3 py-2 text-sm text-muted-foreground">
              <Badge variant="outline">Version: {versionLabel}</Badge>
              <Badge variant="outline">Release date: {releaseDateLabel}</Badge>
              <Badge variant="outline">Channel: latest artifacts</Badge>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            {resolvedDownloads.map((item) => (
              <Card key={item.os} className="rounded-2xl border-border/60 bg-card/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                    {item.os}
                  </CardTitle>
                  <CardDescription>Desktop installer</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="h-10 w-full bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:text-black dark:hover:bg-sky-400"
                    render={<a href={item.href} />}
                  >
                    <Download className="h-4 w-4" />
                    {item.label}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((item) => (
              <details key={item.question} className="rounded-xl border border-border/60 bg-card/70 p-4">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">{item.question}</summary>
                <p className="pt-3 text-sm text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="pb-6">
          <Card className="rounded-2xl border-border/60 bg-[linear-gradient(120deg,rgba(14,165,233,0.2),rgba(34,211,238,0.14))]">
            <CardContent className="flex flex-col gap-4 py-5 text-center sm:items-center">
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Improve typing speed and accuracy with actionable coaching.</h2>
              <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">Measure live, understand mistakes, train with intent, and improve consistently with Typerr.</p>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {resolvedDownloads.map((item) => (
                  <Button
                    key={`final-${item.os}`}
                    variant="outline"
                    className="border-sky-500/40 bg-background/85"
                    render={<a href={item.href} />}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="pt-8 text-center text-xs text-muted-foreground">Typerr {year}. Built for measurable typing improvement.</footer>

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
