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

const NAV_LINK =
  "px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors";
const NAV_LINK_ACTIVE =
  "px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm flex items-center justify-between";

export default function AiStudy() {
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
      <style>{baseStyles}</style>
      <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
      <script id="tailwind-config" dangerouslySetInnerHTML={{ __html: tailwindConfigScript }} />

      <div className="bg-background font-body-md text-body-md text-on-surface antialiased">
        {/* Left App Navigation Sidebar */}
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
              <a className={NAV_LINK} data-path="dashboard" href="#">
                Dashboard
              </a>
              <a className={NAV_LINK} data-path="lessons" href="#">
                Lessons
              </a>
              <a className={NAV_LINK} data-path="exams-and-past-papers" href="#">
                Exams & Past Papers
              </a>
              <a className={NAV_LINK} data-path="performance-analytics" href="#">
                Performance Analytics
              </a>
              <a className={NAV_LINK} data-path="study-groups-and-collab" href="#">
                Study Groups & Collab
              </a>
              <a aria-current="page" className={NAV_LINK_ACTIVE} data-path="ai-study-assistant" href="#">
                <span>AI Study Assistant</span>
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed" />
              </a>
            </nav>
          </div>
          <div className="p-space-md">
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-semibold">Academic Term</span>
                <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                  Active
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Term 2 Finals Prep</p>
            </div>
          </div>
        </aside>

        {/* Main Viewport Wrap */}
        <div className="pl-64">
          {/* Top Global Header */}
          <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-lg">
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center bg-surface-container-low px-space-md py-space-xs rounded-lg gap-space-xs text-on-surface-variant w-80">
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
              <button className="flex items-center gap-space-sm px-space-sm py-1.5 rounded-lg hover:bg-surface-container-low transition-colors text-left focus:outline-none">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1L8WFo-mBDL9i-zWMDD7A3FwtonEsEz2nPorHrxciq8JruCbrL61YLWAGGdHkIXcgXdNR6LQBQduxbsNKBzncu8LZVj6DbL-ztN_WG_AWmdEGvByBQmy70DvdC-fAXfDxIBLoKxsBRH17DbTIOjDnzysFjbGpK1L2AwpyXM8Mgsf93OZwAVfft6PVxgYhrFx9dsEb7MXzBtUr2o2kablt0h_4MtLSiXwv8OVO45GC9XicOXgod4ZRKA"
                />
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface leading-tight">Amina K.</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">(Grade 11)</span>
                </div>
                <span className="material-symbols-outlined text-[20px] text-on-surface-variant">expand_more</span>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="w-full pt-16 bg-background">
            <div className="px-space-lg pt-space-md pb-space-xl flex flex-col gap-space-lg max-w-[1520px] mx-auto w-full">
              {/* Top Grounding & Context Strip */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                    <span className="hover:text-primary transition-colors cursor-pointer">StudyPulse</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    <span className="text-on-surface font-semibold">AI Assistant Command Center</span>
                  </div>
                  <div className="h-4 w-px bg-outline-variant" />
                  <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[16px] text-primary">book</span>
                    <span className="text-on-surface-variant font-medium">Synced:</span>
                    <span className="font-semibold text-primary">Zumdahl AP Chem + Stewart Calc</span>
                    <button
                      className="p-0.5 rounded-full hover:bg-surface-container-high ml-0.5 text-on-surface-variant"
                      title="Edit Syllabi"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-container/70 text-on-secondary-container font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[15px] text-primary">psychology</span>
                    <span className="font-semibold">PulseAI v4.5 Adaptive CoT</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    <span>Grounding Active (3 Sources)</span>
                  </div>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* CORE CENTER STAGE: BOLD, VERSATILE PROMPT INPUT WORKSPACE */}
              {/* ========================================================================= */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-md border border-outline-variant/40 p-space-lg flex flex-col gap-space-md relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-tertiary/5 rounded-full blur-2xl pointer-events-none" />
                {/* Header & Intent Helper */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm relative z-10">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px]">neurology</span>
                      </div>
                      <h1 className="font-headline-md text-headline-md text-on-surface">AI Study Command Hub</h1>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Generate targeted AP drills, diagnose root conceptual misconceptions, or synthesize adaptive exam
                      countdown sprints.
                    </p>
                  </div>
                  {/* Integrated AI Action Mode Pills */}
                  <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl">
                    <button className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1.5 shadow-sm font-semibold transition-all">
                      <span className="material-symbols-outlined text-[16px]">quiz</span>
                      <span>Targeted Quiz Generator</span>
                    </button>
                    <button className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">healing</span>
                      <span>Weak Topic Diagnosis</span>
                    </button>
                    <button className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md flex items-center gap-1.5 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>Adaptive Study Plan</span>
                    </button>
                  </div>
                </div>
                {/* Parameter Configuration Ribbon (Targeted to Active Preset) */}
                <div className="bg-surface-container-low/70 border border-outline-variant/30 rounded-xl p-space-sm flex flex-wrap items-center justify-between gap-space-sm relative z-10">
                  <div className="flex flex-wrap items-center gap-space-sm">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider flex items-center gap-1 pl-1">
                      <span className="material-symbols-outlined text-[15px] text-primary">tune</span>
                      Preset Parameters:
                    </span>
                    {/* Topic Dropdown */}
                    <div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-xs text-on-surface text-label-md font-label-md border border-outline-variant/40">
                      <span className="text-on-surface-variant font-normal">Topic:</span>
                      <span className="font-semibold text-primary">Organic Kinetics & Reaction Mechanisms</span>
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                    </div>
                    {/* Question Count */}
                    <div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-xs text-on-surface text-label-md font-label-md border border-outline-variant/40">
                      <span className="text-on-surface-variant font-normal">Drill Length:</span>
                      <span className="font-semibold text-on-surface">5 High-Yield Questions</span>
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                    </div>
                    {/* Difficulty / Exam Style */}
                    <div className="flex items-center gap-1 bg-surface-container-lowest px-space-sm py-1 rounded-lg shadow-xs text-on-surface text-label-md font-label-md border border-outline-variant/40">
                      <span className="text-on-surface-variant font-normal">Style:</span>
                      <span className="px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-bold text-[10px]">
                        AP Exam Hard / Tier 4
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
                    </div>
                  </div>
                  {/* Weak Area Quick Pin Alert */}
                  <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-error-container/40 text-on-error-container font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-error text-[15px]">priority_high</span>
                    <span>
                      Recent diagnostic mastery: <strong className="text-error font-bold">62%</strong>
                    </span>
                  </div>
                </div>
                {/* The Prominent AI Prompt Input Box */}
                <div className="flex flex-col bg-surface-container-low rounded-2xl border-2 border-primary/30 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 shadow-inner bg-surface-container-lowest transition-all relative z-10 p-space-sm">
                  <textarea
                    className="w-full bg-transparent p-space-sm font-body-md text-body-md text-on-surface outline-none resize-none placeholder:text-outline h-28"
                    defaultValue="Generate an AP Chemistry drill on Differential vs Integrated Rate Laws with focus on my recent 62% mastery weak spots in multi-step reaction mechanisms."
                    placeholder="Ask anything, generate drills, or ask for diagnostic guidance (e.g. 'Synthesize a 5-question multi-step mechanism quiz focusing on rate-determining steps and intermediate species')..."
                  />
                  {/* Bottom Tooling Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-space-sm pt-2 px-space-sm border-t border-outline-variant/30">
                    {/* Contextual Tools / File Attachments */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                        title="Upload handwritten notes or problem snapshot"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">add_a_photo</span>
                        <span>Photo/Notes</span>
                      </button>
                      <button
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                        title="Attach textbook chapter or lab report PDF"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">attach_file</span>
                        <span>Attach PDF / Zumdahl Ch. 12</span>
                      </button>
                      <button
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                        title="Target specific exam countdown date"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">event</span>
                        <span>Target: Midterm May 24</span>
                      </button>
                      <button
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                        title="Insert LaTeX or chemical symbols"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">functions</span>
                        <span>LaTeX / Math</span>
                      </button>
                      <div className="h-4 w-px bg-outline-variant mx-1" />
                      <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-secondary hover:bg-surface-container font-label-md text-label-md transition-colors">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                        <span>Voice Prompt</span>
                      </button>
                    </div>
                    {/* Action Controls */}
                    <div className="flex items-center gap-space-sm">
                      <button
                        className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                        title="Clear prompt"
                      >
                        <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                      </button>
                      <button className="px-space-lg py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                        <span>Generate Workspace</span>
                        <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Quick Suggestion Starter Prompts */}
                <div className="flex flex-wrap items-center gap-2 relative z-10 pt-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[15px] text-primary">tips_and_updates</span> Quick
                    Prompts:
                  </span>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/30 transition-all flex items-center gap-1 text-left">
                    <span className="text-primary font-bold">Quiz:</span> "5 AP-style questions on 2nd-order Arrhenius
                    equations"
                  </button>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/30 transition-all flex items-center gap-1 text-left">
                    <span className="text-error font-bold">Diagnose:</span> "Why do I confuse intermediates with catalysts
                    in mechanisms?"
                  </button>
                  <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm border border-outline-variant/30 transition-all flex items-center gap-1 text-left">
                    <span className="text-tertiary font-bold">Sprint:</span> "Build a 3-day high-intensity cram plan for
                    Calc BC Derivatives"
                  </button>
                </div>
              </div>

              {/* ========================================================================= */}
              {/* DYNAMIC WORKSPACE OUTPUTS: THREE TAILORED LEARNING PANELS */}
              {/* ========================================================================= */}
              <div className="grid grid-cols-12 gap-space-lg items-start">
                {/* 1. TARGETED QUIZ GENERATOR LIVE PREVIEW (Col 12 -> Col 5) */}
                <div className="col-span-12 xl:col-span-5 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">quiz</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                            Generated AP Drill
                          </h2>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Active Output: Organic Kinetics & Reaction Orders
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                        Q1 of 5 Ready
                      </span>
                    </div>
                    {/* Question Card */}
                    <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-primary text-[12px] font-bold">
                          AP CHEM 2022 • SECTION 1
                        </span>
                        <span className="font-label-sm text-label-sm text-error font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">local_fire_department</span> Hard (68%
                          fail rate)
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                        For the proposed multi-step mechanism:
                      </p>
                      <div className="p-2.5 rounded-lg bg-surface-container-lowest font-mono text-body-sm text-on-surface space-y-1 border border-outline-variant/20">
                        <div className="flex justify-between items-center text-on-surface">
                          <span>Step 1: NO(g) + Br₂(g) ⇌ NOBr₂(g)</span>
                          <span className="font-label-sm text-label-sm text-outline">(Fast equilibrium)</span>
                        </div>
                        <div className="flex justify-between items-center text-primary font-semibold">
                          <span>Step 2: NOBr₂(g) + NO(g) → 2 NOBr(g)</span>
                          <span className="font-label-sm text-label-sm text-primary font-bold">(Slow, RDS)</span>
                        </div>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        Which expression correctly represents the experimental rate law consistent with this mechanism?
                      </p>
                      {/* Interactive Multi-Choice Options */}
                      <div className="flex flex-col gap-2 pt-1">
                        <button className="p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-left flex items-start gap-2 text-on-surface transition-all group">
                          <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface font-bold text-label-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-on-primary">
                            A
                          </span>
                          <span className="font-mono text-body-sm pt-0.5">Rate = k [NO] [Br₂]</span>
                        </button>
                        <button className="p-2.5 rounded-lg bg-primary-fixed/40 border-2 border-primary text-left flex items-start gap-2 text-on-surface shadow-xs transition-all">
                          <span className="w-6 h-6 rounded-full bg-primary text-on-primary font-bold text-label-sm flex items-center justify-center flex-shrink-0">
                            B
                          </span>
                          <div className="flex flex-col flex-grow">
                            <span className="font-mono text-body-sm pt-0.5 font-bold text-primary">
                              Rate = k [NO]² [Br₂]
                            </span>
                            <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 mt-1 font-semibold">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span> Correct!
                              Intermediate substituted.
                            </span>
                          </div>
                        </button>
                        <button className="p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-left flex items-start gap-2 text-on-surface transition-all group opacity-75">
                          <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface font-bold text-label-sm flex items-center justify-center flex-shrink-0">
                            C
                          </span>
                          <span className="font-mono text-body-sm pt-0.5">Rate = k [NOBr₂] [NO]</span>
                        </button>
                        <button className="p-2.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/40 text-left flex items-start gap-2 text-on-surface transition-all group opacity-75">
                          <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface font-bold text-label-sm flex items-center justify-center flex-shrink-0">
                            D
                          </span>
                          <span className="font-mono text-body-sm pt-0.5">Rate = k [NO]² [Br₂]²</span>
                        </button>
                      </div>
                      {/* Instant Step Explanation Reveal */}
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1.5 mt-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-bold text-primary flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">psychology</span> Socratic Step
                            Explanation:
                          </span>
                          <span className="font-label-sm text-label-sm text-outline">AP Rubric #4.2</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          Because NOBr₂ is an <em>unstable intermediate</em>, it cannot appear in the overall rate law.
                          From Step 1:{" "}
                          <code className="bg-surface-container px-1 rounded text-primary">
                            [NOBr₂] = K₁[NO][Br₂]
                          </code>
                          . Substituting into Step 2 yields:{" "}
                          <code className="bg-surface-container px-1 rounded text-primary">
                            Rate = k₂K₁[NO]²[Br₂]
                          </code>
                          .
                        </p>
                      </div>
                    </div>
                    {/* Action Footers */}
                    <div className="flex items-center justify-between pt-1">
                      <button className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors">
                        <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                        <span>Regenerate Variant</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">file_download</span>
                          <span>Save PDF</span>
                        </button>
                        <button className="px-space-md py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-all">
                          <span>Start Timed Drill (5 Qs)</span>
                          <span className="material-symbols-outlined text-[16px]">timer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 2. WEAK TOPIC DIAGNOSIS & EXPLANATIONS (Col 12 -> Col 4) */}
                <div className="col-span-12 xl:col-span-4 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-error-container text-error flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">healing</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                            Diagnostic Deep-Dive
                          </h2>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            Logged Pitfalls & Conceptual Remedy
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-label-sm font-bold">
                        62% Mastery
                      </span>
                    </div>
                    {/* Diagnostic Report Card */}
                    <div className="flex flex-col gap-space-sm">
                      <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            Electrophilic Addition & Multi-Step Kinetics
                          </span>
                          <span className="font-label-sm text-label-sm text-error flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">trending_down</span> 3 errors logged
                          </span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                          <div className="bg-error h-full rounded-full" style={{ width: "62%" }} />
                        </div>
                        <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                          <span>Mastery Level: Critical Weakness</span>
                          <span className="font-bold text-on-surface">Needs 85% for AP 5</span>
                        </div>
                      </div>
                      {/* Why you missed this */}
                      <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-error font-label-md text-label-md font-bold">
                          <span className="material-symbols-outlined text-[16px]">error_outline</span>
                          <span>Root Diagnosis: Why you missed this</span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                          You consistently treat <strong>intermediates</strong> as catalysts. Remember:
                        </p>
                        <ul className="text-body-sm font-body-sm text-on-surface space-y-1 pl-1">
                          <li className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-tertiary text-[14px] mt-0.5">check</span>
                            <span>
                              <strong>Intermediate:</strong> Produced in early step, consumed in later step (net 0).
                            </span>
                          </li>
                          <li className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">arrow_right</span>
                            <span>
                              <strong>Catalyst:</strong> Present at start as reactant, regenerated in end step.
                            </span>
                          </li>
                        </ul>
                      </div>
                      {/* Conceptual Clarification Tree */}
                      <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-2">
                        <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-primary">account_tree</span>
                          <span>Step-by-Step Resolution Tree</span>
                        </span>
                        <div className="flex flex-col gap-2 pl-2 relative">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </span>
                            <div className="flex flex-col">
                              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                                Write Slow-Step Rate Law
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                Rate = k₂[Intermediate][Reactant]
                              </span>
                            </div>
                          </div>
                          <div className="w-0.5 h-3 bg-outline-variant ml-2 -my-1" />
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-primary text-on-primary font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </span>
                            <div className="flex flex-col">
                              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                                Equate Fast Step Forward & Reverse
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                k₁[A][B] = k₋₁[Intermediate]
                              </span>
                            </div>
                          </div>
                          <div className="w-0.5 h-3 bg-outline-variant ml-2 -my-1" />
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                              ✓
                            </span>
                            <div className="flex flex-col">
                              <span className="font-label-sm text-label-sm font-semibold text-tertiary">
                                Substitute & Simplify k
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                Eliminate all non-measurable species
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">school</span>
                      <span>Launch Socratic Dialogue for this Topic</span>
                    </button>
                  </div>
                </div>
                {/* 3. ADAPTIVE STUDY PLAN & EXAM COUNTDOWN SPRINT (Col 12 -> Col 3) */}
                <div className="col-span-12 xl:col-span-3 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30 flex flex-col gap-space-md">
                    {/* Panel Header */}
                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-space-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        </div>
                        <div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                            Adaptive Study Plan
                          </h2>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            12-Day Countdown Sprint
                          </span>
                        </div>
                      </div>
                      <button className="p-1 rounded text-on-surface-variant hover:bg-surface-container" title="Sync Calendar">
                        <span className="material-symbols-outlined text-[18px]">sync</span>
                      </button>
                    </div>
                    {/* Sprint Metric Summary */}
                    <div className="bg-gradient-to-br from-primary-container to-primary text-on-primary rounded-xl p-3 flex items-center justify-between shadow-sm">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-on-primary-container font-semibold">
                          TARGET EXAM
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-primary font-bold">
                          AP Chem Midterm
                        </span>
                        <span className="font-body-sm text-body-sm text-on-primary-container">Target: Score 5 (92%+)</span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-headline-lg text-headline-lg font-bold leading-none">12</span>
                        <span className="font-label-sm text-label-sm text-on-primary-container">Days left</span>
                      </div>
                    </div>
                    {/* Generated 7-Day Sprint Timeline */}
                    <div className="flex flex-col gap-2">
                      <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                        <span>AI Recommended Schedule:</span>
                        <span className="text-primary font-label-sm text-label-sm">Spaced Repetition</span>
                      </span>
                      {/* Day 1 (Today) */}
                      <div className="p-2.5 rounded-lg bg-primary-fixed/30 border border-primary/40 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-primary">
                            DAY 1 (TODAY) • 45 MIN
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-primary text-on-primary text-[10px] font-bold">
                            Priority #1
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Organic Rate Mechanisms Drill
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          5 Socratic problems + intermediate vs catalyst review
                        </p>
                      </div>
                      {/* Day 2 */}
                      <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-semibold text-secondary">
                            DAY 2 (TOMORROW) • 60 MIN
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[10px] font-semibold">
                            Active Recall
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Half-life & Integrated Rate Equations
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          1st and 2nd order graphical derivations
                        </p>
                      </div>
                      {/* Day 3 */}
                      <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-semibold text-secondary">
                            DAY 3 (THU) • 50 MIN
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface-variant text-[10px]">
                            Reinforce
                          </span>
                        </div>
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Arrhenius Equation & Catalysis
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Activation energy calculation drills
                        </p>
                      </div>
                      {/* Day 4-5 Sprint Preview */}
                      <div className="p-2 rounded-lg bg-surface-container-lowest border border-dashed border-outline-variant flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                            Days 4–7: Full Exam Simulations
                          </span>
                        </div>
                        <span className="text-primary font-label-sm text-label-sm font-bold">View all</span>
                      </div>
                    </div>
                    {/* Sync & Export */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button className="py-2 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                        <span>Adjust Pace</span>
                      </button>
                      <button className="py-2 px-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-1 transition-colors shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">add_to_drive</span>
                        <span>Sync Google Cal</span>
                      </button>
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
