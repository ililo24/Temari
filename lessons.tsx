import { useState } from "react";

const tailwindConfig = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed-variant": "#3c4662",
        "on-tertiary-fixed-variant": "#005137",
        "on-primary-fixed-variant": "#361ad4",
        "surface-container-high": "#dce9ff",
        "on-tertiary-fixed": "#002114",
        "outline-variant": "#c7c4d8",
        "on-primary-fixed": "#120068",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#4f3feb",
        "on-secondary-fixed": "#101b35",
        "inverse-surface": "#213145",
        background: "#f8f9ff",
        "surface-container-highest": "#d3e4fe",
        surface: "#f8f9ff",
        "on-background": "#0b1c30",
        "surface-variant": "#d3e4fe",
        "surface-bright": "#f8f9ff",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#bbc6e8",
        "surface-container": "#e5eeff",
        "tertiary-fixed": "#85f8c4",
        "on-primary-container": "#ebe7ff",
        "on-tertiary-container": "#99ffce",
        "surface-container-low": "#eff4ff",
        "secondary-container": "#d2dcff",
        "primary-container": "#5b4df6",
        "on-error-container": "#93000a",
        "tertiary-fixed-dim": "#68dba9",
        "inverse-on-surface": "#eaf1ff",
        "on-secondary": "#ffffff",
        "on-surface": "#0b1c30",
        outline: "#777587",
        "primary-fixed": "#e3dfff",
        secondary: "#535e7b",
        "on-surface-variant": "#464556",
        error: "#ba1a1a",
        tertiary: "#005e40",
        "secondary-fixed": "#dae2ff",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#c4c0ff",
        "surface-dim": "#cbdbf5",
        "on-tertiary": "#ffffff",
        "error-container": "#ffdad6",
        primary: "#412dde",
        "inverse-primary": "#c4c0ff",
        "tertiary-container": "#007954",
        "on-secondary-container": "#56607e"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-mobile": "1rem",
        "gutter-mobile": "1rem",
        gutter: "1.5rem",
        "space-xs": "0.25rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "space-sm": "0.5rem",
        margin: "2rem"
      },
      fontFamily: {
        "body-lg": ["Plus Jakarta Sans"],
        "headline-sm": ["Space Grotesk"],
        "body-sm": ["Plus Jakarta Sans"],
        "headline-xl-mobile": ["Space Grotesk"],
        "headline-lg-mobile": ["Space Grotesk"],
        "headline-lg": ["Space Grotesk"],
        "label-sm": ["Plus Jakarta Sans"],
        "headline-xl": ["Space Grotesk"],
        "headline-md": ["Space Grotesk"],
        "body-md": ["Plus Jakarta Sans"],
        "label-lg": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-sm": ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "body-sm": ["13px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-xl-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "700" }],
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "headline-md": ["22px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md": ["15px", { lineHeight: "24px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }]
      }
    }
  }
};

const tailwindConfigScript = `tailwind.config=${JSON.stringify(tailwindConfig)}`;

const baseStyles = `@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}`;

const STREAM_CARD_ACTIVE =
  "relative group cursor-pointer rounded-xl p-space-md bg-primary/5 shadow-sm transition-all duration-200";
const STREAM_CARD_INACTIVE =
  "relative group cursor-pointer rounded-xl p-space-md bg-surface-container-low hover:bg-surface-container transition-all duration-200";

const VIDEO_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6V6WxJWUGbTXR2Pv4esRPxpQS_1_eiE5r8ObUlxowxjtKZFyzDo0sOtUb5nKLlkHlSF2A8cmPit1bGo-GjayjYUVVNA16YDo_imW3KEW64NQSxMmTObA7_Ko-nW6p4u1LUML3osiJhDu8J0gCyEA3D4w12vnXfoVMkVCiY4Ynyd55_yf1biIJeZgUBO2O0MH9QPX5NAq5XARTKqEUyUafopdox53D3EllHHr0mWoxX3zeSAuBN6Z9w";

const BOOK_BG =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjFxWy8uhNFrzA_SNLVhgegF-xKmD7nlI5zYcEqM5mIBrRi8ygbKgZi7QBnMCdX6YadLo6Lrdm54CzRQcENm_WZpVaoHg3vD8mkU2ZdHx2SNesYFzfDSPtm-2fSv0Nrg_ZuJRlhWmo21QPckxWDeS-S51aIyIqEqvPRFfSDQZ20sho6GdNNSM0kk3xKT7Tenq-SUntPofDNso47Ilk6rzKqHKGltwFeIErXm9ux4j0t995tq05YbM6Ow";

