export default function Landing() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Space+Grotesk:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div className="landing-theme bg-background font-body-md text-body-md text-on-surface antialiased selection:bg-primary-container selection:text-white">
        <header className="fixed top-0 w-full z-50 bg-[#0f131d]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
            <div className="flex items-center gap-space-md">
              <img
                alt="Brand logo. - Primary color: #5b4df6 - Font: spaceGrotesk - Mode: light - Roundness: rounded-md"
                className="h-8 w-auto object-contain brightness-110 drop-shadow-[0_0_8px_rgba(128,131,255,0.4)]"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WxHRTwBeo0DANy75wIT9STgD6_TwPjY1T3yI1ejhQwmbkIDrCVfujEdUYLS_4sYWph95j0brXiCMNlxATdwPjrb7egO-pQFlw575FhRzdYE7YlcxmAgMsSgYbAxPuNrwSW2AkMoVU84atkC4L7ZgPys7jacllPvbR4Td4FRM7_LXszifnU0Q_1oRrkB9TQjWij2zPmTnAb-7dgrkhnvVcWe8pC8I2Yzg6ugUl_7lrgo7v4mC4zdcDlxHuB"
              />
              <a className="font-headline-md text-headline-md text-white tracking-tight font-bold" data-path="landing" href="#">
                StudyPulse
              </a>
              <span className="hidden lg:inline-flex items-center px-space-sm py-0.5 rounded-full bg-secondary-container/20 border border-secondary/40 text-secondary font-label-stats text-[10px] uppercase tracking-wider">
                AP & National Entrance Exam Edition
              </span>
            </div>
            <nav className="hidden xl:flex items-center gap-space-lg">
              <a aria-current="page" className="transition-colors text-primary font-semibold hover:text-white" data-path="landing" href="#">
                Features
              </a>
              <a className="transition-colors text-on-surface-variant hover:text-white" data-path="landing" href="#">
                Diagnostic AI
              </a>
              <a className="transition-colors text-on-surface-variant hover:text-white" data-path="landing" href="#">
                Past Papers & Simulator
              </a>
              <a className="transition-colors text-on-surface-variant hover:text-white" data-path="landing" href="#">
                Curriculum
              </a>
              <a className="transition-colors text-on-surface-variant hover:text-white" data-path="landing" href="#">
                For Schools & Cohorts
              </a>
            </nav>
            <div className="flex items-center gap-space-md">
              <a className="hidden sm:inline-flex items-center px-space-md py-space-sm font-body-md text-on-surface-variant hover:text-white transition-colors" data-path="login" href="#">
                Log In
              </a>
              <a className="inline-flex items-center px-space-lg py-space-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-body-md font-semibold shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_28px_rgba(99,102,241,0.6)] transition-all active:scale-[0.98] border border-indigo-400/40" data-path="signup" href="#">
                Get Started Free
              </a>
              <div className="w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[18px]">person</span>
              </div>
            </div>
          </div>
        </header>

        <main className="w-full pt-20 bg-background min-h-screen text-on-surface">
          <div className="flex flex-col w-full">
            {/* HERO SECTION */}
            <section className="relative w-full overflow-hidden pb-space-xl lg:pb-32">
              {/* Ambient Atmospheric Glows */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-linear-to-tr from-indigo-600/20 via-primary-container/20 to-tertiary/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
              <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-tertiary-container/15 blur-[120px] -z-10 pointer-events-none rounded-full" />

              <div className="max-w-7xl mx-auto px-margin">
                {/* Kicker Pill */}
                <div className="flex justify-center pt-space-lg mb-space-md">
                  <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low border border-white/[0.08] inset-shadow-2xs transition-all">
                    <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3] animate-pulse" />
                    <span className="font-label-stats text-[11px] text-primary font-bold tracking-wide uppercase">Powered by PulseAI 4.5</span>
                    <span className="text-outline-variant font-bold text-xs">•</span>
                    <span className="font-body-sm text-on-surface-variant font-medium">2025 National & AP Syllabi Updated</span>
                    <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
                  </div>
                </div>

                {/* Main Headline & Subtitle */}
                <div className="max-w-4xl mx-auto text-center mb-space-lg">
                  <h1 className="font-headline-xl lg:text-[54px] lg:leading-[1.15] text-white tracking-tight mb-space-md font-bold">
                    Turn Exam Anxiety into{" "}
                    <span className="bg-linear-to-r from-primary via-indigo-400 to-tertiary bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(129,140,248,0.3)]">
                      Unfair Precision
                    </span>
                    .
                  </h1>
                  <p className="font-body-lg text-body-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
                    StudyPulse decodes your cognitive mistakes across 10+ years of official past papers, generates adaptive Socratic drills, and builds custom countdown study plans tailored specifically to your weak spots.
                  </p>
                </div>

                {/* CTAs & Micro-copy */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md mb-space-xl">
                  <a className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-lg bg-indigo-600 text-white font-body-md font-semibold shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:bg-indigo-500 hover:shadow-[0_0_32px_rgba(99,102,241,0.7)] active:scale-[0.98] transition-all border border-indigo-400/40 group" data-path="signup" href="#">
                    <span>Start Free Diagnostic Sprint</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </a>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 rounded-lg bg-surface-container-low text-white font-body-md font-semibold border border-white/[0.12] hover:bg-surface-container transition-all hover:border-white/20 shadow-md" type="button">
                    <span className="material-symbols-outlined text-[20px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    <span>Explore Past Paper Simulator</span>
                  </button>
                </div>
                <p className="text-center font-body-sm text-[#94a3b8] -mt-space-md mb-space-xl">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span> No credit card required
                  </span>
                  <span className="mx-2 text-outline-variant">•</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">bolt</span> 5-minute calibration sprint
                  </span>
                </p>

                {/* Social Proof Strip */}
                <div className="max-w-3xl mx-auto mb-space-xl p-space-md rounded-xl bg-surface-container-low border border-white/[0.08] shadow-lg shadow-black/40 flex flex-col md:flex-row items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="flex -space-x-3 overflow-hidden p-1">
                      <img alt="Amina K. - AP Biology 99th percentile student holding notebooks" className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" src="https://lh3.googleusercontent.com/aida/AEtjO1WiLZoSrMfpzgLJADed8EW3wQi0kyqpx88LkR3KT0adqybtAUGBkckwWAC4TFH1LhDz0IovsoQt3o24HrFtyBk8AsU6yv9sTjs721fOqfSXypoSOiGinnmbKEj9ssmh4edlA_-gpF-F2cSqBgAm2WOhztzzF290ldy4sPG2aCOAvj7Nu3zECcyigGcJgG_fpTmehN_I8Mj-iwB2YfWgwspER4MXFSPek7RwOayx3mzOPQWi0u-v-SDQevOE" />
                      <img alt="Student avatar" className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Close up profile photo of a smiling focused male high school senior wearing wireless earbuds in a modern sunlit study room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDa4ecJTWwDJNYRwvgVXSVP7orOr62yNTCW0MgtgVTbfvGj4RKIzOlPoTIWT0l0RfCmaGoBUtZVNrOiImQPgTYqufohTqjfiu0u3P8GmERMRIhKYTzx3OH5q-z0EU7EDTwpuHQTkuO9tbk9j8oPmrtosxS0eobqAfVGPWVAw4usTaVGBqv7ET9Zn8Em8YqA5POSLQ70rEjXkq0_MbTBAMYxyzAcLEbG3_Ax3g4jYlCQnfzae7YG1MACQ" />
                      <img alt="Student avatar" className="inline-block h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Portrait of an East Asian high school female student smiling holding a graphite pencil and graphing calculator" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoI8jloQ6QbSgSxfc0kXBaw6rJ165JP73dm3FvaDGA9pkvxwDWAxU591mS1BHNImu-WirQdvgKPt7__7bdWCx459OwVX1ZtprvwTd2abh6FfmtLV0J8t4UH5V6Bmyw4DEL638dDwo_YvEnLvd6Xlo_G5782ZeR2pBwjwBtG3ZZrESc6Fd3tDunkVHh8BkG1jNaMLiLcvG7-o-ryNem2RtWgDIDLPp5md7WhkthtLXAMZSogvqcZhDQlQ" />
                      <div className="inline-flex h-10 w-10 rounded-full bg-indigo-600 text-white items-center justify-center font-label-stats text-[11px] font-bold ring-2 ring-surface-container-lowest">
                        +42k
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="font-bold text-white ml-1.5 text-xs">4.9/5</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-[#94a3b8]">1,820+ verified candidate reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-md text-left border-t md:border-t-0 md:border-l border-white/[0.08] pt-space-sm md:pt-0 md:pl-space-md">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-secondary/40 text-secondary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[22px]">trending_up</span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-white block leading-none font-bold">+14.2%</span>
                      <span className="font-body-sm text-[#94a3b8]">Avg. score lift within 3 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Hero Glassmorphic Interactive Dashboard Mockup */}
                <div className="relative max-w-5xl mx-auto">
                  {/* Floating Badge Top Left */}
                  <div className="hidden sm:flex absolute -top-5 -left-4 z-20 items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-high border border-white/[0.12] shadow-2xl backdrop-blur-md">
                    <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                    <div>
                      <span className="block font-label-stats text-[10px] text-[#94a3b8] uppercase">Active Socratic Engine</span>
                      <span className="font-body-md text-white font-bold text-xs">Zero-Hallucination Verified</span>
                    </div>
                  </div>
                  {/* Floating Badge Bottom Right */}
                  <div className="hidden sm:flex absolute -bottom-6 -right-4 z-20 items-center gap-space-sm px-space-md py-space-sm rounded-lg bg-[#0a0e18] border border-cyan-500/30 text-white shadow-2xl backdrop-blur-md">
                    <div className="w-3 h-3 rounded-full bg-tertiary animate-ping" />
                    <div>
                      <p className="font-label-stats text-[10px] text-[#94a3b8] uppercase">Live Diagnostic Simulator</p>
                      <p className="font-label-code text-xs text-tertiary font-bold">Session #AP-CHEM-2024-C4</p>
                    </div>
                  </div>

                  {/* Main Dashboard Container */}
                  <div className="rounded-2xl bg-[#131825] border border-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-space-md md:p-space-lg ring-1 ring-white/[0.05]">
                    {/* Mock Header Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-md border-b border-white/[0.08]">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="w-3 h-3 rounded-full bg-amber-400" />
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="ml-space-sm font-label-code text-xs text-white font-bold tracking-tight">AP Chemistry & Calculus BC Diagnostic Command</span>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="px-space-sm py-1 rounded-full bg-indigo-950 border border-indigo-500/30 text-primary font-label-stats text-[10px]">
                          Top 5% Cohort Benchmark
                        </span>
                        <span className="px-space-sm py-1 rounded-full bg-surface-container border border-white/[0.06] text-[#cbd5e1] font-label-stats text-[10px]">
                          Timer: 48m 12s remaining
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md">
                      {/* Left Diagnostic Card (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col gap-space-md">
                        <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.06]">
                          <div className="flex items-center justify-between mb-space-sm">
                            <div className="flex items-center gap-space-xs">
                              <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-400 font-label-stats text-[10px] font-bold">Critical Bottleneck</span>
                              <span className="font-body-sm text-[#94a3b8]">Unit 5: Kinetics & Mechanisms</span>
                            </div>
                            <span className="font-label-stats text-xs text-secondary font-bold">+8.4% Net Gain Potential</span>
                          </div>
                          <h3 className="font-headline-md text-base text-white mb-2 font-bold">Reaction Mechanisms & Elementary Rate Laws</h3>
                          <p className="font-body-sm text-[#94a3b8] mb-space-sm leading-normal">
                            PulseAI analyzed 14 erroneous attempts: 83% of errors stem from confusing the <span className="font-bold text-white">slow rate-determining step</span> with overall equilibrium intermediates.
                          </p>
                          {/* Micro Mastery Bar */}
                          <div className="space-y-1 mb-space-sm">
                            <div className="flex justify-between text-xs font-label-stats text-[#94a3b8]">
                              <span>Current Mastery: 62%</span>
                              <span className="text-secondary font-bold">Target Mastery: 92%</span>
                            </div>
                            <div className="w-full h-2.5 bg-[#0a0e18] border border-white/[0.05] rounded-full overflow-hidden flex">
                              <div className="bg-indigo-500 h-full rounded-l-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" style={{ width: "62%" }} />
                              <div className="bg-secondary h-full opacity-60" style={{ width: "25%" }} />
                            </div>
                          </div>
                          {/* Equation Box Preview */}
                          <div className="p-space-sm rounded-lg bg-[#0a0e18] border border-white/[0.08] font-label-code text-xs text-on-surface overflow-x-auto inset-shadow-2xs">
                            <div className="text-[#94a3b8] text-[11px] mb-1 font-sans">Formula Breakdown:</div>
                            <span className="text-tertiary font-bold">Rate = k[NO₂][CO]</span> → Step 1: NO₂ + NO₂ ⇌ N₂O₄ (fast) • Step 2: N₂O₄ + CO → NO + CO₂ (slow)
                          </div>
                        </div>

                        {/* Socratic AI Response Module */}
                        <div className="p-space-md rounded-xl bg-surface-container border border-indigo-500/30">
                          <div className="flex items-center gap-space-sm mb-2">
                            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                              AI
                            </div>
                            <span className="font-body-md text-white font-bold text-xs">Socratic Interactivity Prompt</span>
                            <span className="ml-auto text-[10px] text-primary uppercase font-label-stats">Active Challenge</span>
                          </div>
                          <p className="font-body-sm text-[#cbd5e1] mb-space-sm">
                            "If the concentration of NO₂ is doubled while maintaining equilibrium in Step 1, by what factor does the total production rate of CO₂ increase?"
                          </p>
                          <div className="grid grid-cols-2 gap-space-xs">
                            <button className="p-2 text-left rounded-lg bg-[#0a0e18] border border-white/[0.08] text-xs text-[#cbd5e1] hover:border-indigo-400/40 hover:bg-surface-container-high transition-all flex items-center justify-between">
                              <span>A) 2x factor</span>
                              <span className="material-symbols-outlined text-xs text-outline">radio_button_unchecked</span>
                            </button>
                            <button className="p-2 text-left rounded-lg bg-indigo-950/60 border-2 border-indigo-400 text-xs text-white flex items-center justify-between shadow-[0_0_12px_rgba(99,102,241,0.3)]">
                              <span className="font-bold text-primary">B) 4x factor (Quadruple)</span>
                              <span className="material-symbols-outlined text-xs text-secondary">check_circle</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Diagnostic Chart & Percentile Strip (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-space-md">
                        <div className="p-space-md rounded-xl bg-surface-container-low border border-white/[0.06] h-full flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-space-sm">
                              <span className="font-body-md text-white font-bold text-xs">Past Paper Predictive Bell Curve</span>
                              <span className="text-xs font-label-stats text-[#94a3b8]">n=12,400</span>
                            </div>
                            {/* SVG Score Distribution */}
                            <div className="w-full h-36 flex items-end justify-center py-2">
                              <svg className="w-full h-full overflow-visible text-primary" viewBox="0 0 300 120">
                                <defs>
                                  <linearGradient id="bellGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                                    <stop offset="0%" stopColor="#8083ff" stopOpacity="0.45" />
                                    <stop offset="100%" stopColor="#8083ff" stopOpacity="0.0" />
                                  </linearGradient>
                                </defs>
                                {/* Standard Distribution Curve */}
                                <path d="M 10 110 Q 75 110 110 80 T 150 15 T 190 80 Q 225 110 290 110" fill="url(#bellGrad)" stroke="#818cf8" strokeWidth="2.5" />
                                {/* Your Position Line */}
                                <line stroke="#ffb4ab" strokeDasharray="4 2" strokeWidth="2" x1="220" x2="220" y1="10" y2="110" />
                                <circle cx="220" cy="55" fill="#ffb4ab" r="5" stroke="#0f131d" strokeWidth="2" />
                                <text fill="#ffb4ab" fontSize="9" fontWeight="bold" x="170" y="8">You (Predicted 5 / 96%)</text>
                                <text fill="#908fa0" fontSize="8" x="10" y="118">Score 1-2</text>
                                <text fill="#908fa0" fontSize="8" x="135" y="118">Score 3 (Avg)</text>
                                <text fill="#908fa0" fontSize="8" x="250" y="118">Score 5</text>
                              </svg>
                            </div>
                          </div>
                          {/* Mistake Triage Micro-List */}
                          <div className="space-y-2 mt-space-sm pt-space-sm border-t border-white/[0.08]">
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1.5 font-body-sm text-[#cbd5e1]">
                                <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_#f87171]" /> Conceptual Gap (Kinetics)
                              </span>
                              <span className="font-bold text-red-400 font-label-stats">42% impact</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1.5 font-body-sm text-[#cbd5e1]">
                                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" /> Calculation Sign Flips
                              </span>
                              <span className="font-bold text-amber-400 font-label-stats">28% impact</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1.5 font-body-sm text-[#cbd5e1]">
                                <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" /> Timed Speed Rushing
                              </span>
                              <span className="font-bold text-primary font-label-stats">15% impact</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS & CREDIBILITY STRIP */}
            <section className="w-full bg-surface-container-lowest border-y border-white/[0.06] py-space-xl relative">
              <div className="max-w-7xl mx-auto px-margin">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight mb-1">24+</span>
                    <span className="font-title-sm text-title-sm text-white font-semibold mb-0.5">Authenticated Exam Years</span>
                    <span className="font-body-sm text-body-sm text-[#94a3b8]">College Board & National boards archived</span>
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="font-headline-xl text-headline-xl text-secondary font-bold tracking-tight mb-1">99.4%</span>
                    <span className="font-title-sm text-title-sm text-white font-semibold mb-0.5">Syllabus Coverage</span>
                    <span className="font-body-sm text-body-sm text-[#94a3b8]">Full alignment across STEM & Humanities</span>
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="font-headline-xl text-headline-xl text-tertiary font-bold tracking-tight mb-1">14-Day</span>
                    <span className="font-title-sm text-title-sm text-white font-semibold mb-0.5">Avg. Score Turnaround</span>
                    <span className="font-body-sm text-body-sm text-[#94a3b8]">Targeted Socratic gap-closure loops</span>
                  </div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <span className="font-headline-xl text-headline-xl text-primary-fixed font-bold tracking-tight mb-1">0%</span>
                    <span className="font-title-sm text-title-sm text-white font-semibold mb-0.5">Data Retention</span>
                    <span className="font-body-sm text-body-sm text-[#94a3b8]">Student notes never train external models</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CORE FEATURE HIGHLIGHTS (4 PILLARS BENTO) */}
            <section className="w-full py-space-xl lg:py-32 relative">
              {/* Radial highlight glow */}
              <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] pointer-events-none -z-10 rounded-full" />
              <div className="max-w-7xl mx-auto px-margin">
                <div className="max-w-3xl mb-space-xl">
                  <span className="font-label-stats text-[11px] text-primary uppercase font-bold tracking-wider mb-2 block">System Architecture</span>
                  <h2 className="font-headline-xl text-headline-xl text-white tracking-tight mb-space-sm font-bold">
                    Precision Engineering for the Top 1%.
                  </h2>
                  <p className="font-body-lg text-body-lg text-[#94a3b8]">
                    Generic flashcards and passive video lectures don't survive exam day pressure. StudyPulse provides the 4-tier diagnostic stack used by top prep olympiads.
                  </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
                  {/* Pillar 1: Mistake & Diagnostic Log (7 cols) */}
                  <div className="md:col-span-7 rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-500/40 text-primary flex items-center justify-center mb-space-md shadow-[0_0_16px_rgba(99,102,241,0.25)]">
                        <span className="material-symbols-outlined text-[28px]">troubleshoot</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-white mb-space-xs font-bold">
                        Automated Cognitive Mistake & Diagnostic Log
                      </h3>
                      <p className="font-body-md text-body-md text-[#94a3b8] mb-space-lg">
                        Never re-solve a question you already master. StudyPulse parses your wrong answers into three distinct failure modes: Conceptual Gaps, Calculation Flips, and Time Rush.
                      </p>
                    </div>
                    {/* Feature Graphic */}
                    <div className="rounded-xl bg-[#0a0e18] border border-white/[0.06] p-space-md space-y-space-sm">
                      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-white/[0.04]">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_6px_#f87171]" />
                          <div>
                            <span className="font-body-md text-white block font-semibold text-xs">Conceptual Gap</span>
                            <span className="font-body-sm text-body-sm text-[#94a3b8]">Calculus BC • Taylor Polynomial Remainders</span>
                          </div>
                        </div>
                        <span className="px-space-sm py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 font-label-stats text-[10px] font-bold">5 High-Yield Drills Queued</span>
                      </div>
                      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-white/[0.04]">
                        <div className="flex items-center gap-space-sm">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                          <div>
                            <span className="font-body-md text-white block font-semibold text-xs">Calculation Sign Flip</span>
                            <span className="font-body-sm text-body-sm text-[#94a3b8]">Physics C • Lenz's Law & Magnetic Flux</span>
                          </div>
                        </div>
                        <span className="px-space-sm py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-label-stats text-[10px] font-bold">Attention Pattern Alert</span>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 2: Socratic AI Command Hub (5 cols) */}
                  <div className="md:col-span-5 rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-secondary flex items-center justify-center mb-space-md shadow-[0_0_16px_rgba(78,222,163,0.2)]">
                        <span className="material-symbols-outlined text-[28px]">psychology_alt</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-white mb-space-xs font-bold">
                        Adaptive Socratic AI Command Hub
                      </h3>
                      <p className="font-body-md text-body-md text-[#94a3b8] mb-space-lg">
                        Trained strictly on canonical texts (Zumdahl Chemistry, Campbell Biology, Stewart Calculus). Gives hints, not lazy answers.
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0a0e18] border border-white/[0.06] p-space-md">
                      <div className="flex items-start gap-space-xs mb-space-sm">
                        <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
                        <div className="p-space-sm rounded-lg bg-surface-container-low border border-white/[0.05] text-xs text-[#cbd5e1]">
                          <span className="font-bold text-primary block mb-1">Socratic Mentor</span>
                          "Notice the boundary conditions when t=0. What happens to the denominator in your integration step?"
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs font-label-stats text-[#94a3b8] px-1">
                        <span>Resolution Tree depth: 4 stages</span>
                        <span className="text-secondary font-bold">100% textbook verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 3: Timed Simulator (5 cols) */}
                  <div className="md:col-span-5 rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-cyan-500/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-tertiary flex items-center justify-center mb-space-md shadow-[0_0_16px_rgba(76,215,246,0.2)]">
                        <span className="material-symbols-outlined text-[28px]">timer</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-white mb-space-xs font-bold">
                        Authentic Timed Exam Simulator
                      </h3>
                      <p className="font-body-md text-body-md text-[#94a3b8] mb-space-lg">
                        Recreates the exact biometric, screen, and timing constraints of national testing boards. Real sectional lockouts and authentic past scoring rubrics.
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0a0e18] border border-white/[0.06] p-space-md flex items-center justify-between">
                      <div>
                        <span className="font-label-stats text-[10px] text-[#94a3b8] block uppercase">Section 1 Part A</span>
                        <span className="font-headline-md text-white font-label-code font-bold">00:45:00</span>
                      </div>
                      <div className="text-right">
                        <span className="px-space-sm py-1 rounded bg-tertiary/15 border border-tertiary/30 text-tertiary font-label-stats text-[10px] font-bold block mb-1">Live Calibrated</span>
                        <span className="text-xs text-[#94a3b8]">Pacing: 1m 32s / question</span>
                      </div>
                    </div>
                  </div>

                  {/* Pillar 4: Squad Huddles & Shared Locker (7 cols) */}
                  <div className="md:col-span-7 rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-indigo-600 border border-indigo-400 text-white flex items-center justify-center mb-space-md shadow-[0_0_16px_rgba(99,102,241,0.4)]">
                        <span className="material-symbols-outlined text-[28px]">groups</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-white mb-space-xs font-bold">
                        Collaborative Squad Huddles & Shared Locker
                      </h3>
                      <p className="font-body-md text-body-md text-[#94a3b8] mb-space-lg">
                        Form invite-only cohorts with classmates. Synchronize exam countdowns, co-annotate difficult Free Response Questions, and compete on collective streak velocity.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-space-sm">
                      <div className="p-space-sm rounded-xl bg-[#0a0e18] border border-white/[0.06] text-center">
                        <span className="font-headline-md text-primary font-bold block">18 Days</span>
                        <span className="font-label-stats text-[10px] text-[#94a3b8] uppercase">Squad Streak</span>
                      </div>
                      <div className="p-space-sm rounded-xl bg-[#0a0e18] border border-white/[0.06] text-center">
                        <span className="font-headline-md text-secondary font-bold block">340 FRQs</span>
                        <span className="font-label-stats text-[10px] text-[#94a3b8] uppercase">Locker Solved</span>
                      </div>
                      <div className="p-space-sm rounded-xl bg-[#0a0e18] border border-white/[0.06] text-center">
                        <span className="font-headline-md text-tertiary font-bold block">#1 Rank</span>
                        <span className="font-label-stats text-[10px] text-[#94a3b8] uppercase">Midwest STEM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BEFORE VS WITH STUDYPULSE COMPARISON */}
            <section className="w-full bg-surface-container-lowest border-y border-white/[0.06] py-space-xl">
              <div className="max-w-7xl mx-auto px-margin">
                <div className="text-center max-w-2xl mx-auto mb-space-xl">
                  <span className="font-label-stats text-[11px] text-primary uppercase font-bold tracking-wider mb-2 block">The Cognitive Advantage</span>
                  <h2 className="font-headline-xl text-headline-xl text-white tracking-tight mb-space-sm font-bold">
                    Why Traditional Exam Prep Fails High-Stakes Tests.
                  </h2>
                  <p className="font-body-md text-body-md text-[#94a3b8]">
                    Linear textbook reading produces illusory fluency. StudyPulse replaces passive memory with active predictive calibration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg max-w-5xl mx-auto">
                  {/* Traditional Way */}
                  <div className="rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-xl shadow-xl">
                    <div className="flex items-center gap-space-sm mb-space-lg">
                      <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[22px]">close</span>
                      </div>
                      <div>
                        <h3 className="font-title-sm text-title-sm text-white font-bold">The Traditional Cram Method</h3>
                        <p className="font-body-sm text-body-sm text-[#94a3b8]">High anxiety, zero retention</p>
                      </div>
                    </div>
                    <ul className="space-y-space-md">
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-red-400 text-[20px] shrink-0 mt-0.5">remove_circle_outline</span>
                        <p className="font-body-md text-body-md text-[#94a3b8]"><strong className="text-white">Passive Re-reading:</strong> Highlighting chapters creates an illusion of understanding without retrieval pressure.</p>
                      </li>
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-red-400 text-[20px] shrink-0 mt-0.5">remove_circle_outline</span>
                        <p className="font-body-md text-body-md text-[#94a3b8]"><strong className="text-white">Generic Flashcards:</strong> Re-memorizing formulas without understanding boundary constraints or reaction kinetics.</p>
                      </li>
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-red-400 text-[20px] shrink-0 mt-0.5">remove_circle_outline</span>
                        <p className="font-body-md text-body-md text-[#94a3b8]"><strong className="text-white">Blind Practice Loops:</strong> Solving entire 60-question sets without diagnosing root cognitive traps.</p>
                      </li>
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-red-400 text-[20px] shrink-0 mt-0.5">remove_circle_outline</span>
                        <p className="font-body-md text-body-md text-[#94a3b8]"><strong className="text-white">Late Night Panic:</strong> Disorganized cram sessions 48 hours before official test administration.</p>
                      </li>
                    </ul>
                  </div>

                  {/* StudyPulse Method */}
                  <div className="rounded-2xl bg-surface-container border-2 border-indigo-500/40 p-space-xl shadow-[0_0_30px_rgba(99,102,241,0.15)] relative">
                    <div className="absolute -top-3 right-space-lg px-space-sm py-0.5 rounded-full bg-indigo-600 text-white font-label-stats text-[10px] font-bold uppercase tracking-wider shadow-md">
                      Engineered Protocol
                    </div>
                    <div className="flex items-center gap-space-sm mb-space-lg">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 border border-secondary/40 text-secondary flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[22px]">check</span>
                      </div>
                      <div>
                        <h3 className="font-title-sm text-title-sm text-white font-bold">The StudyPulse Precision System</h3>
                        <p className="font-body-sm text-body-sm text-[#94a3b8]">Calibrated Socratic mastery</p>
                      </div>
                    </div>
                    <ul className="space-y-space-md">
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <p className="font-body-md text-body-md text-[#cbd5e1]"><strong className="text-white font-semibold">Immediate Root Triage:</strong> Distinguish conceptual flaws from speed penalties within 3 minutes of question submission.</p>
                      </li>
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <p className="font-body-md text-body-md text-[#cbd5e1]"><strong className="text-white font-semibold">Targeted 5-Question Socratic Sprints:</strong> Dynamic step-by-step resolution trees until 95%+ conceptual certainty is locked.</p>
                      </li>
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <p className="font-body-md text-body-md text-[#cbd5e1]"><strong className="text-white font-semibold">National Scoring Rubrics:</strong> Instant rubric match against actual College Board and national grading standards.</p>
                      </li>
                      <li className="flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <p className="font-body-md text-body-md text-[#cbd5e1]"><strong className="text-white font-semibold">Paced Milestone Milestones:</strong> Automatic countdown scheduler adjusts study volume dynamically according to exam date.</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* STUDENT TESTIMONIALS & CASE STUDIES */}
            <section className="w-full py-space-xl lg:py-32 relative">
              <div className="max-w-7xl mx-auto px-margin">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
                  <div className="max-w-2xl">
                    <span className="font-label-stats text-[11px] text-primary uppercase font-bold tracking-wider mb-2 block">Candidate Case Studies</span>
                    <h2 className="font-headline-xl text-headline-xl text-white tracking-tight font-bold">
                      How Top Performers Conquered Their Most Feared Units.
                    </h2>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-space-xs text-[#94a3b8] font-body-md">
                    <span>Official 2024 Exam Candidates</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                  {/* Card 1: Amina */}
                  <div className="rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-white/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-md">
                        <img alt="Amina K. student portrait" className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-sm" src="https://lh3.googleusercontent.com/aida/AEtjO1WiLZoSrMfpzgLJADed8EW3wQi0kyqpx88LkR3KT0adqybtAUGBkckwWAC4TFH1LhDz0IovsoQt3o24HrFtyBk8AsU6yv9sTjs721fOqfSXypoSOiGinnmbKEj9ssmh4edlA_-gpF-F2cSqBgAm2WOhztzzF290ldy4sPG2aCOAvj7Nu3zECcyigGcJgG_fpTmehN_I8Mj-iwB2YfWgwspER4MXFSPek7RwOayx3mzOPQWi0u-v-SDQevOE" />
                        <div>
                          <h3 className="font-title-sm text-title-sm text-white font-bold leading-tight">Amina K.</h3>
                          <span className="font-body-sm text-body-sm text-[#94a3b8] block">Grade 11 • Westview STEM Academy</span>
                          <span className="inline-block px-2 py-0.5 mt-1 rounded bg-secondary-container/20 border border-secondary/30 text-secondary font-label-stats text-[10px] font-semibold">AP Chem: 78 → 94 (+16%)</span>
                        </div>
                      </div>
                      <p className="font-body-md text-body-md text-[#cbd5e1] italic mb-space-md">
                        "StudyPulse caught that I was mixing up reaction intermediates with catalysts in AP Chem in literally 3 practice questions. My score jumped from a 78 to a 94 in three weeks."
                      </p>
                    </div>
                    <div className="pt-space-sm border-t border-white/[0.08] flex items-center justify-between text-xs text-[#94a3b8] font-label-stats">
                      <span>Diagnosed: 41 gaps closed</span>
                      <span className="text-secondary font-bold">Exam Result: Score 5</span>
                    </div>
                  </div>

                  {/* Card 2: Marcus T. */}
                  <div className="rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-white/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-md">
                        <img alt="Marcus T. portrait" className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-sm" data-alt="Headshot of a focused male high school student with glasses wearing a dark collegiate hoodie in a campus library setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDreko1HYVNlonE8MO-gSUeX7_8RVmr8tTiEa77FTVFJnPKqcT5C-kOaRR3XpoRbQMByVRZQfQ99EHzJ1qQzSbQxbtRFT-aSsWvouEuQVxMCzVZId23qh6tlHXxQua2vwwLwdjeWrIO7JVpDgz_35VLsLWNeoIdl7v5TLX50T3vnD02r2MvYN0Q0PurBVHlGXppXUu6X0KKWWLkHKaA-ZqEHoHyZXJ2YkIQpp7GAL-NZqPeoZ-EfA4tkw" />
                        <div>
                          <h3 className="font-title-sm text-title-sm text-white font-bold leading-tight">Marcus T.</h3>
                          <span className="font-body-sm text-body-sm text-[#94a3b8] block">Grade 12 • Stuyvesant Preparatory</span>
                          <span className="inline-block px-2 py-0.5 mt-1 rounded bg-secondary-container/20 border border-secondary/30 text-secondary font-label-stats text-[10px] font-semibold">Calculus BC: 68 → 98%</span>
                        </div>
                      </div>
                      <p className="font-body-md text-body-md text-[#cbd5e1] italic mb-space-md">
                        "Polar curves and Taylor series remainders were completely wrecking my mock exam confidence. The Socratic resolution trees broke down the Lagrange error bound step-by-step."
                      </p>
                    </div>
                    <div className="pt-space-sm border-t border-white/[0.08] flex items-center justify-between text-xs text-[#94a3b8] font-label-stats">
                      <span>Diagnosed: 18 hours saved</span>
                      <span className="text-secondary font-bold">Exam Result: Score 5</span>
                    </div>
                  </div>

                  {/* Card 3: Priya S. */}
                  <div className="rounded-2xl bg-surface-container-low border border-white/[0.08] p-space-lg shadow-xl hover:border-white/20 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-md">
                        <img alt="Priya S. portrait" className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/40 shadow-sm" data-alt="Headshot of a young woman student wearing a blue cardigan smiling warmly in an academic laboratory hallway" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqNMRJsFzzlTqbu2hSI00WeKWMYG439aUCAueHZoiHP-_kJPLFOywNWr0o9_Kok89U6qJLEUdbMteb9LPUmDdK3eSEes3Qdt8xKc4DB2EVcgvLgRiQ8rokfKdWSMZxe6eQ3nSflRtvdX3ePHmPALI__vkqdblLnK1E2tZKs45Y7ZBMWHN4Ez5fefjhMzbfcvrkX2fvKLaw39gI7UDz4VL9LxHuG-QLQSSCYL_3w9HXohFmJbBBEpruHg" />
                        <div>
                          <h3 className="font-title-sm text-title-sm text-white font-bold leading-tight">Priya S.</h3>
                          <span className="font-body-sm text-body-sm text-[#94a3b8] block">Grade 12 • Science Olympiad Captain</span>
                          <span className="inline-block px-2 py-0.5 mt-1 rounded bg-secondary-container/20 border border-secondary/30 text-secondary font-label-stats text-[10px] font-semibold">Biology: 99th Percentile</span>
                        </div>
                      </div>
                      <p className="font-body-md text-body-md text-[#cbd5e1] italic mb-space-md">
                        "The timed simulator pacing feedback is unmatched. It pinpointed that I was spending 4 extra minutes on cellular respiration diagram questions and leaving FRQs rushed."
                      </p>
                    </div>
                    <div className="pt-space-sm border-t border-white/[0.08] flex items-center justify-between text-xs text-[#94a3b8] font-label-stats">
                      <span>Diagnosed: +22 mins time saved</span>
                      <span className="text-tertiary font-bold">National Finalist</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BOTTOM CONVERSION CTA BANNER */}
            <section className="w-full pb-space-xl">
              <div className="max-w-7xl mx-auto px-margin">
                <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-[#171b26] via-[#1c1f2a] to-indigo-950 border border-indigo-500/30 text-white p-space-xl md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  {/* Background Ambient Circles */}
                  <div className="absolute -bottom-12 -right-12 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-0 left-1/3 w-64 h-64 bg-tertiary/15 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 max-w-3xl">
                    <span className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-tertiary font-label-stats text-[11px] uppercase tracking-wider mb-space-md">
                      <span className="material-symbols-outlined text-[16px]">hourglass_top</span> Spring 2025 Syllabi Active
                    </span>
                    <h2 className="font-headline-xl text-headline-xl text-white tracking-tight leading-tight mb-space-md font-bold">
                      Ready to ace your upcoming term finals and national entrance exam?
                    </h2>
                    <p className="font-body-lg text-body-lg text-[#94a3b8] max-w-2xl mb-space-xl">
                      Start with your complimentary 5-minute diagnostic sprint today. Uncover hidden cognitive gaps before test day makes them permanent.
                    </p>
                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-space-md mb-space-lg">
                      <a className="w-full sm:w-auto inline-flex items-center justify-center px-space-xl py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-body-md font-bold shadow-[0_0_24px_rgba(99,102,241,0.5)] active:scale-[0.98] transition-all border border-indigo-400/40" data-path="signup" href="#">
                        Create Free Student Account
                      </a>
                      <button className="w-full sm:w-auto inline-flex items-center justify-center px-space-lg py-3.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.15] font-body-md font-semibold transition-all" type="button">
                        Schedule School Pilot Demo
                      </button>
                    </div>
                    {/* Trust Tags */}
                    <div className="flex flex-wrap items-center gap-space-md text-[#94a3b8] font-body-sm">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span> FERPA & GDPR-K Certified
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">domain</span> Institutional SSO Ready (Google / Clever)
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-secondary">sync</span> 100% Canvas & Google Classroom Sync
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="w-full bg-[#0a0e18] border-t border-white/[0.08] mt-space-xl">
          <div className="max-w-7xl mx-auto px-margin py-space-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-space-xl">
              <div>
                <div className="flex items-center gap-space-sm mb-space-sm">
                  <span className="font-headline-md text-headline-md text-white font-bold tracking-tight">StudyPulse</span>
                </div>
                <p className="font-body-sm text-body-sm text-[#94a3b8] max-w-xs mb-space-md">
                  AI-assisted precision diagnostics, calibrated mock examinations, and mastery-based progression for high-stakes entrance exams.
                </p>
                <span className="inline-flex items-center gap-space-xs font-label-stats text-[11px] text-secondary">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>FERPA Compliant & COPPA Certified
                </span>
              </div>
              <div>
                <h4 className="font-title-sm text-sm text-white font-bold mb-space-md">Diagnostic Platform</h4>
                <ul className="space-y-space-sm">
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">Adaptive Knowledge Graphs</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">Timed Mock Environments</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">Standardized Scoring Predictor</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">Cohort Analytics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-title-sm text-sm text-white font-bold mb-space-md">Curriculum Syllabi</h4>
                <ul className="space-y-space-sm">
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">AP Calculus AB & BC</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">AP Physics 1, 2 & C</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">AP Biology & Chemistry</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">National Entrance Diagnostics</li>
                </ul>
              </div>
              <div>
                <h4 className="font-title-sm text-sm text-white font-bold mb-space-md">Institutional Trust</h4>
                <ul className="space-y-space-sm">
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">Student Data Privacy Pledge</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">FERPA Compliance Statement</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">School District Agreements</li>
                  <li className="font-body-sm text-body-sm text-[#94a3b8] hover:text-white cursor-pointer transition-colors">Algorithmic Fairness Report</li>
                </ul>
              </div>
            </div>
            <div className="pt-space-lg border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <p className="font-body-sm text-body-sm text-[#94a3b8]">© 2025 StudyPulse Technologies Inc. Academic rigor, kinetic clarity. All rights reserved.</p>
              <div className="flex items-center gap-space-md font-body-sm text-body-sm text-[#94a3b8]">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                <span className="hover:text-white cursor-pointer transition-colors">Institutional Portal</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
