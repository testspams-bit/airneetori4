/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Logo } from './components/Logo.tsx';
import { SocialModal } from './components/SocialModal.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { GetInTouchModal } from './components/GetInTouchModal.tsx';
import { Footer } from './components/Footer.tsx';
import { DesktopNav, MobileBottomNav } from './components/Navigation.tsx';
import { AnimatedCursor } from './components/AnimatedCursor.tsx';
import { SupportAgentIcon } from './components/SupportAgentIcon.tsx';
import {
  Sun,
  Moon,
  LogIn,
  Mail,
  ArrowRight,
  Award,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Globe,
  GraduationCap,
  Target,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';

  const [activeNav, setActiveNav] = useState<string>('home');
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isGetInTouchOpen, setIsGetInTouchOpen] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex flex-col justify-between pb-16 md:pb-0 ${
        isDark
          ? 'bg-[#080808] text-white selection:bg-[#CCFF00] selection:text-black'
          : 'bg-white text-slate-900 selection:bg-[#0066FF] selection:text-white'
      }`}
    >
      {/* Top Header / Navigation Bar */}
      <header
        className={`w-full sticky top-0 z-40 backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#080808]/90 border-b border-zinc-900' : 'bg-white/90 border-b border-slate-200 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1 (Left): Brand Logo & Wordmark */}
          <button
            type="button"
            onClick={() => setIsSocialOpen(true)}
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded-xl transition-transform active:scale-98 cursor-pointer text-left"
            title="Click to visit Instagram & YouTube channels"
            aria-label="Air NEETwork — Open Instagram and YouTube channels"
          >
            <Logo theme={theme} size="sm" />
          </button>

          {/* Zone 2 (Center): Main Navigation Icons (Balanced in the middle) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <DesktopNav
              theme={theme}
              activeId={activeNav}
              onSelect={setActiveNav}
            />
          </div>

          {/* Zone 3 (Right): User Controls Cluster (Theme Switcher + Log in) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Sliding Theme Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isDark}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`relative w-15 sm:w-16 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out border focus:outline-none flex items-center justify-between cursor-pointer select-none shrink-0 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-700'
                  : 'bg-slate-200 border-slate-300'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle dark and light mode"
            >
              {/* Track Background Icons */}
              <Sun
                className={`w-3.5 h-3.5 ml-1 transition-opacity duration-200 ${
                  isDark ? 'text-zinc-600 opacity-60' : 'text-[#0066FF] opacity-90'
                }`}
              />
              <Moon
                className={`w-3.5 h-3.5 mr-1 transition-opacity duration-200 ${
                  isDark ? 'text-[#CCFF00] opacity-90' : 'text-slate-400 opacity-60'
                }`}
              />

              {/* Sliding Thumb Knob */}
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full shadow-md transition-transform duration-300 ease-out flex items-center justify-center ${
                  isDark
                    ? 'translate-x-7 sm:translate-x-8 bg-black text-[#CCFF00] border border-zinc-700'
                    : 'translate-x-0 bg-white text-[#0066FF]'
                }`}
              >
                {isDark ? (
                  <Moon className="w-3.5 h-3.5" />
                ) : (
                  <Sun className="w-3.5 h-3.5" />
                )}
              </div>
            </button>

            {/* Subtle Divider between Theme Control and Log in */}
            <div className={`hidden sm:block h-5 w-px ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />

            {/* Log In Button */}
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 shadow-sm ${
                isDark
                  ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33]'
                  : 'bg-[#0066FF] text-white hover:bg-[#0052cc] shadow-[#0066FF]/20 shadow-md'
              }`}
              title="Log in to your account"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log in</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area - Full height so footer is hidden until scroll */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
        {/* Dynamic Tab Content */}
        <div className="py-12 md:py-20 flex-1">
          {activeNav === 'home' && (
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-6 border ${
                  isDark
                    ? 'bg-zinc-900 border-zinc-800 text-[#CCFF00]'
                    : 'bg-slate-100 border-slate-200 text-[#0066FF]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-on-1 Strategic Mentorship · Class 11, 12 &amp; Droppers</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] mb-6">
                Cracking NEET Gets Better When You Have An{' '}
                <span className={isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}>
                  AIR Mentor
                </span>
              </h1>

              <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-8 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                Connect with MBBS toppers from AIIMS, MAMC, and top government medical colleges who personally mastered the 700+ cutoff thresholds.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left font-mono">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`text-lg font-bold mb-1 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`}>
                    AIR &lt; 1000
                  </div>
                  <div className="text-xs text-zinc-400">Verified AIIMS &amp; GMC MBBS Mentors</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`text-lg font-bold mb-1 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`}>
                    Zero Fluff
                  </div>
                  <div className="text-xs text-zinc-400">Weekly Error Log &amp; Speed Audits</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className={`text-lg font-bold mb-1 ${isDark ? 'text-[#CCFF00]' : 'text-[#0066FF]'}`}>
                    O.Q.A.D Daily
                  </div>
                  <div className="text-xs text-zinc-400">Original Question A Day Practice</div>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'toppers' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-2">
                  AIR Ranker Mentors
                </h2>
                <p className="text-sm text-zinc-400 font-mono">
                  Learn directly from top scorers who walked the exact path
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Aryan Sharma', rank: 'AIR 48', score: '710/720', college: 'AIIMS New Delhi', focus: 'Physics Numericals & Speed' },
                  { name: 'Dr. Tanya Verma', rank: 'AIR 112', score: '705/720', college: 'MAMC New Delhi', focus: 'NCERT Biology High-Yield Retention' },
                  { name: 'Rohan Deshmukh', rank: 'AIR 230', score: '695/720', college: 'VMMC & Safdarjung', focus: 'Organic Chemistry Pathways' },
                ].map((topper, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                          isDark ? 'bg-[#CCFF00]/15 text-[#CCFF00]' : 'bg-[#0066FF]/10 text-[#0066FF]'
                        }`}>
                          {topper.rank}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">{topper.score}</span>
                      </div>
                      <h3 className="text-lg font-bold">{topper.name}</h3>
                      <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1 font-mono">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{topper.college}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-800/60 text-xs font-mono text-zinc-400">
                      <strong>Focus:</strong> {topper.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'oqad' && (
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl border text-left bg-zinc-900/40 border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                  isDark ? 'bg-[#CCFF00]/15 text-[#CCFF00]' : 'bg-[#0066FF]/10 text-[#0066FF]'
                }`}>
                  O.Q.A.D #142 · Physics Electrostatics
                </span>
                <span className="text-xs font-mono text-zinc-400">High Yield NEET UG</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold leading-relaxed mb-4">
                Two point charges +4q and +q are placed at distance L apart. A third charge Q is placed on the line joining them so that the whole system remains in equilibrium. What is the value and position of Q?
              </h3>
              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800">A) -4q/9 at distance 2L/3 from +4q</div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800">B) +4q/9 at distance L/3 from +4q</div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800">C) -2q/3 at distance L/2 from +4q</div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-zinc-800">D) -q/4 at distance L/4 from +q</div>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-4">
                Log in to submit your answer and view the complete ranker explanation.
              </p>
            </div>
          )}

          {activeNav === 'abroad' && (
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-3">
                MBBS Abroad Guidance
              </h2>
              <p className="text-sm text-zinc-400 font-mono max-w-xl mx-auto mb-8">
                NMC &amp; WHO recognized international medical universities with transparent fee structures and FMGE/NExT coaching.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-mono">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="font-bold text-sm mb-1">Georgia &amp; Kazakhstan</div>
                  <div className="text-xs text-zinc-400">European curriculum, 100% English medium, low living cost.</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="font-bold text-sm mb-1">NMC 2021 Compliant</div>
                  <div className="text-xs text-zinc-400">Strict adherence to 54 months course + 12 months internship.</div>
                </div>
              </div>
            </div>
          )}

          {activeNav === 'about' && (
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-4">
                About AIR NEETwork
              </h2>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                AIR NEETwork was founded with a singular conviction: genuine NEET rankers who conquered the exam under real pressure provide far better strategic direction than generic commercial sales counselors.
              </p>
              <p className={`text-xs font-mono leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                Headquartered in Jaipur (302018), we mentor aspirants across India, focusing on systematic negative mark reduction, speed optimization, and high-yield topic mastery.
              </p>
            </div>
          )}
        </div>

        {/* End of Screen: "Get in touch" Button (Positioned at the end of content, strictly OUTSIDE the footer) */}
        <div className="py-12 flex flex-col items-center justify-center text-center border-t border-zinc-800/50">
          <p className="text-xs font-mono text-zinc-400 mb-4">
            Have questions about mentorship or admissions?
          </p>
          <button
            type="button"
            onClick={() => setIsGetInTouchOpen(true)}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider font-mono transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg ${
              isDark
                ? 'bg-[#CCFF00] text-black hover:bg-[#d8ff33]'
                : 'bg-[#0066FF] text-white hover:bg-[#0052cc]'
            }`}
            title="Open contact & callback options"
          >
            <Mail className="w-4 h-4" />
            <span>Get in touch</span>
          </button>
        </div>
      </main>

      {/* Footer Section - Located below the fold, only visible upon scrolling */}
      <Footer theme={theme} />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        theme={theme}
        activeId={activeNav}
        onSelect={setActiveNav}
      />

      {/* Fixed customer support representative icon */}
      <SupportAgentIcon theme={theme} />

      {/* Get In Touch Modal (WhatsApp, Mobile Number, Request Callback Form) */}
      <GetInTouchModal
        isOpen={isGetInTouchOpen}
        onClose={() => setIsGetInTouchOpen(false)}
        theme={theme}
      />

      {/* Student & Mentor Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        theme={theme}
      />

      {/* Instagram & YouTube Pop-up Modal */}
      <SocialModal
        isOpen={isSocialOpen}
        onClose={() => setIsSocialOpen(false)}
        theme={theme}
      />

      {/* Fluid Animated Mouse Cursor Bubble */}
      <AnimatedCursor theme={theme} />
    </div>
  );
}
