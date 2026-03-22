"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Keyboard,
  Activity,
  TrendingUp,
  BookOpen,
  Lock,
  Apple,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans tracking-tight selection:bg-gray-800">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-32">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:pb-32 pb-20 pt-16"
        >
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Ghost Mode Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter max-w-4xl mx-auto leading-tight text-white mb-6">
            Master the keyboard <span className="text-gray-500">without opening an app.</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
            Typerr runs invisibly in the background across Slack, VS Code, and Chrome. 
            It intercepts your typing, audits your accuracy, and engineers vocabulary improvements—passively.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="h-14 px-8 bg-white text-black hover:bg-gray-200 rounded-full font-medium text-base group">
              <Apple className="mr-2 h-5 w-5" />
              Download for macOS
            </Button>
            <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full font-medium text-base text-gray-300 hover:text-white">
              Join the 120 WPM Club (Newsletter)
            </Button>
          </div>
        </motion.div>

        {/* BENTO GRID (FEATURES) */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Real-world performance, intercepted.
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Traditional typing tests are artificial. Typerr measures your "Burst Speed" and accuracy in the tools you actually use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Box 1: Small - Real-time Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-1 border border-gray-800 bg-gray-900/50 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Activity className="h-8 w-8 text-indigo-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-2">Real-time Stats</h3>
              <p className="text-gray-400 mb-6">Live WPM widget right in your menubar.</p>
              
              {/* Mock UI */}
              <div className="mt-auto bg-black/60 border border-gray-800 p-4 rounded-xl flex items-center gap-4">
                <div className="text-3xl font-bold text-white tracking-tighter">114 <span className="text-sm text-gray-500 font-medium">WPM</span></div>
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
              className="md:col-span-2 border border-gray-800 bg-gray-900/50 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Keyboard className="h-8 w-8 text-rose-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-2">The Deep Audit</h3>
              <p className="text-gray-400 mb-8 max-w-md">Precision heatmaps of your exact keystroke mistakes. Re-program your muscle memory targeted to problem keys.</p>

              {/* Mock UI */}
              <div className="w-full flex justify-center mt-4">
                <div className="flex flex-col gap-2 p-6 bg-black/60 border border-gray-800 rounded-2xl">
                  <div className="flex gap-2 justify-center">
                    {['Q','W','E','R','T','Y','U','I','O','P'].map((k) => (
                      <div key={k} className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm border border-gray-800 
                        ${k === 'P' ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]' : 
                          k === 'O' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 'bg-gray-900/80 text-gray-500'}`}>
                        {k}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Box 3: Large - Progress Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 border border-gray-800 bg-gray-900/50 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <TrendingUp className="h-8 w-8 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-2">Progress Timeline</h3>
              <p className="text-gray-400 mb-8 max-w-md">Weekly performance reports detailing "Burst Speed" intervals vs. overall endurance.</p>
              
              <div className="w-full h-24 bg-black/60 border border-gray-800 rounded-xl overflow-hidden relative p-4 flex flex-col justify-end">
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
              className="md:col-span-1 border border-gray-800 bg-gray-900/50 rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <BookOpen className="h-8 w-8 text-amber-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-2">Vocab Pop-up</h3>
              <p className="text-gray-400">Stumble on a word? Get the definition and mnemonic instantly via notification.</p>

              {/* Mock UI */}
              <div className="mt-8 bg-black/80 border border-gray-800 rounded-lg p-3 shadow-2xl flex gap-3">
                 <div className="mt-1 w-8 h-8 rounded-md bg-amber-500/20 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-amber-500 border-amber-500/50"/>
                 </div>
                 <div>
                    <div className="text-sm font-semibold text-white">acquiesce (v.)</div>
                    <div className="text-xs text-gray-400 leading-tight mt-1">Accept something reluctantly but without protest.</div>
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
          className="my-32 border border-gray-800 bg-black/40 rounded-3xl p-10 sm:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black opacity-60"></div>
          <div className="relative flex flex-col items-center text-center">
            <div className="h-16 w-16 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Lock className="h-8 w-8 text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Local-First. Zero Compromises.
            </h2>
            <p className="text-lg text-gray-400 max-w-xl mb-12">
              Typerr intercepts your typing at the OS level, meaning privacy isn't a feature—it's foundational.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl text-left">
              <div className="flex gap-4 p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                <Shield className="h-6 w-6 text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Local Processing</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    All analysis happens on your CPU. We never upload your keystrokes to any server or cloud API.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                <Lock className="h-6 w-6 text-rose-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-2">Encrypted Logs</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your typing data is completely encrypted at rest and automatically wiped from disk every 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM CTA */}
        <div className="text-center pb-24">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">Start typing at the speed of thought.</h2>
          <Button size="lg" className="h-14 px-8 bg-white text-black hover:bg-gray-200 rounded-full font-medium text-base group">
            <Apple className="mr-2 h-5 w-5" />
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
