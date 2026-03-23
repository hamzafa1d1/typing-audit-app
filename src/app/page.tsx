"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Keyboard,
  Activity,
  TrendingUp,
  BookOpen,
  Lock,
  Apple,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans tracking-tight text-foreground selection:bg-secondary">
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-[max(5rem,calc(env(safe-area-inset-top,0px)+3rem))] sm:px-6 sm:pb-32 sm:pt-20 lg:px-8">
        <div className="absolute right-[max(1rem,env(safe-area-inset-right,0px))] top-[max(1rem,calc(env(safe-area-inset-top,0px)+0.5rem))] z-20 sm:right-6 sm:top-6">
          <ModeToggle />
        </div>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-16 pt-4 text-center sm:pb-20 md:pb-32 md:pt-16"
        >
          <div className="mb-6 flex justify-center px-1">
            <span className="flex max-w-[min(100%,20rem)] flex-wrap items-center justify-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-center text-xs font-medium text-emerald-700 sm:max-w-none sm:text-sm dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 dark:bg-emerald-400"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-500"></span>
              </span>
              Ghost Mode Active
            </span>
          </div>

          <h1 className="mx-auto mb-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.1] tracking-tighter text-foreground sm:text-5xl md:text-7xl">
            Master the keyboard <span className="text-muted-foreground">without opening an app.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl px-0 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Typerr runs invisibly in the background across Slack, VS Code, and Chrome. 
            It intercepts your typing, audits your accuracy, and engineers vocabulary improvements—passively.
          </p>
          <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4 sm:gap-y-3 md:gap-x-6">
            <Button size="lg" className="group h-12 w-full rounded-full px-6 text-sm font-medium sm:h-14 sm:w-auto sm:px-8 sm:text-base">
              <Apple className="mr-2 h-5 w-5 shrink-0" />
              Download for macOS
            </Button>
            <Button size="lg" variant="secondary" className="h-12 w-full rounded-full px-6 text-sm font-medium sm:h-14 sm:w-auto sm:px-8 sm:text-base">
              Join the 120 WPM Club (Newsletter)
            </Button>
          </div>
        </motion.div>

        {/* DEMO SCREENSHOTS */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative py-12 sm:py-16 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="absolute right-6 top-28 h-48 w-48 rounded-full bg-indigo-400/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-2xl px-1 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              A calm, real-time cockpit.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              See what Typerr looks like in the wild, from live audit signals to KPI momentum.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-3 shadow-[0_15px_60px_rgba(15,23,42,0.12)] transition-transform duration-500 hover:-translate-y-1 dark:bg-neutral-900/40">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/demo-app-live.png"
                alt="Live typing audit dashboard showing real-time speed and status"
                width={2120}
                height={1486}
                className="h-auto w-full rounded-2xl"
                priority
              />
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-3 shadow-[0_15px_60px_rgba(15,23,42,0.12)] transition-transform duration-500 hover:-translate-y-1 dark:bg-neutral-900/40">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Image
                src="/demo-app-dashboard.png"
                alt="KPI momentum and feedback hub cards from the Typerr dashboard"
                width={2130}
                height={1494}
                className="h-auto w-full rounded-2xl"
              />
            </div>
          </div>
        </motion.section>

        {/* BENTO GRID (FEATURES) */}
        <div className="py-16 sm:py-24 md:py-32">
          <div className="mx-auto mb-10 max-w-2xl px-1 text-center sm:mb-16 sm:px-0">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Real-world performance, intercepted.
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Traditional typing tests are artificial. Typerr measures your "Burst Speed" and accuracy in the tools you actually use.
            </p>
          </div>

          <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:gap-6 md:auto-rows-[minmax(280px,auto)] md:grid-cols-3 md:gap-6">
            {/* Box 1: Small - Real-time Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-muted/70 p-5 sm:min-h-[280px] sm:rounded-3xl sm:p-8 md:col-span-1 md:min-h-0 group dark:bg-card/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Activity className="h-8 w-8 text-indigo-600 mb-6 dark:text-indigo-400" />
              <h3 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">Real-time Stats</h3>
              <p className="mb-4 text-sm text-muted-foreground sm:mb-6 sm:text-base">Live WPM widget right in your menubar.</p>
              
              {/* Mock UI */}
              <div className="mt-auto flex items-center gap-3 rounded-xl border border-border bg-background/80 p-3 sm:gap-4 sm:p-4 dark:bg-black/40">
                <div className="text-3xl font-bold text-foreground tracking-tighter">114 <span className="text-sm font-medium text-muted-foreground">WPM</span></div>
                <div className="h-8 flex-1 flex items-end gap-1">
                  {[40, 60, 50, 80, 70, 100, 114].map((h, i) => (
                    <div key={i} className="bg-indigo-500/80 rounded-t-sm w-full" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Box 2: Large - The Deep Audit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative min-h-[280px] overflow-hidden rounded-2xl border border-border bg-muted/70 p-5 sm:min-h-[300px] sm:rounded-3xl sm:p-8 md:col-span-2 md:min-h-0 group dark:bg-card/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Keyboard className="mb-4 h-8 w-8 text-rose-600 sm:mb-6 dark:text-rose-400" />
              <h3 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">The Deep Audit</h3>
              <p className="mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">Precision heatmaps of your exact keystroke mistakes. Re-program your muscle memory targeted to problem keys.</p>

              {/* Mock UI — scroll on narrow viewports (full QWERTY row) */}
              <div className="mt-2 flex w-full max-w-full justify-center sm:mt-4">
                <div className="max-w-full overflow-x-auto overscroll-x-contain px-1 [-webkit-overflow-scrolling:touch]">
                  <div className="flex min-w-min flex-col gap-2 rounded-2xl border border-border bg-background/80 p-3 sm:p-6 dark:bg-black/40">
                  <div className="flex justify-center gap-1 sm:gap-2">
                    {['Q','W','E','R','T','Y','U','I','O','P'].map((k) => (
                      <div key={k} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border text-xs font-bold sm:h-10 sm:w-10 sm:text-sm
                        ${k === 'P' ? 'bg-rose-500/15 text-rose-700 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)] dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/50 dark:shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 
                          k === 'O' ? 'bg-orange-500/15 text-orange-700 border-orange-500/40 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/50' : 'bg-muted text-muted-foreground dark:bg-neutral-900/80 dark:text-neutral-500'}`}>
                        {k}
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 3: Large - Progress Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-muted/70 p-5 sm:min-h-[300px] sm:rounded-3xl sm:p-8 md:col-span-2 md:min-h-0 group dark:bg-card/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp className="mb-4 h-8 w-8 text-emerald-600 sm:mb-6 dark:text-emerald-400" />
              <h3 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">Progress Timeline</h3>
              <p className="mb-6 max-w-md text-sm text-muted-foreground sm:mb-8 sm:text-base">Weekly performance reports detailing "Burst Speed" intervals vs. overall endurance.</p>
              
              <div className="relative flex h-24 w-full flex-col justify-end overflow-hidden rounded-xl border border-border bg-background/80 p-4 dark:bg-black/40">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/20 to-transparent mix-blend-screen" />
                  <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full text-emerald-500 stroke-current stroke-[0.5] fill-none overflow-visible">
                     <path d="M0,20 C10,15 20,18 30,10 C40,2 50,12 60,8 C70,4 80,6 100,0" vectorEffect="non-scaling-stroke" />
                  </svg>
              </div>
            </motion.div>

            {/* Box 4: Small - Vocab Intelligence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative min-h-[260px] overflow-hidden rounded-2xl border border-border bg-muted/70 p-5 sm:min-h-[280px] sm:rounded-3xl sm:p-8 md:col-span-1 md:min-h-0 group dark:bg-card/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <BookOpen className="mb-4 h-8 w-8 text-amber-600 sm:mb-6 dark:text-amber-400" />
              <h3 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">Vocab Pop-up</h3>
              <p className="text-sm text-muted-foreground sm:text-base">Stumble on a word? Get the definition and mnemonic instantly via notification.</p>

              {/* Mock UI */}
              <div className="mt-6 flex min-w-0 gap-3 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg sm:mt-8">
                 <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-amber-500/15 dark:bg-amber-500/20">
                    <BookOpen className="h-4 w-4 text-amber-700 dark:text-amber-500" />
                 </div>
                 <div>
                    <div className="text-sm font-semibold text-foreground">acquiesce (v.)</div>
                    <div className="mt-1 text-xs leading-tight text-muted-foreground">Accept something reluctantly but without protest.</div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* PRIVACY SHIELD (Dealbreaker Section) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative my-16 overflow-hidden rounded-2xl border border-border bg-muted/50 p-6 sm:my-24 sm:rounded-3xl sm:p-10 md:my-32 md:p-16 dark:border-border dark:bg-black/40"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted via-background to-background opacity-80 dark:from-neutral-800/30 dark:via-black dark:to-black dark:opacity-60"></div>
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm dark:bg-neutral-900 dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Lock className="h-8 w-8 text-muted-foreground dark:text-neutral-300" />
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Local-First. Zero Compromises.
            </h2>
            <p className="mb-8 max-w-xl text-base text-muted-foreground sm:mb-12 sm:text-lg">
              Typerr intercepts your typing at the OS level, meaning privacy isn't a feature—it's foundational.
            </p>

            <div className="grid w-full max-w-3xl grid-cols-1 gap-4 text-left sm:gap-8 md:grid-cols-2">
              <div className="flex gap-3 rounded-2xl border border-border bg-background/70 p-4 sm:gap-4 sm:p-6 dark:bg-neutral-900/30">
                <Shield className="mt-1 h-6 w-6 shrink-0 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Local Processing</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    All analysis happens on your CPU. We never upload your keystrokes to any server or cloud API.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 rounded-2xl border border-border bg-background/70 p-4 sm:gap-4 sm:p-6 dark:bg-neutral-900/30">
                <Lock className="mt-1 h-6 w-6 shrink-0 text-rose-600 dark:text-rose-400" />
                <div>
                  <h4 className="mb-2 font-semibold text-foreground">Encrypted Logs</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Your typing data is completely encrypted at rest and automatically wiped from disk every 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM CTA */}
        <div className="px-1 pb-16 text-center sm:pb-24">
          <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">Start typing at the speed of thought.</h2>
          <Button size="lg" className="group mx-auto h-12 w-full max-w-sm rounded-full px-6 text-sm font-medium sm:h-14 sm:max-w-none sm:w-auto sm:px-8 sm:text-base">
            <Apple className="mr-2 h-5 w-5 shrink-0" />
            Download Typerr Now
          </Button>
        </div>
        
        {/* Schema Markup for FAQ inserted transparently (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Does Typerr work outside of the browser?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Typerr intercepts typing across the entire OS, including VS Code, Slack, and Chrome."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my keystroke data secure?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. All processing is strictly local. Keystroke logs are heavily encrypted at rest and deleted on a 24-hour cycle."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </div>
  );
}
