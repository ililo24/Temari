import { useEffect } from "react";

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

export default function Dashboard() {
  useEffect(() => {
    const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>(".goal-checkbox"));
    const goalCount = document.getElementById("goalCount");

    function updateGoalCount() {
      if (!checkboxes.length || !goalCount) return;

      const total = checkboxes.length;
      const checked = checkboxes.filter((cb) => cb.checked).length;
      goalCount.textContent = `${checked} of ${total} done`;

      checkboxes.forEach((cb) => {
        const textSpan = cb.closest("label")?.querySelector(".font-label-md");

        if (textSpan) {
          if (cb.checked) {
            textSpan.classList.add("line-through", "text-on-surface-variant");
            textSpan.classList.remove("font-medium", "text-on-surface");
          } else {
            textSpan.classList.remove("line-through", "text-on-surface-variant");
            textSpan.classList.add("font-medium", "text-on-surface");
          }
        }
      });
    }

    checkboxes.forEach((cb) => {
      cb.addEventListener("change", updateGoalCount);
    });

    const toggleList = document.getElementById("viewToggleCompetency") as HTMLButtonElement | null;
    const toggleBenchmark = document.getElementById("viewToggleBenchmark") as HTMLButtonElement | null;

    const handleListClick = () => {
      if (!toggleList || !toggleBenchmark) return;

      toggleList.className =
        "px-space-md py-1 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-xs transition-all";
      toggleBenchmark.className =
        "px-space-md py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all";
    };

    const handleBenchmarkClick = () => {
      if (!toggleList || !toggleBenchmark) return;

      toggleBenchmark.className =
        "px-space-md py-1 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-xs transition-all";
      toggleList.className =
        "px-space-md py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all";
    };

    toggleList?.addEventListener("click", handleListClick);
    toggleBenchmark?.addEventListener("click", handleBenchmarkClick);

    return () => {
      checkboxes.forEach((cb) => {
        cb.removeEventListener("change", updateGoalCount);
      });

      toggleList?.removeEventListener("click", handleListClick);
      toggleBenchmark?.removeEventListener("click", handleBenchmarkClick);
    };
  }, []);

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
                aria-current="page"
                className="flex items-center gap-space-sm px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm"
                data-path="dashboard"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                <span>Dashboard</span>
              </a>

              <a
                className="flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
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
              {/* Interactive Dashboard Root Container */}
              <div className="px-space-lg py-space-xl max-w-7xl mx-auto w-full space-y-space-xl">
                {/* Top Welcome Banner & Momentum Header */}
                <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-surface-tint p-space-xl text-on-primary shadow-xl">
                  {/* Decorative Backdrop Geometry */}
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                  <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/15 blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                    <div className="space-y-space-xs max-w-2xl">
                      <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-white/15 backdrop-blur-md text-on-primary font-label-md text-label-md uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
                        Term 2 Examination Sprint • Week 7
                      </div>

                      <h1 className="font-headline-xl text-headline-xl tracking-tight text-on-primary">
                        Welcome back, Amina! 🚀
                      </h1>

                      <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
                        You are on track for Term 2 Finals.{" "}
                        <span className="font-semibold text-white">18 hours studied</span> this week across 5 primary
                        subjects.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-space-md">
                      <button className="px-space-lg py-3 rounded-lg bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-md hover:bg-surface-container-low transition-all transform active:scale-95 flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[20px]">timer</span>
                        <span>Start Focus Session</span>
                      </button>

                      <button className="px-space-lg py-3 rounded-lg bg-white/15 backdrop-blur-md text-white font-label-lg text-label-lg hover:bg-white/25 transition-all flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[20px]">tune</span>
                        <span>Study Plan</span>
                      </button>
                    </div>
                  </div>

                  {/* Live Metric Tiles Bento Overlap */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-xl pt-space-md border-t border-white/15">
                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified</span> Readiness
                      </span>
                      <div className="flex items-baseline gap-space-xs">
                        <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">84%</span>
                        <span className="font-label-sm text-label-sm text-tertiary-fixed flex items-center">
                          <span className="material-symbols-outlined text-[14px]">arrow_upward</span>+6%
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-primary-container/80">Term benchmark: 78%</span>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">task_alt</span> Lessons Completed
                      </span>
                      <div className="flex items-baseline gap-space-xs">
                        <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">
                          48
                          <span className="text-on-primary-container/60 font-normal text-headline-sm">/64</span>
                        </span>
                        <span className="font-label-sm text-label-sm text-white/90 bg-white/20 px-1.5 py-0.5 rounded">
                          75%
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-primary-container/80">16 modules remaining</span>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">query_stats</span> Mock Exam Avg
                      </span>
                      <div className="flex items-baseline gap-space-xs">
                        <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">88.5%</span>
                        <span className="font-label-sm text-label-sm text-tertiary-fixed flex items-center">Top 5%</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-primary-container/80">Last paper: 92%</span>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">hourglass_top</span> Daily Focus
                      </span>
                      <div className="flex items-baseline gap-space-xs">
                        <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">
                          3.4 <span className="text-headline-sm font-normal text-on-primary-container">h/d</span>
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-primary-container/80">+0.8h vs last week</span>
                    </div>
                  </div>
                </section>

                {/* Main Content Layout Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
                  {/* Primary Core Column (8 cols) */}
                  <div className="xl:col-span-8 flex flex-col gap-space-xl">
                    {/* Diagnostic Breakdown: Strengths vs Growth Areas */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm border-b border-surface-container">
                        <div>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                              Diagnostic Intelligence
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                              AI Updated Today
                            </span>
                          </div>
                          <h2 className="font-headline-md text-headline-md text-on-surface">
                            Subject Strengths & Targeted Growth
                          </h2>
                        </div>

                        <div className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg">
                          <button
                            className="px-space-md py-1 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-xs transition-all"
                            id="viewToggleCompetency"
                          >
                            List View
                          </button>
                          <button
                            className="px-space-md py-1 rounded text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all"
                            id="viewToggleBenchmark"
                          >
                            Benchmark Comparison
                          </button>
                        </div>
                      </div>

                      {/* Mastered Strengths */}
                      <div className="space-y-space-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-tertiary flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[18px] text-tertiary-container">check_circle</span>
                            Mastered Strengths (High Retention)
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Avg: 91.3% Mastery</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                          {/* Strength Card 1 */}
                          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow">
                            <div>
                              <div className="flex items-center justify-between mb-space-xs">
                                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                                  94% Mastery
                                </span>
                                <span className="material-symbols-outlined text-tertiary-container text-[20px]">science</span>
                              </div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                                Genetics & Molecular Bio
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                DNA Replication, PCR, Mendelian genetics
                              </p>
                            </div>
                            <div className="pt-space-xs border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                              <span>120 questions solved</span>
                              <span className="text-tertiary font-bold">Exam Ready</span>
                            </div>
                          </div>

                          {/* Strength Card 2 */}
                          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow">
                            <div>
                              <div className="flex items-center justify-between mb-space-xs">
                                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                                  91% Mastery
                                </span>
                                <span className="material-symbols-outlined text-tertiary-container text-[20px]">functions</span>
                              </div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                                Calculus: Derivatives
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                Rates of change, optimization, chain rule
                              </p>
                            </div>
                            <div className="pt-space-xs border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                              <span>85 questions solved</span>
                              <span className="text-tertiary font-bold">Exam Ready</span>
                            </div>
                          </div>

                          {/* Strength Card 3 */}
                          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow">
                            <div>
                              <div className="flex items-center justify-between mb-space-xs">
                                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                                  89% Mastery
                                </span>
                                <span className="material-symbols-outlined text-tertiary-container text-[20px]">public</span>
                              </div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                                Post-WWII Geopolitics
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                Cold War balance, decolonization treaties
                              </p>
                            </div>
                            <div className="pt-space-xs border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                              <span>64 essay outlines</span>
                              <span className="text-tertiary font-bold">Exam Ready</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Growth Areas & Critical Weaknesses */}
                      <div className="space-y-space-sm pt-space-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-error flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[18px]">priority_high</span>
                            Growth Areas & Critical Weaknesses (Requires Intervention)
                          </span>
                          <span className="font-label-sm text-label-sm text-error font-medium">
                            Estimated +8.4% total score gain available
                          </span>
                        </div>

                        <div className="space-y-space-xs">
                          {/* Weakness Item 1 */}
                          <div className="p-space-md rounded-xl bg-error-container/20 flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-error-container/30 transition-colors">
                            <div className="flex items-start gap-space-md">
                              <div className="p-2.5 rounded-lg bg-error text-on-error flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[22px]">biotech</span>
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-space-xs">
                                  <h4 className="font-headline-sm text-headline-sm text-on-surface">
                                    Organic Chemistry: Reaction Mechanisms
                                  </h4>
                                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-error text-on-error font-semibold">
                                    62% Mastery
                                  </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                  <span className="font-semibold text-error">18 mistakes logged</span> in past papers
                                  (Electrophilic Addition & Markovnikov's Rule)
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-space-sm shrink-0">
                              <button className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm">
                                <span>Practice Now</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                              </button>
                            </div>
                          </div>

                          {/* Weakness Item 2 */}
                          <div className="p-space-md rounded-xl bg-secondary-container/40 flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-secondary-container/60 transition-colors">
                            <div className="flex items-start gap-space-md">
                              <div className="p-2.5 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[22px]">trending_up</span>
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-space-xs">
                                  <h4 className="font-headline-sm text-headline-sm text-on-surface">
                                    Microeconomics: Elasticity & Market Equilibrium
                                  </h4>
                                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-semibold">
                                    67% Mastery
                                  </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                  Struggling with multi-variable graph interpretation and tax incidence deadweight loss
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-space-sm shrink-0">
                              <button className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm">
                                <span>Practice Now</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                              </button>
                            </div>
                          </div>

                          {/* Weakness Item 3 */}
                          <div className="p-space-md rounded-xl bg-secondary-container/30 flex flex-col md:flex-row md:items-center justify-between gap-space-md hover:bg-secondary-container/50 transition-colors">
                            <div className="flex items-start gap-space-md">
                              <div className="p-2.5 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[22px]">bolt</span>
                              </div>
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-space-xs">
                                  <h4 className="font-headline-sm text-headline-sm text-on-surface">
                                    Physics: Electromagnetic Induction
                                  </h4>
                                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-semibold">
                                    71% Mastery
                                  </span>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                  Faraday's & Lenz's Law vector direction questions need systematic drills
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-space-sm shrink-0">
                              <button className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm">
                                <span>Practice Now</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comparative Benchmark Chart Representation */}
                      <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            School Cohort Benchmark Comparison
                          </span>
                          <div className="flex items-center gap-space-md text-label-sm font-label-sm">
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full bg-primary inline-block" /> Your Score
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full bg-outline-variant inline-block" /> School Median (Grade
                              11)
                            </span>
                          </div>
                        </div>

                        {/* Subject Comparative Bars */}
                        <div className="space-y-space-sm pt-space-xs">
                          <div>
                            <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                              <span className="font-semibold text-on-surface">Calculus & Advanced Math</span>
                              <span>Amina: 91% • Benchmark: 74% (+17%)</span>
                            </div>
                            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden relative">
                              <div
                                className="absolute left-0 top-0 h-full bg-outline-variant/60 rounded-full"
                                style={{ width: "74%" }}
                              />
                              <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: "91%" }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                              <span className="font-semibold text-on-surface">Chemistry & Life Sciences</span>
                              <span>Amina: 78% • Benchmark: 72% (+6%)</span>
                            </div>
                            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden relative">
                              <div
                                className="absolute left-0 top-0 h-full bg-outline-variant/60 rounded-full"
                                style={{ width: "72%" }}
                              />
                              <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: "78%" }} />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                              <span className="font-semibold text-on-surface">Physics & Electronics</span>
                              <span>Amina: 71% • Benchmark: 76% (-5% priority)</span>
                            </div>
                            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden relative">
                              <div
                                className="absolute left-0 top-0 h-full bg-outline-variant/60 rounded-full"
                                style={{ width: "76%" }}
                              />
                              <div className="absolute left-0 top-0 h-full bg-error rounded-full" style={{ width: "71%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Lessons Progress & Up Next */}
                    <section className="space-y-space-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                            Active Modules
                          </span>
                          <h2 className="font-headline-md text-headline-md text-on-surface">Continue Learning</h2>
                        </div>
                        <a
                          className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
                          href="#"
                        >
                          <span>View All 16 Modules</span>
                          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                        {/* In Progress Lesson 1 */}
                        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                          <div className="space-y-space-sm pt-1">
                            <div className="flex items-center justify-between">
                              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                                Chemistry
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span> 25m left
                              </span>
                            </div>
                            <div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                                Alkenes & Alkynes
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                Lesson 4 of 8 • Electrophilic Addition
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                                <span>Progress</span>
                                <span className="font-bold text-on-surface">45%</span>
                              </div>
                              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "45%" }} />
                              </div>
                            </div>
                          </div>
                          <button className="mt-space-md w-full py-2.5 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">play_circle</span>
                            <span>Resume Lesson</span>
                          </button>
                        </div>

                        {/* In Progress Lesson 2 */}
                        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                          <div className="space-y-space-sm pt-1">
                            <div className="flex items-center justify-between">
                              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                                Calculus BC
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span> 15m left
                              </span>
                            </div>
                            <div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                                Taylor Series Expansion
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                Lesson 6 of 10 • Power Series & Radius
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                                <span>Progress</span>
                                <span className="font-bold text-on-surface">70%</span>
                              </div>
                              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "70%" }} />
                              </div>
                            </div>
                          </div>
                          <button className="mt-space-md w-full py-2.5 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">play_circle</span>
                            <span>Resume Lesson</span>
                          </button>
                        </div>

                        {/* In Progress Lesson 3 */}
                        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary-container" />
                          <div className="space-y-space-sm pt-1">
                            <div className="flex items-center justify-between">
                              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                                Literature
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span> 40m left
                              </span>
                            </div>
                            <div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                                Post-Colonial Themes
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                Lesson 2 of 5 • Things Fall Apart Analysis
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-1">
                                <span>Progress</span>
                                <span className="font-bold text-on-surface">30%</span>
                              </div>
                              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-tertiary-container rounded-full transition-all duration-500"
                                  style={{ width: "30%" }}
                                />
                              </div>
                            </div>
                          </div>
                          <button className="mt-space-md w-full py-2.5 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[18px]">play_circle</span>
                            <span>Resume Lesson</span>
                          </button>
                        </div>
                      </div>
                    </section>

                    {/* Recent Exam Performance Feed */}
                    <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                            Audit History
                          </span>
                          <h2 className="font-headline-md text-headline-md text-on-surface">
                            Recent Exam & Past Paper Scores
                          </h2>
                        </div>
                        <button className="px-space-md py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">file_download</span>
                          <span>Export PDF Report</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-surface-container font-label-sm text-label-sm text-on-surface-variant">
                              <th className="py-space-sm px-space-sm font-semibold">Test / Past Paper</th>
                              <th className="py-space-sm px-space-sm font-semibold">Score</th>
                              <th className="py-space-sm px-space-sm font-semibold">Diagnostic Key finding</th>
                              <th className="py-space-sm px-space-sm font-semibold text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                            <tr className="hover:bg-surface-container-low/60 transition-colors">
                              <td className="py-space-md px-space-sm">
                                <div className="flex items-center gap-space-sm">
                                  <span className="p-2 rounded-lg bg-secondary-container text-on-secondary-container">
                                    <span className="material-symbols-outlined text-[20px]">assignment</span>
                                  </span>
                                  <div>
                                    <div className="font-label-lg text-label-lg text-on-surface font-bold">
                                      2023 National Chemistry Paper 2
                                    </div>
                                    <div className="text-on-surface-variant text-label-sm font-label-sm">
                                      Completed Yesterday • 1 hr 45 min
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-space-md px-space-sm">
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                  78<span className="text-on-surface-variant font-normal text-label-sm">/100</span>
                                </span>
                              </td>
                              <td className="py-space-md px-space-sm">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container/60 text-on-error-container font-label-sm text-label-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-error" /> Weakness: Section B Organic
                                </span>
                              </td>
                              <td className="py-space-md px-space-sm text-right">
                                <button className="px-space-sm py-1 rounded text-primary font-label-md text-label-md hover:bg-surface-container hover:underline">
                                  Review Errors
                                </button>
                              </td>
                            </tr>

                            <tr className="hover:bg-surface-container-low/60 transition-colors">
                              <td className="py-space-md px-space-sm">
                                <div className="flex items-center gap-space-sm">
                                  <span className="p-2 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
                                    <span className="material-symbols-outlined text-[20px]">verified</span>
                                  </span>
                                  <div>
                                    <div className="font-label-lg text-label-lg text-on-surface font-bold">
                                      2022 Mathematics Mock 1
                                    </div>
                                    <div className="text-on-surface-variant text-label-sm font-label-sm">
                                      3 days ago • 2 hr 00 min
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-space-md px-space-sm">
                                <span className="font-headline-sm text-headline-sm font-bold text-tertiary">
                                  92<span className="text-on-surface-variant font-normal text-label-sm">/100</span>
                                </span>
                              </td>
                              <td className="py-space-md px-space-sm">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-fixed/80 text-on-tertiary-fixed font-label-sm text-label-sm">
                                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Strength: Sec A Pure Calculus
                                </span>
                              </td>
                              <td className="py-space-md px-space-sm text-right">
                                <button className="px-space-sm py-1 rounded text-primary font-label-md text-label-md hover:bg-surface-container hover:underline">
                                  Review Solution
                                </button>
                              </td>
                            </tr>

                            <tr className="hover:bg-surface-container-low/60 transition-colors">
                              <td className="py-space-md px-space-sm">
                                <div className="flex items-center gap-space-sm">
                                  <span className="p-2 rounded-lg bg-surface-container text-on-surface">
                                    <span className="material-symbols-outlined text-[20px]">quiz</span>
                                  </span>
                                  <div>
                                    <div className="font-label-lg text-label-lg text-on-surface font-bold">
                                      2024 Physics Diagnostic Test
                                    </div>
                                    <div className="text-on-surface-variant text-label-sm font-label-sm">
                                      May 12 • 1 hr 15 min
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-space-md px-space-sm">
                                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                                  84<span className="text-on-surface-variant font-normal text-label-sm">/100</span>
                                </span>
                              </td>
                              <td className="py-space-md px-space-sm">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                                  Balanced • Needs Work in Induction
                                </span>
                              </td>
                              <td className="py-space-md px-space-sm text-right">
                                <button className="px-space-sm py-1 rounded text-primary font-label-md text-label-md hover:bg-surface-container hover:underline">
                                  View Analytics
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                  </div>

                  {/* Secondary Column / Right Sidebar Widgets (4 cols) */}
                  <div className="xl:col-span-4 flex flex-col gap-space-lg">
                    {/* AI Study Recommendation Highlight */}
                    <div className="bg-gradient-to-b from-primary-fixed/60 to-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-primary text-on-primary font-bold tracking-wider flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                          AI RECOMMENDATION
                        </span>
                        <span className="font-label-sm text-label-sm text-primary font-bold">+4% Readiness Lift</span>
                      </div>

                      <div className="space-y-space-xs">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Target Reaction Mechanisms</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          Based on your last 3 chemistry mock papers, focusing on{" "}
                          <strong className="text-on-surface">Organic Reaction Mechanisms</strong> for just 30 minutes will
                          clear your most repeated error pattern.
                        </p>
                      </div>

                      <div className="p-space-md rounded-lg bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-space-sm">
                          <span className="material-symbols-outlined text-primary text-[24px]">timer</span>
                          <div>
                            <div className="font-label-md text-label-md text-on-surface">30 min Rapid Drill</div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant">15 targeted questions</div>
                          </div>
                        </div>
                        <button className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all">
                          Start Drill
                        </button>
                      </div>
                    </div>

                    {/* Daily Study Goals Checklist */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                            Daily Targets
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">Study Goals</h3>
                        </div>
                        <span
                          className="font-label-md text-label-md px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold"
                          id="goalCount"
                        >
                          2 of 4 done
                        </span>
                      </div>

                      {/* Goal List Items */}
                      <div className="space-y-space-xs" id="goalsList">
                        <label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <input
                            defaultChecked
                            className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer goal-checkbox"
                            type="checkbox"
                          />
                          <div className="flex flex-col flex-1">
                            <span className="font-label-md text-label-md text-on-surface-variant line-through group-hover:text-on-surface transition-colors">
                              Review 25 Organic Chem Flashcards
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Completed in 20m</span>
                          </div>
                          <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                        </label>

                        <label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <input
                            defaultChecked
                            className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer goal-checkbox"
                            type="checkbox"
                          />
                          <div className="flex flex-col flex-1">
                            <span className="font-label-md text-label-md text-on-surface-variant line-through group-hover:text-on-surface transition-colors">
                              Solve 5 Taylor Series Exam Problems
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              Completed with 88% accuracy
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-[18px] text-tertiary">check_circle</span>
                        </label>

                        <label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <input
                            className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer goal-checkbox"
                            type="checkbox"
                          />
                          <div className="flex flex-col flex-1">
                            <span className="font-label-md text-label-md text-on-surface font-medium group-hover:text-primary transition-colors">
                              Read Post-Colonial Literature Chapter 3
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Target: 35 mins</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-primary font-bold">Pending</span>
                        </label>

                        <label className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <input
                            className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer goal-checkbox"
                            type="checkbox"
                          />
                          <div className="flex flex-col flex-1">
                            <span className="font-label-md text-label-md text-on-surface font-medium group-hover:text-primary transition-colors">
                              Take 15-minute Physics induction quiz
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">Evening booster</span>
                          </div>
                          <span className="font-label-sm text-label-sm text-primary font-bold">Pending</span>
                        </label>
                      </div>

                      <button className="w-full py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>Add Custom Goal</span>
                      </button>
                    </div>

                    {/* Upcoming Scheduled Revision Sessions */}
                    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                            Schedule
                          </span>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">Revision Timetable</h3>
                        </div>
                        <button className="p-1 rounded text-on-surface-variant hover:text-on-surface">
                          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                        </button>
                      </div>

                      <div className="space-y-space-sm">
                        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
                          <div className="p-2 rounded bg-surface-container-lowest text-center min-w-[48px] shadow-xs">
                            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">TODAY</div>
                            <div className="font-headline-sm text-headline-sm text-primary font-bold">4:30</div>
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="font-label-md text-label-md font-bold text-on-surface">Live Calculus Workshop</div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              With Mr. Henderson • Series Convergence
                            </div>
                            <div className="mt-1 flex items-center gap-1 font-label-sm text-label-sm text-primary">
                              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                              Starts in 1h 45m
                            </div>
                          </div>
                        </div>

                        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
                          <div className="p-2 rounded bg-surface-container-lowest text-center min-w-[48px] shadow-xs">
                            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">TOM</div>
                            <div className="font-headline-sm text-headline-sm text-on-surface font-bold">16:00</div>
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="font-label-md text-label-md font-bold text-on-surface">Full Chemistry Mock Paper</div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              Timed Exam Simulation (Paper 1 & 2)
                            </div>
                            <div className="mt-1 font-label-sm text-label-sm text-on-surface-variant">Estimated: 120 mins</div>
                          </div>
                        </div>

                        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
                          <div className="p-2 rounded bg-surface-container-lowest text-center min-w-[48px] shadow-xs">
                            <div className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">THU</div>
                            <div className="font-headline-sm text-headline-sm text-on-surface font-bold">10:15</div>
                          </div>
                          <div className="flex flex-col flex-1">
                            <div className="font-label-md text-label-md font-bold text-on-surface">
                              Study Group: World History
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                              Peer Review on Post-Colonial Outlines
                            </div>
                            <div className="mt-1 font-label-sm text-label-sm text-on-surface-variant">Room 3B & Virtual Sync</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Student Motivation & Daily Quote Card */}
                    <div className="p-space-md rounded-xl bg-surface-container-low flex items-center gap-space-md">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <span className="material-symbols-outlined text-[24px]">psychology</span>
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-body-sm text-body-sm text-on-surface italic">
                          "Consistency beats intensity. 30 intentional minutes every day reshapes retention curves."
                        </p>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          — StudyPulse Cognitive Science Tips
                        </span>
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
