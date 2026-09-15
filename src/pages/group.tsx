import { useEffect, useRef, useState } from "react";

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

const groupStyles = `@keyframes pulse-halo{0%,100%{transform:scale(1);opacity:0.7;}50%{transform:scale(1.15);opacity:0.2;}}.animate-pulse-halo{animation:pulse-halo 2.4s ease-in-out infinite;}.scrollbar-subtle::-webkit-scrollbar{width:4px;height:4px;display:block;}.scrollbar-subtle::-webkit-scrollbar-thumb{background:#c7c4d8;border-radius:9999px;}`;

const NAV_LINK =
  "px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors";
const NAV_LINK_ACTIVE =
  "px-space-md py-space-sm transition-colors bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm";

const CHANNEL_LINK =
  "flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors group";
const CHANNEL_LINK_ACTIVE =
  "flex items-center justify-between px-space-sm py-2 rounded-lg bg-primary-container text-on-primary transition-all shadow-sm";

export default function Groups() {
  const [menuOpen, setMenuOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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
              <a aria-current="page" className={NAV_LINK_ACTIVE} data-path="study-groups-and-collab" href="#">
                Study Groups & Collab
              </a>
              <a className={NAV_LINK} data-path="ai-study-assistant" href="#">
                AI Study Assistant
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

          <main className="w-full pt-16 bg-background">
            <div className="flex flex-col w-full">
              {/* Interactive Style Helpers & Custom Keyframe Injection */}
              <style>{groupStyles}</style>

              {/* Sub-Header & Live Collaboration Command Strip */}
              <section className="w-full bg-surface-container-lowest px-space-lg py-space-md shadow-sm">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
                  {/* Breadcrumb & Group Context Switcher */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
                      <span className="hover:text-primary transition-colors cursor-pointer">StudyPulse</span>
                      <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
                      <span className="hover:text-primary transition-colors cursor-pointer">Study Groups & Collab</span>
                      <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
                      <span className="text-primary font-bold">Grade 11 AP Chem & Physics Squad</span>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <div className="relative inline-block text-left" id="groupSwitcherDropdown" ref={switcherRef}>
                        <button
                          className="flex items-center gap-space-sm px-space-sm py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all text-left group"
                          onClick={() => setMenuOpen((o) => !o)}
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline-sm text-[12px]">
                            AP
                          </div>
                          <div className="flex flex-col">
                            <span className="font-headline-sm text-headline-sm text-on-surface leading-snug flex items-center gap-1.5">
                              AP Chem & Kinetics Circle
                              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[10px] tracking-wide">
                                ACTIVE SQUAD
                              </span>
                            </span>
                          </div>
                          <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-hover:translate-y-0.5 transition-transform">
                            unfold_more
                          </span>
                        </button>
                        {/* Dropdown Menu */}
                        <div
                          className={`absolute left-0 mt-2 w-72 rounded-xl bg-surface-container-lowest shadow-xl z-50 p-space-xs ${
                            menuOpen ? "" : "hidden"
                          }`}
                          id="groupMenu"
                        >
                          <div className="px-space-sm py-1 font-label-sm text-outline uppercase tracking-wider">
                            Switch Workspaces
                          </div>
                          <button className="w-full flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-low text-primary font-label-md text-label-md">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-tertiary" />
                              AP Chem & Kinetics Circle
                            </span>
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </button>
                          <button className="w-full flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md transition-colors">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-outline-variant" />
                              Calculus BC Problem Squad
                            </span>
                            <span className="font-label-sm text-outline">6 online</span>
                          </button>
                          <button className="w-full flex items-center justify-between px-space-sm py-2 rounded-lg hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md transition-colors">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-outline-variant" />
                              Literature & World History
                            </span>
                            <span className="font-label-sm text-outline">2 online</span>
                          </button>
                          <div className="h-px bg-surface-container my-1" />
                          <button className="w-full flex items-center gap-2 px-space-sm py-2 rounded-lg hover:bg-primary-fixed text-primary font-label-md text-label-md transition-colors">
                            <span className="material-symbols-outlined text-[18px]">add_circle</span>
                            Create New Study Group
                          </button>
                        </div>
                      </div>
                      {/* Academic Cohort Badge */}
                      <div className="hidden md:flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
                        <span
                          className="material-symbols-outlined text-[15px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        <span>Target: AP 5 / May Exam</span>
                      </div>
                    </div>
                  </div>
                  {/* Real-time Presence & Quick Workspace Action Controls */}
                  <div className="flex flex-wrap items-center gap-space-md">
                    {/* Live Avatar Presence Stack */}
                    <div className="flex items-center gap-space-sm bg-surface-container-low px-space-sm py-1 rounded-full">
                      <div className="flex -space-x-2 overflow-hidden items-center pl-1">
                        {/* Amina K. */}
                        <div className="relative group cursor-pointer">
                          <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                            data-alt="Portrait photo of a young teenage female high school student with braided hair smiling confidently in modern study library with soft indigo accent lights"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC4IFshiiBS7Gs8NbPqB5swnZKRKNraoy7VPTJz2b7yHUmQZ-Arqp6FHu9WpCmcfAnkPTcIBdjt0wpnYTQ_BiKpj1PCk7pmTw1jqTWGgMRNZJu45XoVJkzTD6fQRiRMCjIWXKlAK3OT3thcHpkNwZIhDSflnrKc13ojbSMbgSm8TFFGGus--G5DAFoTxttt60CaD1OOqTgb3ZLGCxBqI-YecpBq3_9889Qcz57bwqsPbDbu_mn_nDLLw"
                          />
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-tertiary ring-2 ring-surface-container-lowest" />
                          <div className="hidden group-hover:flex absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-label-sm text-[10px] whitespace-nowrap shadow-md z-50">
                            You (Amina) • Lead Editor
                          </div>
                        </div>
                        {/* Marcus T. */}
                        <div className="relative group cursor-pointer">
                          <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                            data-alt="Portrait of an African American teenage male student wearing wireframe glasses in bright natural window light with notebooks"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrU7a3hq7n5sjXuidtQiTPbdO--jv34SYyA9h0rstSP8gzRhQDW6wzyAlxRfc4fAUG1zmLyFQzcF_S2dKF5bR2Z6UDiD_oVgo1xwn8PSbmw3prssFSBRm4FAOOgywWL9gzFcn_7sfASPBMhYgipPHgo5HVgga7XLvRpVGfow6D2DmNzOZI979SLmbvhQte9IiCmlnI-_zlTBz8hBVp1w9iJIx7KOU7FlQDiy2aerFt1h2_siRGbd0D4w"
                          />
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-surface-container-lowest" />
                          <div className="hidden group-hover:flex absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-label-sm text-[10px] whitespace-nowrap shadow-md z-50">
                            Marcus T. • Solving Quiz 3
                          </div>
                        </div>
                        {/* Priya S. */}
                        <div className="relative group cursor-pointer">
                          <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                            data-alt="Portrait of a young South Asian female student wearing a yellow sweater taking notes with a stylus on a digital tablet screen"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnka-lpHpqnqbUTZeIy6AN9TbgcnPCnEXEiX5riycEVfJoIGYRiZOv9SNEg4TJdaw5_lrjPsJWrSmI5DFaVkTq-UVtJMmBGzjYo8rdLLiwCa_Azhu8WwXv3yVcZzC5Toi2Fsp_FNjXa24bUmglr9ro6YZT0AHX2rY8gU03qE2Bm-Nh2nUOaLR6npLIsbXJE1I-2wCTz43KO0ZCe_I5PaJ7tHabIlvNxJyhl8cuQiG93s1IhBNoC4VyXw"
                          />
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-tertiary ring-2 ring-surface-container-lowest" />
                          <div className="hidden group-hover:flex absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-label-sm text-[10px] whitespace-nowrap shadow-md z-50">
                            Priya S. • Annotating Ch. 12
                          </div>
                        </div>
                        {/* David L. */}
                        <div className="relative group cursor-pointer">
                          <img
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                            data-alt="Portrait of a male Asian student with headphones around neck working on a laptop in modern high school collaborative lounge"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTfYuBzixum13C1m-jLzqaAIl54I8EehkpqxMm4D5MJtBMDdM5zfSRAmNurrzu97fSZBBKIWe5KFcomm0vFC1zjAK8bafuQJFCi5YFPG6uAsVJcduKLLUtH4DRQMt-LoRDgca3F7XHOic-p9rVPtqae7av2kkOKWiz3wNOvAsFnR4Qr0L4Jnj_pa5XHYnfgXhwbqGm6TErnAOKh45X9qRXcJyFDh-4pV9ejjWyECf9O0OdxlYx3BKMtw"
                          />
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
                          <div className="hidden group-hover:flex absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-inverse-surface text-inverse-on-surface font-label-sm text-[10px] whitespace-nowrap shadow-md z-50">
                            David L. • In Audio Huddle
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm pr-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                        <span className="font-semibold text-on-surface">4 studying now</span>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-space-xs">
                      {/* Voice Huddle Button */}
                      <button className="relative flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container shadow-sm transition-all hover:scale-[1.01] active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                        <span>Join Live Huddle</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed" />
                        </span>
                      </button>
                      {/* Whiteboard Launch */}
                      <button className="flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors">
                        <span className="material-symbols-outlined text-[18px] text-primary">draw</span>
                        <span className="hidden sm:inline">Canvas</span>
                      </button>
                      {/* Group Mock Schedule */}
                      <button
                        className="flex items-center gap-space-xs px-space-sm py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                        title="Schedule Mock Session"
                      >
                        <span className="material-symbols-outlined text-[18px]">event_available</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3-Column Studio Workspace Area */}
              <div className="px-space-md lg:px-space-lg py-space-md grid grid-cols-1 xl:grid-cols-12 gap-space-md max-w-[1680px] w-full mx-auto">
                {/* ========================================================================= */}
                {/* COLUMN A: CHANNELS, GROUP MILESTONES & XP LEADERBOARD (Col-span 3)        */}
                {/* ========================================================================= */}
                <aside className="xl:col-span-3 flex flex-col gap-space-md">
                  {/* Channels Selector Card */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
                    <div className="flex items-center justify-between pb-space-sm mb-space-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">tag</span>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface">Study Channels</h2>
                      </div>
                      <button className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant" title="Create channel">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <nav className="space-y-1">
                      {/* Channel 1: general-chat */}
                      <a className={CHANNEL_LINK} href="#">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-outline group-hover:text-primary font-bold">#</span>
                          <span className="font-label-md text-label-md">general-chat</span>
                        </div>
                        <span className="font-label-sm text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                          12
                        </span>
                      </a>
                      {/* Channel 2: chemistry-lab-reports (Active) */}
                      <a className={CHANNEL_LINK_ACTIVE} href="#">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-on-primary-container font-bold">#</span>
                          <span className="font-label-md text-label-md font-semibold">chemistry-lab-reports</span>
                        </div>
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse" />
                          Live
                        </span>
                      </a>
                      {/* Channel 3: past-paper-sprint */}
                      <a className={CHANNEL_LINK} href="#">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-outline group-hover:text-primary font-bold">#</span>
                          <span className="font-label-md text-label-md">past-paper-sprint</span>
                        </div>
                        <span className="font-label-sm text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                          5
                        </span>
                      </a>
                      {/* Channel 4: shared-doubt-box */}
                      <a className={CHANNEL_LINK} href="#">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-outline group-hover:text-primary font-bold">#</span>
                          <span className="font-label-md text-label-md">shared-doubt-box</span>
                        </div>
                        <span className="font-label-sm text-[10px] px-1.5 py-0.5 rounded bg-error-container text-on-error-container font-bold">
                          2 unsolved
                        </span>
                      </a>
                      {/* Channel 5: resource-vault */}
                      <a className={CHANNEL_LINK} href="#">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-outline group-hover:text-primary font-bold">#</span>
                          <span className="font-label-md text-label-md">resource-vault</span>
                        </div>
                        <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
                      </a>
                    </nav>
                  </div>
                  {/* Group Milestone & Sprints Tracker */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">task_alt</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Group Milestones</h3>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        Term 2
                      </span>
                    </div>
                    {/* Sprint Card 1 */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                          Organic Chem Lab Report 4
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px] whitespace-nowrap">
                          Due in 2d
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Kinetics of Iodide Oxidation with Hydrogen Peroxide
                      </p>
                      {/* Progress bar */}
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between font-label-sm text-label-sm">
                          <span className="text-on-surface-variant">3 of 4 tasks completed</span>
                          <span className="text-primary font-bold">75%</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "75%" }} />
                        </div>
                      </div>
                      {/* Assignees & micro status */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1">
                          <span className="font-label-sm text-label-sm text-outline">Assigned:</span>
                          <span className="font-label-sm text-label-sm text-on-surface font-medium">Marcus & Amina</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Draft Approved
                        </span>
                      </div>
                    </div>
                    {/* Scheduled Sprint 2 */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold tracking-wide">
                          MOCK SPEEDRUN
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[14px]">schedule</span> Today, 5:00 PM
                        </span>
                      </div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                        2023 Mock Paper 2 Section B
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Timed 45-min group run + instant AI scoring debrief.
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[15px]">how_to_reg</span>
                          <span>5 Squad Members RSVP'd</span>
                        </div>
                        <button className="px-2 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors">
                          Set Alert
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Shared Streak & Leaderboard */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">🔥</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Group Velocity</h3>
                      </div>
                      <span className="font-label-sm text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full font-bold">
                        Rank #2 Cohort
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-space-sm">
                      <div className="p-space-sm bg-surface-container-low rounded-xl text-center">
                        <div className="font-headline-lg text-headline-lg text-primary leading-tight">1,420</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">Week 7 Squad XP</div>
                      </div>
                      <div className="p-space-sm bg-surface-container-low rounded-xl text-center">
                        <div className="font-headline-lg text-headline-lg text-tertiary leading-tight">18 d</div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant">Shared Streak</div>
                      </div>
                    </div>
                    {/* Quick micro-leaderboard */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-body-sm text-on-surface font-medium">
                        <span className="flex items-center gap-1.5">
                          <span className="text-outline">1.</span> Priya S.
                        </span>
                        <span className="font-mono text-primary font-bold">480 XP</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm text-on-surface font-medium">
                        <span className="flex items-center gap-1.5">
                          <span className="text-outline">2.</span> Amina K. (You)
                        </span>
                        <span className="font-mono text-primary font-bold">410 XP</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm text-on-surface font-medium">
                        <span className="flex items-center gap-1.5">
                          <span className="text-outline">3.</span> Marcus T.
                        </span>
                        <span className="font-mono text-primary font-bold">330 XP</span>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* ========================================================================= */}
                {/* COLUMN B: LIVE COLLABORATIVE GROUP FEED & AI CO-PILOT (Col-span 6)        */}
                {/* ========================================================================= */}
                <main className="xl:col-span-6 flex flex-col gap-space-md">
                  {/* Feed Channel Header */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-mono font-bold text-lg">
                        #
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h2 className="font-headline-sm text-headline-sm text-on-surface">chemistry-lab-reports</h2>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px]">
                            Sprint Mode
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Focus: Zumdahl Ch. 12 Kinetics & Arrhenius Derivations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      {/* Whiteboard preview link */}
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-colors">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>Live Sync</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                        title="Channel options"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </div>
                  </div>
                  {/* Feed Stream Container */}
                  <div className="flex flex-col gap-space-md scrollbar-subtle">
                    {/* Day Divider */}
                    <div className="flex items-center gap-space-md my-1">
                      <div className="flex-grow h-px bg-surface-container" />
                      <span className="font-label-sm text-label-sm text-outline px-space-sm py-0.5 rounded-full bg-surface-container-low">
                        Today • Kinetics Deep Dive
                      </span>
                      <div className="flex-grow h-px bg-surface-container" />
                    </div>
                    {/* Chat Bubble: Marcus T. */}
                    <div className="flex items-start gap-space-sm group">
                      <img
                        className="w-9 h-9 rounded-full object-cover mt-0.5"
                        data-alt="Close-up avatar of a focused high school student in classroom setting wearing glasses"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeaJ3BNlC4YgHDwn-T3TAxGM_pEc4XNl3s4vgF2seDIPYyJ6zDjyHgpiDBt_abM4xiUb7RmhSSwlq9pDVHmXhC5nPmJAQBy0FQNAPkvu4gf2xmdDRurxie6VnXCJiLNk_Bhfo-HQQTn62dXs8kJKo_0dWWwYOjo_nQI3Devv7cAI0rz-X2oGt5yvioeJIIX6URyjZinV1cNF0uf-op-4VMIC4iUmUxVY1QHWgDoZctDVw617vr526HrA"
                      />
                      <div className="flex flex-col gap-1 max-w-[90%]">
                        <div className="flex items-center gap-2">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">Marcus T.</span>
                          <span className="font-label-sm text-label-sm text-outline">3:42 PM</span>
                          <span className="px-1.5 py-0.2 rounded bg-surface-container font-label-sm text-[10px] text-on-surface-variant">
                            Lab Lead
                          </span>
                        </div>
                        <div className="p-space-md rounded-xl rounded-tl-none bg-surface-container-lowest shadow-sm text-on-surface font-body-md text-body-md flex flex-col gap-space-sm">
                          <p>
                            Hey team, I'm stuck on problem 42 in Zumdahl Chapter 12. If the initial rate doubles when
                            $[NO]$ quadruples, but it's second-order overall with respect to $[H_2]$, does that make the
                            overall reaction 3rd order? The algebra isn't clicking for the differential rate law.
                          </p>
                          {/* Embedded Reaction Formula Card */}
                          <div className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-2">
                            <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                              <span className="font-mono uppercase font-bold text-primary">Reaction Equation 12.4</span>
                              <span className="material-symbols-outlined text-[16px] text-outline">science</span>
                            </div>
                            <div className="font-mono text-sm sm:text-base text-on-surface font-bold bg-surface-container-lowest p-2 rounded text-center tracking-wider">
                              2 NO (g) + 2 H₂(g) → N₂(g) + 2 H₂O (g)
                            </div>
                            <div className="font-mono text-xs text-on-surface-variant text-center">
                              Rate = k [NO]ᵐ [H₂]ⁿ  |  Given: Rate quadruples when [H₂] doubles ⇒ n = 2
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Chat Bubble: Priya S. (Peer Solution & Live Canvas Snippet) */}
                    <div className="flex items-start gap-space-sm group">
                      <img
                        className="w-9 h-9 rounded-full object-cover mt-0.5"
                        data-alt="Portrait of Priya student with warm smile writing on digital notepad in study session"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFQI6VAPLI_zOb2UMkEzg-kgcXS7rt3RPkEFpv1Djb8XVBAZUuunoTWxcG2tKNWEokfu6dRpfrvpXn58q0Bx4TzpNxawiEEn145ptQ8yl-32m9ZFDHznZ2BOs3LpgWwuwxz-ZP89UccdnNsKRJ5ZAhTvHKraPMpN3_bcmzdbECLgzKZgdqE9EGpsKvQGj6RsyFrEa3s1SlsoL8lajCq5N0NuToczl68VKb_UoyigimJe5Jw3O0CfscUQ"
                      />
                      <div className="flex flex-col gap-1 max-w-[90%]">
                        <div className="flex items-center gap-2">
                          <span className="font-label-lg text-label-lg text-on-surface font-bold">Priya S.</span>
                          <span className="font-label-sm text-label-sm text-outline">3:45 PM</span>
                        </div>
                        <div className="p-space-md rounded-xl rounded-tl-none bg-surface-container-lowest shadow-sm text-on-surface font-body-md text-body-md flex flex-col gap-space-sm">
                          <p>
                            Check the scratchpad! If doubling $[NO]$ causes rate to scale by $\sqrt{4}$, it implies order
                            $m = 1/2$ or Marcus you might have misread the initial table trial 2 vs trial 3. Look at my
                            scratch derivation below:
                          </p>
                          {/* Synchronized Canvas Card Snippet */}
                          <div className="rounded-xl overflow-hidden bg-surface-container">
                            <div className="px-space-md py-2 bg-surface-container-high flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[18px]">gesture</span>
                                <span className="font-label-md text-label-md text-on-surface font-semibold">
                                  Shared Canvas Snippet #Kinetics-Scratch-3
                                </span>
                              </div>
                              <span className="font-label-sm text-[11px] px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                                Sync Active
                              </span>
                            </div>
                            <div className="p-space-md bg-surface-container-lowest flex flex-col gap-2">
                              {/* Visual Formula Graphic */}
                              <div className="relative w-full h-24 bg-surface-container-low rounded-lg p-3 flex items-center justify-center overflow-hidden">
                                <svg className="w-full h-full text-on-surface font-mono" viewBox="0 0 400 80">
                                  {/* Curve sketch representation */}
                                  <path
                                    className="text-primary"
                                    d="M 20 70 Q 120 65, 200 40 T 380 15"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                  />
                                  <line
                                    className="text-outline-variant"
                                    stroke="currentColor"
                                    strokeDasharray="4"
                                    strokeWidth="1"
                                    x1="20"
                                    x2="380"
                                    y1="70"
                                    y2="70"
                                  />
                                  <line
                                    className="text-outline-variant"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    x1="20"
                                    x2="20"
                                    y1="10"
                                    y2="70"
                                  />
                                  <text className="text-xs font-bold text-primary" fill="currentColor" x="30" y="25">
                                    ln[A] vs t (Straight Line ⇒ 1st Order)
                                  </text>
                                  <text className="text-xs text-on-surface-variant" fill="currentColor" x="210" y="60">
                                    Slope = -k
                                  </text>
                                </svg>
                              </div>
                              <div className="flex items-center justify-between pt-1">
                                <span className="font-label-sm text-label-sm text-on-surface-variant">
                                  Priya • modified 2m ago
                                </span>
                                <button className="px-3 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed font-label-md text-label-md hover:bg-primary-container hover:text-on-primary transition-colors flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                                  Open Live Canvas
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* AI Co-Pilot Message: @PulseAI In Group Mode */}
                    <div className="flex items-start gap-space-sm pl-1">
                      <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-md flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">psychology</span>
                      </div>
                      <div className="flex flex-col gap-1 max-w-[95%]">
                        <div className="flex items-center gap-2">
                          <span className="font-headline-sm text-headline-sm text-primary font-bold">
                            PulseAI Group Co-Pilot
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] font-bold">
                            CHEMISTRY AI AGENT
                          </span>
                          <span className="font-label-sm text-label-sm text-outline">3:46 PM</span>
                        </div>
                        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-md">
                          <div className="flex items-center justify-between pb-1">
                            <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
                              Responding to @Marcus & @Priya on Zumdahl Ch. 12 Problem 42
                            </span>
                            <span className="font-label-sm text-label-sm text-outline">Calculated in 0.4s</span>
                          </div>
                          <p className="font-body-md text-body-md text-on-surface">
                            Spot on, Priya! Marcus, in Trial 2 vs Trial 3 of that specific exercise, temperature is held
                            constant at <strong>300 K</strong>. Here is the verified differential rate relationship:
                          </p>
                          {/* Derivation Highlight Box */}
                          <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-2">
                            <div className="font-mono text-sm text-primary font-bold">
                              Differential Form: -d[NO]/dt = k • [NO]² • [H₂]¹
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              • Order with respect to $NO$ is <strong>2 (Second-order)</strong>.<br />
                              • Order with respect to $H_2$ is <strong>1 (First-order)</strong>.<br />•{" "}
                              <strong>Overall reaction order: 2 + 1 = 3 (Third-order)</strong>. The units for the rate
                              constant $k$ will therefore be <strong>L² • mol⁻² • s⁻¹</strong>.
                            </p>
                          </div>
                          {/* Quick Quiz Interaction Card for the squad */}
                          <div className="bg-surface-container-lowest p-space-sm rounded-xl flex items-center justify-between gap-space-sm">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-tertiary text-[20px]">quiz</span>
                              <div>
                                <div className="font-label-md text-label-md text-on-surface font-semibold">
                                  Instant Squad Check
                                </div>
                                <div className="font-body-sm text-body-sm text-on-surface-variant">
                                  What happens to the rate if $[NO]$ is halved and $[H_2]$ is quadrupled?
                                </div>
                              </div>
                            </div>
                            <button className="px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex-shrink-0">
                              Solve as Squad
                            </button>
                          </div>
                          {/* Prompt Action Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-primary-fixed text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px] text-primary">summarize</span>
                              Summarize today's thread
                            </button>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-primary-fixed text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px] text-primary">quiz</span>
                              Generate 3 quiz questions
                            </button>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-primary-fixed text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px] text-primary">verified</span>
                              Check lab report citation
                            </button>
                            <button className="px-2.5 py-1 rounded-full bg-surface-container-lowest hover:bg-primary-fixed text-on-surface font-label-sm text-label-sm transition-colors flex items-center gap-1">
                              <span className="material-symbols-outlined text-[13px] text-primary">child_care</span>
                              Explain like I'm 15
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Chat Bubble: Amina K. (User) */}
                    <div className="flex items-start gap-space-sm justify-end group">
                      <div className="flex flex-col gap-1 items-end max-w-[85%]">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-label-sm text-outline">Just now</span>
                          <span className="font-label-lg text-label-lg text-primary font-bold">Amina K. (You)</span>
                        </div>
                        <div className="p-space-md rounded-xl rounded-tr-none bg-primary text-on-primary shadow-sm font-body-md text-body-md">
                          <p>
                            Awesome! That clears up our Table 3 discrepancy. I am updating Section 4.2 of our Google Doc
                            right now with these rate units.
                          </p>
                        </div>
                      </div>
                      <img
                        className="w-9 h-9 rounded-full object-cover mt-0.5 ring-2 ring-primary"
                        data-alt="High school student Amina sitting with laptop and notebook studying chemistry"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzOwo8Vv7487jkWbZIitcuWC-UFA_XaxZzQI0tQPalK-KOZA02LqQj4RjCW28mk9tVa20cSdmlIGsF9-yqSfAfMGOPK7Wc2tS8ed65_JeFLST1vWfpnU9j4rzXQhrurCbHswozQc_is2V5feBpPOlbcxqAQBP5GYhNMLEhpoNyQFqrHcjpaQ_LJ6Nipg0eCRxXN96CGXw-LpHA1-oVJ08IMdEOTi7c9Erkzgg7WXLTT3Uy5bxy3PeI9A"
                      />
                    </div>
                  </div>
                  {/* Rich Interactive Input Bar */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex flex-col gap-space-xs mt-auto">
                    {/* Floating attachment or prompt shortcut preview */}
                    <div className="flex items-center justify-between px-2 pt-1">
                      <div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
                        <span className="flex items-center gap-1 text-primary font-semibold">
                          <span className="material-symbols-outlined text-[14px]">alternate_email</span> PulseAI
                        </span>
                        <span>is active & reading channel context</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-outline">Press Shift + Enter for newline</span>
                    </div>
                    {/* Text input field */}
                    <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-low rounded-xl">
                      <input
                        className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md outline-none py-1.5"
                        placeholder="Message #chemistry-lab-reports or ask @PulseAI..."
                        type="text"
                      />
                      <div className="flex items-center gap-1">
                        {/* Snap Problem / Camera */}
                        <button
                          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                          title="Attach problem snapshot"
                        >
                          <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                        </button>
                        {/* LaTeX Formula Insertion */}
                        <button
                          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                          title="Insert LaTeX formula"
                        >
                          <span className="material-symbols-outlined text-[20px]">functions</span>
                        </button>
                        {/* Audio Memo */}
                        <button
                          className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors"
                          title="Record audio memo"
                        >
                          <span className="material-symbols-outlined text-[20px]">mic</span>
                        </button>
                        {/* AI Prompt Shortcut */}
                        <button
                          className="p-2 rounded-lg text-primary hover:bg-primary-fixed transition-colors"
                          title="Ask PulseAI"
                        >
                          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        </button>
                        {/* Send Button */}
                        <button className="p-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">send</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </main>

                {/* ========================================================================= */}
                {/* COLUMN C: WORKSPACE RESOURCES, LIVE CANVAS & GROUP MEMORY (Col-span 3)   */}
                {/* ========================================================================= */}
                <aside className="xl:col-span-3 flex flex-col gap-space-md">
                  {/* Live Group Whiteboard Mini-Preview Widget */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">draw</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Live Whiteboard</h3>
                      </div>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                        2 Editing
                      </span>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface font-semibold">
                      Activation Energy & Arrhenius Plot
                    </div>
                    {/* Interactive Canvas Miniature Viewport */}
                    <div className="relative w-full h-44 bg-surface-container-low rounded-xl overflow-hidden shadow-inner group cursor-crosshair">
                      {/* Canvas Grid lines pattern */}
                      <svg className="absolute inset-0 w-full h-full text-surface-container" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern height="16" id="grid" patternUnits="userSpaceOnUse" width="16">
                            <circle cx="2" cy="2" fill="currentColor" r="1" />
                          </pattern>
                        </defs>
                        <rect fill="url(#grid)" height="100%" width="100%" />
                      </svg>
                      {/* SVG Diagram: Arrhenius Activation Barrier */}
                      <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 280 140">
                        {/* Curve */}
                        <path
                          d="M 20 110 C 60 110, 80 40, 140 30 C 180 20, 200 120, 260 120"
                          fill="none"
                          stroke="#412dde"
                          strokeLinecap="round"
                          strokeWidth="3"
                        />
                        {/* Activation Peak Marker */}
                        <circle cx="140" cy="30" fill="#005e40" r="5" />
                        {/* Transition state dotted line */}
                        <line
                          stroke="#777587"
                          strokeDasharray="3,3"
                          strokeWidth="1.5"
                          x1="140"
                          x2="140"
                          y1="30"
                          y2="110"
                        />
                        {/* Delta H label */}
                        <text className="text-[10px] font-mono font-bold" fill="#0b1c30" x="148" y="70">
                          Eₐ = +58 kJ
                        </text>
                        <text className="text-[9px] font-sans" fill="#464556" x="25" y="105">
                          Reactants
                        </text>
                        <text className="text-[9px] font-sans" fill="#464556" x="220" y="115">
                          Products
                        </text>
                      </svg>
                      {/* Simulated Live Collaborator Cursors */}
                      <div className="absolute top-8 left-16 flex items-center gap-1 pointer-events-none transition-all duration-300">
                        <span className="material-symbols-outlined text-primary text-[16px]">near_me</span>
                        <span className="px-1.5 py-0.5 rounded bg-primary text-on-primary font-label-sm text-[9px] shadow-sm">
                          Priya S.
                        </span>
                      </div>
                      <div className="absolute bottom-6 right-10 flex items-center gap-1 pointer-events-none transition-all duration-300">
                        <span className="material-symbols-outlined text-tertiary text-[16px]">near_me</span>
                        <span className="px-1.5 py-0.5 rounded bg-tertiary text-on-tertiary font-label-sm text-[9px] shadow-sm">
                          David L.
                        </span>
                      </div>
                      {/* Overlay Hover Action */}
                      <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-bold shadow-lg flex items-center gap-1.5 hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[16px]">fullscreen</span>
                          Maximize Canvas
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1">
                      <span>Auto-saving to cloud</span>
                      <span className="font-mono text-outline font-medium">v4.12</span>
                    </div>
                  </div>
                  {/* Shared Assignment Locker / Vault */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">folder_shared</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Shared Locker</h3>
                      </div>
                      <button className="font-label-sm text-label-sm text-primary hover:underline font-bold">
                        + Upload
                      </button>
                    </div>
                    <div className="space-y-2">
                      {/* File 1: PDF */}
                      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                              Zumdahl_Ch12_Annotated.pdf
                            </span>
                            <span className="font-body-sm text-[11px] text-on-surface-variant">
                              Updated 20m ago by Priya
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">
                          download
                        </span>
                      </div>
                      {/* File 2: Image / Cheatsheet */}
                      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[18px]">image</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                              Thermodynamics_Summary.png
                            </span>
                            <span className="font-body-sm text-[11px] text-on-surface-variant">
                              Yesterday by Marcus • 4.2 MB
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">
                          download
                        </span>
                      </div>
                      {/* File 3: Formatted Sheet */}
                      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors group cursor-pointer">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[18px]">table_chart</span>
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                              AP_Kinetics_Master_Sheet.xlsx
                            </span>
                            <span className="font-body-sm text-[11px] text-on-surface-variant">
                              Shared 3d ago by David
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">
                          download
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Group AI Knowledge Base / "Group Memory" */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">neurology</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">Squad Memory</h3>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[16px]">info</span>
                    </div>
                    {/* AI Diagnostic Box */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-error text-[18px] mt-0.5">warning</span>
                        <div>
                          <div className="font-label-md text-label-md text-on-surface font-bold">
                            Identified Squad Blocker
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            Arrhenius half-life derivations & pseudo-first-order rate graphs. Squad test accuracy is
                            currently at <strong>68%</strong>.
                          </p>
                        </div>
                      </div>
                      {/* Quick Drill CTA Button */}
                      <button className="w-full py-2 px-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-sm mt-1">
                        <span className="material-symbols-outlined text-[16px]">bolt</span>
                        Trigger 15-min Flashcard Drill
                      </button>
                    </div>
                    {/* Squad Knowledge Mastery Gauge */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-on-surface-variant">AP Chem Unit 5 Readiness</span>
                        <span className="font-bold text-primary">82%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "82%" }} />
                      </div>
                    </div>
                  </div>
                  {/* Amina Quick Profile & Group Settings Bar */}
                  <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img
                          className="w-8 h-8 rounded-full object-cover"
                          data-alt="Amina K high school student avatar close up thumbnail with smile"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8BDTo5mlte059iFvvOx6Q6jXEwz1tBbPc_gAsSSNESCaiytKhv9Iy-UZPtZAhsJTUlxd4VZQh0d5DoWsrOy7jJBTeyK9gS_0Np_Yed28VBq6JtW43vKzwkPmdBjBCCSRst1EuUCDhhsvayk1ywoYcSvOw2g13G8OfNLSV1ELk-rKgo8rpv1v5kQcr25kOCKWs-l70INZlK52TIYksya3G9fcG5gCanZDfa2I9DLC-mtPUXQzmJvjEKA"
                        />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-tertiary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                          Amina K.
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                          Co-Moderator
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                        title="Audio Mute Toggle"
                      >
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                        title="Deafen / Headphones"
                      >
                        <span className="material-symbols-outlined text-[18px]">headphones</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
                        title="Group Settings"
                      >
                        <span className="material-symbols-outlined text-[18px]">settings</span>
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