export default function Lessons() {
  const [currentStream, setCurrentStream] = useState<"Natural Sciences" | "Social Sciences">("Natural Sciences");
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({
    unit1: false,
    unit2: false,
    unit4: false
  });

  const toggleUnit = (id: string) => {
    setOpenUnits((o) => ({ ...o, [id]: !o[id] }));
  };

  const playVideo = () => {
    alert("Launching video player for Lesson 3.4: Enthalpy, Hess's Law & Calorimetry Experiments...");
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style>{baseStyles}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <script id="tailwind-config" dangerouslySetInnerHTML={{ __html: tailwindConfigScript }} />

      <div className="bg-background font-body-md text-body-md text-on-surface antialiased">
        <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="h-16 px-space-md flex items-center gap-space-sm">
              <img
                alt="StudyPulse Brand Icon"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xf8n8ZQwr2bd4kDcOygHF0k3rRk6PuWRwZImRDeQP-un_XjwUFGpE0pri_Vk6w6tAUtmNS58vtA1JGYy6ImxRkopsG2R9fhZ0hQDv3dxegllMoAMw-RZP4XB-0oTwmQwIfPaMQr-DFhXCi50ywq8SPDMU6qeUXY0Rsz5dpfVpgqchTwpzbCU7PQ7ZF7NqGA-D9BPUdPmbcYtG71t66pw3-d9yn1fQk1T35zqJhIiFqqyUO_ja-q_aeC7ry"
              />
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">StudyPulse</span>
            </div>

            <nav
              className="px-space-sm py-space-md space-y-space-xs flex flex-col"
              data-active-classes="bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm"
            >
              <a
                className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                data-path="dashboard"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Dashboard</span>
              </a>

              <a
                aria-current="page"
                className="flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm"
                data-path="lessons"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span>Lessons</span>
              </a>

              <a
                className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                data-path="exams-and-past-papers"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                <span>Exams & Past Papers</span>
              </a>

              <a
                className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                data-path="performance-analytics"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">query_stats</span>
                <span>Performance Analytics</span>
              </a>
            </nav>
          </div>

          <div className="p-space-md">
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface">Academic Term</span>
                <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                  Active
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Term 2 Finals Prep</p>
            </div>
          </div>
        </aside>

        <div className="pl-64">
          <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-lg gap-space-xs text-on-surface-variant w-72">
                <span className="material-symbols-outlined text-[18px]">search</span>
                <input
                  className="bg-transparent text-body-sm font-body-sm text-on-surface outline-none placeholder:text-outline w-full"
                  placeholder="Search topics, questions, past papers..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-on-primary-fixed font-label-md text-label-md">
                <span className="text-base leading-none">🔥</span>
                <span>14-day streak</span>
              </div>

              <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">
                <span className="text-base leading-none">⚡</span>
                <span>Midterm in 12 days</span>
              </div>

              <button className="relative p-space-xs rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </button>

              <div className="h-6 w-px bg-outline-variant" />

              <div className="flex items-center gap-space-sm">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1L8WFo-mBDL9i-zWMDD7A3FwtonEsEz2nPorHrxciq8JruCbrL61YLWAGGdHkIXcgXdNR6LQBQduxbsNKBzncu8LZVj6DbL-ztN_WG_AWmdEGvByBQmy70DvdC-fAXfDxIBLoKxsBRH17DbTIOjDnzysFjbGpK1L2AwpyXM8Mgsf93OZwAVfft6PVxgYhrFx9dsEb7MXzBtUr2o2kablt0h_4MtLSiXwv8OVO45GC9XicOXgod4ZRKA"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface leading-tight">Amina K.</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">(Grade 11)</span>
                </div>
              </div>
            </div>
          </header>

          <main className="w-full pt-16 bg-background">
            <div className="flex flex-col w-full">
              {/* Subtle Ambient Glow Overlay (parent contained) */}
              <div className="relative w-full overflow-hidden px-space-lg py-space-lg space-y-space-xl">
                <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />
                <div className="absolute top-96 left-0 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none" />

                {/* Page Title & Navigation Stepper Header */}
                <header className="relative flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div>
                    <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-wide mb-1">
                      <span className="material-symbols-outlined text-[16px]">layers</span>
                      <span>CURRICULUM ARCHITECTURE</span>
                      <span className="text-outline-variant">/</span>
                      <span className="text-on-surface-variant font-label-sm text-label-sm">ACADEMIC YEAR 2024-2025</span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                      Curriculum & Video Lessons
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                      Explore structured courses, chapter guides, video breakdown lectures, and textbook companion
                      material aligned with your curriculum syllabus.
                    </p>
                  </div>
                  {/* Quick Metrics Pill Banner */}
                  <div className="flex items-center gap-space-sm self-start md:self-auto bg-surface-container-lowest shadow-sm rounded-xl p-space-sm px-space-md">
                    <div className="flex items-center gap-space-xs text-tertiary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                      <span className="font-label-lg text-label-lg">Syllabus Match 100%</span>
                    </div>
                    <div className="h-4 w-px bg-surface-container-highest" />
                    <div className="flex items-center gap-space-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span className="font-label-md text-label-md">24.5 hrs logged</span>
                    </div>
                  </div>
                </header>

                {/* 3-STEP PROGRESSIVE DRILLDOWN SELECTOR */}
                <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-lg">
                  {/* Stepper Status Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pb-space-sm">
                    {/* Step 1 Indicator */}
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm text-sm">
                        1
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">Step 1</span>
                        <span className="font-label-lg text-label-lg text-on-surface">Academic Stream</span>
                      </div>
                    </div>
                    {/* Step 2 Indicator */}
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-headline-sm text-headline-sm text-sm">
                        2
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">Step 2</span>
                        <span className="font-label-lg text-label-lg text-on-surface">Grade Level</span>
                      </div>
                    </div>
                    {/* Step 3 Indicator */}
                    <div className="flex items-center gap-space-sm">
                      <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm text-sm shadow-md">
                        3
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
                          Step 3 • Active
                        </span>
                        <span className="font-label-lg text-label-lg text-on-surface">Textbook & Subject</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 1: Stream Selection Cards */}
                  <div className="space-y-space-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      <span>SELECT STREAM</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {/* Natural Sciences */}
                      <div
                        className={currentStream === "Natural Sciences" ? STREAM_CARD_ACTIVE : STREAM_CARD_INACTIVE}
                        id="stream-natural"
                        onClick={() => setCurrentStream("Natural Sciences")}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-space-sm">
                            <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-md">
                              <span className="material-symbols-outlined text-[24px]">science</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-space-xs">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface">Natural Sciences</h3>
                                {currentStream === "Natural Sciences" && (
                                  <span className="inline-flex items-center px-space-xs py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                STEM, Chemistry, Physics, Advanced Biology, Calculus & Earth Sciences
                              </p>
                            </div>
                          </div>
                          {currentStream === "Natural Sciences" ? (
                            <span
                              className="material-symbols-outlined text-primary text-[24px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-surface-container-highest" />
                          )}
                        </div>
                      </div>
                      {/* Social Sciences */}
                      <div
                        className={currentStream === "Social Sciences" ? STREAM_CARD_ACTIVE : STREAM_CARD_INACTIVE}
                        id="stream-social"
                        onClick={() => setCurrentStream("Social Sciences")}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-space-sm">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center">
                              <span className="material-symbols-outlined text-[24px]">menu_book</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-space-xs">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                                  Social Sciences & Humanities
                                </h3>
                                {currentStream === "Social Sciences" && (
                                  <span className="inline-flex items-center px-space-xs py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                World History, Macroeconomics, Political Theory, Sociology & World Literature
                              </p>
                            </div>
                          </div>
                          {currentStream === "Social Sciences" ? (
                            <span
                              className="material-symbols-outlined text-primary text-[24px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-surface-container-highest" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Grade/Class Selection Bar */}
                  <div className="space-y-space-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px]">grade</span>
                      <span>SELECT GRADE LEVEL</span>
                    </label>
                    <div className="flex flex-wrap items-center gap-space-sm">
                      <button className="px-space-md py-2 rounded-full font-label-lg text-label-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                        Grade 9
                      </button>
                      <button className="px-space-md py-2 rounded-full font-label-lg text-label-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                        Grade 10
                      </button>
                      {/* Active Pill */}
                      <button className="px-space-md py-2 rounded-full font-label-lg text-label-lg bg-primary-container text-on-primary shadow-sm flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        <span>Grade 11</span>
                      </button>
                      <button className="px-space-md py-2 rounded-full font-label-lg text-label-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
                        Grade 12 / AP & IB Prep
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Textbook & Subject Picker Tabs */}
                  <div className="space-y-space-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                      <span>SELECT ACTIVE TEXTBOOK OR CURRICULUM</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                      {/* Active: Zumdahl Chemistry */}
                      <div className="cursor-pointer rounded-xl p-space-md bg-primary-fixed text-on-primary-fixed shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                          <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded-full bg-primary text-on-primary font-bold">
                            In Progress
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-primary">local_fire_department</span>
                        </div>
                        <div className="mt-space-md">
                          <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">
                            CHEMISTRY
                          </span>
                          <h4 className="font-headline-sm text-headline-sm text-on-primary-fixed leading-snug">
                            Zumdahl Chemistry (10th Ed)
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant mt-1">
                            75% Complete • Unit 3 Active
                          </p>
                        </div>
                      </div>
                      {/* Campbell Biology */}
                      <div className="cursor-pointer rounded-xl p-space-md bg-surface-container-low hover:bg-surface-container text-on-surface flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                          <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                            Completed
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-tertiary">check_circle</span>
                        </div>
                        <div className="mt-space-md">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wide">
                            BIOLOGY
                          </span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                            Campbell Biology (11th Ed)
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                            100% Complete • 32 Chapters
                          </p>
                        </div>
                      </div>
                      {/* Halliday Physics */}
                      <div className="cursor-pointer rounded-xl p-space-md bg-surface-container-low hover:bg-surface-container text-on-surface flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                          <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold">
                            Planned
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-secondary">pending</span>
                        </div>
                        <div className="mt-space-md">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wide">
                            PHYSICS
                          </span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                            Halliday & Resnick Physics
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">35% Complete • Mechanics</p>
                        </div>
                      </div>
                      {/* Stewart Calculus */}
                      <div className="cursor-pointer rounded-xl p-space-md bg-surface-container-low hover:bg-surface-container text-on-surface flex flex-col justify-between transition-transform hover:-translate-y-0.5">
                        <div className="flex items-start justify-between">
                          <span className="font-label-sm text-label-sm uppercase px-space-xs py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-bold">
                            Paused
                          </span>
                          <span className="material-symbols-outlined text-[20px] text-outline">pause_circle</span>
                        </div>
                        <div className="mt-space-md">
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wide">
                            MATHEMATICS
                          </span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                            Stewart Single Variable Calc
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                            50% Complete • Derivatives
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* TEXTBOOK OVERVIEW & RESUME BANNER */}
                <section className="relative bg-gradient-to-r from-primary via-primary-container to-surface-tint rounded-xl p-space-lg text-on-primary shadow-xl overflow-hidden">
                  {/* Decorative Backdrop Geometry */}
                  <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-surface-container-lowest/10 blur-2xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
                      {/* Stylized Book 3D Badge */}
                      <div className="relative w-20 h-28 bg-surface-container-lowest rounded-lg shadow-lg flex flex-col justify-between p-2 flex-shrink-0 overflow-hidden text-on-surface">
                        <div className="h-1.5 w-full bg-primary rounded" />
                        <div className="text-center py-2">
                          <span className="font-label-sm text-label-sm text-primary uppercase font-bold block">
                            Chemistry
                          </span>
                          <span className="font-headline-sm text-headline-sm text-xs leading-none">10th Ed</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-on-surface-variant">
                          <span>Zumdahl</span>
                          <span className="material-symbols-outlined text-[12px] text-primary">auto_stories</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-space-xs">
                          <span className="px-space-xs py-0.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md font-label-sm text-label-sm text-on-primary">
                            Grade 11 • Natural Sciences
                          </span>
                          <span className="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                            Midterm Exam Ready
                          </span>
                        </div>
                        <h2 className="font-headline-md text-headline-md text-on-primary tracking-tight">
                          Zumdahl Chemistry (10th Edition)
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-primary-container max-w-xl">
                          18 of 24 Chapters complete (75%) • 42 Video Lectures • 180 Companion Practice Questions
                        </p>
                      </div>
                    </div>
                    {/* Continue CTA Block */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-space-sm bg-surface-container-lowest/15 backdrop-blur-md p-space-md rounded-xl">
                      <div className="text-left lg:text-right">
                        <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider block">
                          Continue where you left off:
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-primary block mt-0.5">
                          Chapter 12: Chemical Kinetics
                        </span>
                        <span className="font-body-sm text-body-sm text-on-primary-container">
                          Video 3 • Reaction Mechanism & Catalysis
                        </span>
                      </div>
                      <a
                        className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-bright font-label-lg text-label-lg shadow-md transition-transform hover:scale-105 active:scale-95"
                        href="#active-lesson-player"
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_circle
                        </span>
                        <span>Resume Lesson (18m)</span>
                      </a>
                    </div>
                  </div>
                  {/* Linear Progress Bar */}
                  <div className="relative z-10 mt-space-md pt-space-sm">
                    <div className="flex justify-between items-center font-label-sm text-label-sm text-on-primary-container mb-1.5">
                      <span>Overall Course Mastery</span>
                      <span className="font-bold text-on-primary">75% Finished</span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-container-lowest/20 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-tertiary-fixed rounded-full shadow-sm" style={{ width: "75%" }} />
                    </div>
                  </div>
                </section>

                {/* CONTENT WORKSPACE: CHAPTER ACCORDION & RESOURCE SPLIT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
                  {/* MAIN LESSON EXPLORER (8 COLUMNS) */}
                  <div className="lg:col-span-8 space-y-space-md">
                    {/* Filter Controls Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest p-space-sm px-space-md rounded-xl shadow-sm">
                      <div className="flex items-center gap-space-xs overflow-x-auto py-1">
                        <button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-primary text-on-primary shadow-sm whitespace-nowrap">
                          All Units (4)
                        </button>
                        <button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors whitespace-nowrap">
                          Video Lectures
                        </button>
                        <button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors whitespace-nowrap">
                          Chapter Notes
                        </button>
                        <button className="px-space-md py-1.5 rounded-lg font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors whitespace-nowrap">
                          Practice Problems
                        </button>
                      </div>
                      <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px]">sort</span>
                        <span>Chronological</span>
                      </div>
                    </div>

                    {/* UNIT 1: COMPLETED ACCORDION */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                      <div className="h-1 w-full bg-tertiary" />
                      <div
                        className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low/40 transition-colors"
                        onClick={() => toggleUnit("unit1")}
                      >
                        <div className="flex items-center gap-space-md">
                          <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                            <span
                              className="material-symbols-outlined text-[22px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-space-xs">
                              <span className="font-label-sm text-label-sm font-bold text-tertiary">UNIT 1</span>
                              <span className="text-outline-variant">•</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                5/5 Lessons Finished
                              </span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface">
                              Atomic Structure & Periodic Trends
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-md">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Quiz Score</span>
                            <span className="font-headline-sm text-headline-sm text-tertiary">96%</span>
                          </div>
                          <span className="material-symbols-outlined text-on-surface-variant text-[22px]">expand_more</span>
                        </div>
                      </div>
                      {/* Collapsed Details (Unit 1) */}
                      <div
                        className={`px-space-md pb-space-md pt-space-xs space-y-space-xs bg-surface-container-low/30 ${
                          openUnits.unit1 ? "" : "hidden"
                        }`}
                      >
                        <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg">
                          <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                            <span className="font-body-sm text-body-sm text-on-surface">
                              1.1 Quantum Mechanical Model of Atoms
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">14m • Notes PDF</span>
                        </div>
                        <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg">
                          <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                            <span className="font-body-sm text-body-sm text-on-surface">
                              1.2 Orbital Diagrams & Electron Configurations
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">21m • Practice Set</span>
                        </div>
                      </div>
                    </div>

                    {/* UNIT 2: COMPLETED ACCORDION */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                      <div className="h-1 w-full bg-tertiary" />
                      <div
                        className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low/40 transition-colors"
                        onClick={() => toggleUnit("unit2")}
                      >
                        <div className="flex items-center gap-space-md">
                          <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                            <span
                              className="material-symbols-outlined text-[22px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-space-xs">
                              <span className="font-label-sm text-label-sm font-bold text-tertiary">UNIT 2</span>
                              <span className="text-outline-variant">•</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                6/6 Lessons Finished
                              </span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface">
                              Stoichiometry & Gas Laws
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-md">
                          <div className="hidden sm:flex flex-col items-end">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Quiz Score</span>
                            <span className="font-headline-sm text-headline-sm text-tertiary">92%</span>
                          </div>
                          <span className="material-symbols-outlined text-on-surface-variant text-[22px]">expand_more</span>
                        </div>
                      </div>
                      {/* Collapsed Details (Unit 2) */}
                      <div
                        className={`px-space-md pb-space-md pt-space-xs space-y-space-xs bg-surface-container-low/30 ${
                          openUnits.unit2 ? "" : "hidden"
                        }`}
                      >
                        <div className="flex items-center justify-between p-space-sm bg-surface-container-lowest rounded-lg">
                          <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                            <span className="font-body-sm text-body-sm text-on-surface">
                              2.1 Ideal Gas Equation & Dalton's Partial Pressures
                            </span>
                          </div>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">19m • Complete</span>
                        </div>
                      </div>
                    </div>

                    {/* UNIT 3: IN PROGRESS (EXPANDED ACTIVE UNIT) */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-md overflow-hidden" id="active-lesson-player">
                      <div className="h-1.5 w-full bg-primary-container" />
                      {/* Unit Header */}
                      <div className="p-space-md flex items-center justify-between bg-primary/5">
                        <div className="flex items-center gap-space-md">
                          <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-[22px]">timelapse</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-space-xs">
                              <span className="font-label-sm text-label-sm font-bold text-primary">
                                UNIT 3 (IN PROGRESS • 60%)
                              </span>
                              <span className="text-outline-variant">•</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">3 of 5 Completed</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface">
                              Thermodynamics & Reaction Rates
                            </h3>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm px-space-sm py-1 rounded-full bg-primary text-on-primary font-bold">
                          Current Focus
                        </span>
                      </div>
                      {/* Active Interactive Lesson Showcase Box */}
                      <div className="p-space-md space-y-space-md">
                        {/* Hero Video Card */}
                        <div className="relative rounded-xl overflow-hidden bg-inverse-surface shadow-md">
                          {/* Video Preview Backdrop with Realistic Prompt */}
                          <div
                            className="bg-cover bg-center w-full h-64 flex items-center justify-center relative"
                            data-alt="Close up scientific laboratory demonstration of chemical reaction kinetics with glowing blue and amber reagent solutions in volumetric flasks, deep ambient studio lighting, soft cinematic volumetric light beams, ultra crisp focus, modern educational aesthetic matching indigo and deep navy hues"
                            style={{ backgroundImage: `url('${VIDEO_BG}')` }}
                          >
                            {/* Darkened Glassmorphic Scrim */}
                            <div className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-xs" />
                            {/* Play Trigger Button */}
                            <button
                              className="relative z-10 w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-200"
                              onClick={playVideo}
                            >
                              <span
                                className="material-symbols-outlined text-[36px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                play_arrow
                              </span>
                            </button>
                            {/* Video Metadata Floating Badges */}
                            <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between text-on-primary">
                              <div className="flex items-center gap-space-xs bg-inverse-surface/80 px-space-sm py-1 rounded-md backdrop-blur-md">
                                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">hd</span>
                                <span className="font-label-sm text-label-sm">1080p • 18:42 mins</span>
                              </div>
                              <div className="flex items-center gap-space-xs bg-inverse-surface/80 px-space-sm py-1 rounded-md backdrop-blur-md font-label-sm text-label-sm">
                                <span className="material-symbols-outlined text-[16px] text-primary-fixed">menu_book</span>
                                <span>Textbook: pp. 240–258</span>
                              </div>
                            </div>
                          </div>
                          {/* Lesson Narrative & Quick Tools */}
                          <div className="p-space-md bg-surface-container-lowest">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                              <div>
                                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wide">
                                  Lesson 3.4 • Video Lecture
                                </span>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5">
                                  Enthalpy, Hess's Law & Calorimetry Experiments
                                </h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                  Learn how to calculate standard reaction enthalpies using Hess's summation law,
                                  coffee-cup calorimetry data, and state functions.
                                </p>
                              </div>
                              <div className="flex items-center gap-space-xs self-start sm:self-center flex-shrink-0">
                                <a
                                  className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container flex items-center gap-1 transition-colors"
                                  href="#notes"
                                >
                                  <span className="material-symbols-outlined text-[18px]">download</span>
                                  <span>Notes (PDF)</span>
                                </a>
                                <button className="p-2 rounded-lg bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container">
                                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Unit 3 Lesson Item List */}
                        <div className="space-y-space-xs">
                          {/* Item 1 (Done) */}
                          <div className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                            <div className="flex items-center gap-space-sm">
                              <span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
                              <div>
                                <span className="font-label-md text-label-md text-on-surface block">
                                  3.1 First Law of Thermodynamics: Internal Energy & Work
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                  Completed on Monday • 16 mins
                                </span>
                              </div>
                            </div>
                            <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                              100%
                            </span>
                          </div>
                          {/* Item 2 (Done) */}
                          <div className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer">
                            <div className="flex items-center gap-space-sm">
                              <span className="material-symbols-outlined text-tertiary text-[20px]">check_circle</span>
                              <div>
                                <span className="font-label-md text-label-md text-on-surface block">
                                  3.2 Specific Heat Capacity and Constant-Volume Bomb Calorimetry
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                  Completed yesterday • 22 mins
                                </span>
                              </div>
                            </div>
                            <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                              100%
                            </span>
                          </div>
                          {/* Item 3 (Active) */}
                          <div className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-primary-fixed text-on-primary-fixed shadow-xs">
                            <div className="flex items-center gap-space-sm">
                              <div className="w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center">
                                <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                              </div>
                              <div>
                                <span className="font-label-md text-label-md text-on-primary-fixed font-bold block">
                                  3.3 Enthalpy of Formation & Hess's Law Application
                                </span>
                                <span className="font-body-sm text-body-sm text-on-secondary-fixed-variant">
                                  Playing Now • 18 mins • Practice 12.1-12.8
                                </span>
                              </div>
                            </div>
                            <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-primary text-on-primary font-bold">
                              Current
                            </span>
                          </div>
                          {/* Item 4 (Locked) */}
                          <div className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container-lowest opacity-75 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-space-sm">
                              <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                              <div>
                                <span className="font-label-md text-label-md text-on-surface block">
                                  3.4 Reaction Rates, Rate Laws & Half-Life Calculations
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                  Unlocks after Lesson 3.3 quiz • 25 mins
                                </span>
                              </div>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Up next</span>
                          </div>
                          {/* Item 5 (Locked) */}
                          <div className="flex items-center justify-between p-space-sm px-space-md rounded-lg bg-surface-container-lowest opacity-75 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-space-sm">
                              <span className="material-symbols-outlined text-outline text-[20px]">lock</span>
                              <div>
                                <span className="font-label-md text-label-md text-on-surface block">
                                  3.5 Activation Energy & The Arrhenius Equation Model
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                  Unlocks after Lesson 3.4 • 30 mins
                                </span>
                              </div>
                            </div>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Locked</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* UNIT 4: UP NEXT PREVIEW ACCORDION */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                      <div className="h-1 w-full bg-surface-container-highest" />
                      <div
                        className="p-space-md flex items-center justify-between cursor-pointer hover:bg-surface-container-low/40 transition-colors"
                        onClick={() => toggleUnit("unit4")}
                      >
                        <div className="flex items-center gap-space-md">
                          <div className="w-10 h-10 rounded-full bg-surface-container-low text-on-surface-variant flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-space-xs">
                              <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                                UNIT 4 (UP NEXT • 0%)
                              </span>
                              <span className="text-outline-variant">•</span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                8 Lessons • Starts Next Week
                              </span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-on-surface">
                              Organic Chemistry Foundations & Functional Groups
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-space-sm">
                          <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">
                            Includes Formula Sheet
                          </span>
                          <span className="material-symbols-outlined text-on-surface-variant text-[22px]">expand_more</span>
                        </div>
                      </div>
                      {/* Collapsed details (Unit 4) */}
                      <div
                        className={`px-space-md pb-space-md pt-space-xs space-y-space-xs bg-surface-container-low/30 ${
                          openUnits.unit4 ? "" : "hidden"
                        }`}
                      >
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Covers Alkanes, Alkenes, Alkynes, Functional Group Identification, IUPAC Nomenclature, and
                          Reaction Mechanisms.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDEBAR: TEXTBOOK COMPANION & STUDY TOOLS (4 COLUMNS) */}
                  <div className="lg:col-span-4 space-y-space-md">
                    {/* Active Textbook Reference Card with Cover Preview */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Textbook Companion</h4>
                        <span className="material-symbols-outlined text-primary text-[20px]">auto_stories</span>
                      </div>
                      <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
                        {/* Cover Mockup */}
                        <div
                          className="w-14 h-20 bg-cover bg-center rounded flex-shrink-0 shadow-sm"
                          data-alt="Cover of Zumdahl Chemistry Tenth Edition textbook featuring modern geometric chemical crystal lattice illustration in indigo and emerald tones, academic publishing style, clean layout"
                          style={{ backgroundImage: `url('${BOOK_BG}')` }}
                        />
                        <div className="min-w-0">
                          <span className="font-label-sm text-label-sm text-primary font-bold block truncate">
                            ZUMDAHL & ZUMDAHL
                          </span>
                          <h5 className="font-label-lg text-label-lg text-on-surface truncate">
                            Chemistry (10th AP Edition)
                          </h5>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">ISBN 978-1-305-95740-4</p>
                        </div>
                      </div>
                      {/* Chapter Sync Info */}
                      <div className="space-y-space-xs font-body-sm text-body-sm">
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Synchronized Chapters:</span>
                          <span className="font-semibold text-on-surface">Ch. 1 - Ch. 18</span>
                        </div>
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Assigned Problems:</span>
                          <span className="font-semibold text-on-surface">144 Solved / 180</span>
                        </div>
                        <div className="flex justify-between text-on-surface-variant">
                          <span>Solutions Manual:</span>
                          <span className="font-semibold text-tertiary">Verified (PDF)</span>
                        </div>
                      </div>
                      {/* Action Buttons */}
                      <div className="pt-space-xs space-y-space-xs">
                        <button className="w-full flex items-center justify-center gap-space-xs py-2.5 px-space-md rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-90 transition-opacity">
                          <span className="material-symbols-outlined text-[18px]">library_books</span>
                          <span>Open eTextbook Reader</span>
                        </button>
                        <button className="w-full flex items-center justify-center gap-space-xs py-2 px-space-md rounded-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md hover:bg-surface-container hover:text-on-surface transition-colors">
                          <span className="material-symbols-outlined text-[18px]">menu_book</span>
                          <span>View Chapter Solutions Manual</span>
                        </button>
                      </div>
                    </div>

                    {/* Downloadable Syllabus & Formula Sheets */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">Curriculum Resources</h4>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">3 Files</span>
                      </div>
                      <div className="space-y-space-xs">
                        {/* Resource Item 1 */}
                        <a
                          className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors group"
                          href="#syllabus-pdf"
                        >
                          <div className="flex items-center gap-space-sm">
                            <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-label-md text-label-md text-on-surface block truncate group-hover:text-primary transition-colors">
                                Complete Grade 11 Syllabus
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">PDF • 1.4 MB</span>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary">
                            arrow_downward
                          </span>
                        </a>
                        {/* Resource Item 2 */}
                        <a
                          className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors group"
                          href="#formula-sheet"
                        >
                          <div className="flex items-center gap-space-sm">
                            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                              <span className="material-symbols-outlined text-[18px]">functions</span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-label-md text-label-md text-on-surface block truncate group-hover:text-primary transition-colors">
                                Thermodynamics Formula Sheet
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">PDF • 480 KB</span>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary">
                            arrow_downward
                          </span>
                        </a>
                        {/* Resource Item 3 */}
                        <a
                          className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-container-low transition-colors group"
                          href="#periodic-table"
                        >
                          <div className="flex items-center gap-space-sm">
                            <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                              <span className="material-symbols-outlined text-[18px]">grid_on</span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-label-md text-label-md text-on-surface block truncate group-hover:text-primary transition-colors">
                                IUPAC Periodic Table & Constants
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">High-Res • 3.2 MB</span>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary">
                            arrow_downward
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Student Study Group & Office Hours Banner */}
                    <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm">
                      <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm font-bold uppercase">
                        <span className="material-symbols-outlined text-[16px]">forum</span>
                        <span>COMMUNITY & PEER SUPPORT</span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                        Chemistry Office Hours with Dr. Vance
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Live Q&A on Hess's Law and Reaction Enthalpies scheduled for Thursday at 4:30 PM EST.
                      </p>
                      <div className="flex items-center justify-between pt-space-xs">
                        <div className="flex -space-x-2 overflow-hidden">
                          <div className="inline-block h-7 w-7 rounded-full bg-primary-container text-on-primary text-[10px] font-bold flex items-center justify-center ring-2 ring-surface-container-lowest">
                            AK
                          </div>
                          <div className="inline-block h-7 w-7 rounded-full bg-tertiary-container text-on-tertiary text-[10px] font-bold flex items-center justify-center ring-2 ring-surface-container-lowest">
                            JD
                          </div>
                          <div className="inline-block h-7 w-7 rounded-full bg-secondary text-on-secondary text-[10px] font-bold flex items-center justify-center ring-2 ring-surface-container-lowest">
                            +18
                          </div>
                        </div>
                        <button className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:bg-surface-bright">
                          RSVP Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
