import { useEffect, useRef, useState } from "react";

const THEME_CARD_ACTIVE =
  "theme-card cursor-pointer p-space-md rounded-xl bg-surface-container-low ring-2 ring-primary transition-all flex flex-col gap-space-sm relative";
const THEME_CARD_INACTIVE =
  "theme-card cursor-pointer p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low ring-1 ring-outline-variant transition-all flex flex-col gap-space-sm relative";

const SETTINGS_NAV_BASE =
  "settings-nav-item flex items-center gap-space-sm px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-all";
const SETTINGS_NAV_ACTIVE = `${SETTINGS_NAV_BASE} bg-primary-container text-on-primary shadow-sm`;
const SETTINGS_NAV_INACTIVE = `${SETTINGS_NAV_BASE} text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface`;

const FONT_SIZE_LABELS: Record<string, string> = {
  "1": "Small (13px)",
  "2": "Standard (15px)",
  "3": "Large (18px)",
  "4": "Extra Large (22px)"
};

function ToggleSwitch({ defaultPressed = false }: { defaultPressed?: boolean }) {
  const [pressed, setPressed] = useState(defaultPressed);

  return (
    <button
      aria-pressed={pressed}
      className={`w-12 h-7 rounded-full relative p-0.5 transition-colors focus:outline-none shrink-0 ${
        pressed ? "bg-primary-container" : "bg-surface-container-high"
      }`}
      onClick={() => setPressed((p) => !p)}
      type="button"
    >
      <span
        className={`w-6 h-6 rounded-full shadow-sm block transition-transform ${
          pressed ? "bg-on-primary translate-x-5" : "bg-surface-container-lowest"
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [fontSize, setFontSize] = useState("2");
  const [toastVisible, setToastVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("section-profile");
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    function onScroll() {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
      let currentSectionId = "";

      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          currentSectionId = sec.getAttribute("id") || "";
        }
      });

      if (currentSectionId) {
        setActiveSection(currentSectionId);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(toastTimer.current);
  }, []);

  const triggerSave = () => {
    setToastVisible(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 3500);
  };

  const dismissToast = () => {
    window.clearTimeout(toastTimer.current);
    setToastVisible(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Feedback Notification */}
      <div
        className={`fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-xl ${
          toastVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
        }`}
        id="saveToast"
      >
        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">check_circle</span>
        <span className="font-label-lg text-label-lg">Preferences saved successfully</span>
        <button
          className="ml-space-md text-outline-variant hover:text-inverse-on-surface"
          onClick={dismissToast}
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-space-md lg:px-space-xl py-space-lg flex flex-col gap-space-lg">
        {/* Breadcrumbs & Meta Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span>StudyPulse</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Amina K.</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-label-lg text-label-lg">Account Settings & Preferences</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-label-sm text-label-sm text-tertiary tracking-wide uppercase">
              All systems synchronized • SSL Secured
            </span>
          </div>
        </div>

        {/* Header Block with Actions */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-xs">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Settings & Preferences
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Manage your academic profile, visual preferences, AI data privacy ethics, linked school accounts,
              and group visibility.
            </p>
          </div>
          <div className="flex items-center gap-space-sm self-start lg:self-auto shrink-0">
            <button
              className="px-space-lg h-11 rounded-lg font-label-lg text-label-lg text-secondary hover:bg-surface-container transition-colors"
              type="button"
            >
              Discard Changes
            </button>
            <button
              className="px-space-lg h-11 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs shadow-[0_4px_14px_rgba(91,77,246,0.3)] hover:shadow-[0_6px_20px_rgba(91,77,246,0.45)] active:scale-[0.98] transition-all"
              onClick={triggerSave}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Save Preferences</span>
            </button>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Navigation Quick Links */}
          <div className="lg:col-span-3 lg:sticky lg:top-20 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-1">
              <a
                className={activeSection === "section-profile" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE}
                data-target="section-profile"
                href="#section-profile"
              >
                <span className="material-symbols-outlined text-[18px]">badge</span>
                <span className="truncate">Profile & Student ID</span>
              </a>
              <a
                className={activeSection === "section-appearance" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE}
                data-target="section-appearance"
                href="#section-appearance"
              >
                <span className="material-symbols-outlined text-[18px]">palette</span>
                <span className="truncate">Appearance & Accessibility</span>
              </a>
              <a
                className={activeSection === "section-privacy" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE}
                data-target="section-privacy"
                href="#section-privacy"
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span className="truncate">Data Privacy & AI Ethics</span>
              </a>
              <a
                className={activeSection === "section-security" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE}
                data-target="section-security"
                href="#section-security"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span className="truncate">Password & Security</span>
              </a>
              <a
                className={activeSection === "section-connected" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE}
                data-target="section-connected"
                href="#section-connected"
              >
                <span className="material-symbols-outlined text-[18px]">link</span>
                <span className="truncate">Connected Accounts</span>
              </a>
              <a
                className={activeSection === "section-collab" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE}
                data-target="section-collab"
                href="#section-collab"
              >
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span className="truncate">Squad & Visibility</span>
              </a>
              <a
                className={
                  activeSection === "section-notifications" ? SETTINGS_NAV_ACTIVE : SETTINGS_NAV_INACTIVE
                }
                data-target="section-notifications"
                href="#section-notifications"
              >
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                <span className="truncate">Study Reminders</span>
              </a>
            </div>
            {/* Academic Snapshot Card */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Sync Integrity
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary bg-surface-container-lowest px-space-xs py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> 100%
                </span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-full" />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                4 of 4 academic tracks synchronized with Westview High LMS.
              </p>
            </div>
          </div>

          {/* Right Column: Settings Sections */}
          <div className="lg:col-span-9 flex flex-col gap-space-xl">
            {/* Section 1: Profile & Student Identity */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-profile"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">badge</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Profile & Student Identity
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Your verified academic record visible to instructors and study squad members.
                    </p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-space-sm py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                  SSO Synced
                </span>
              </div>
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center gap-space-lg p-space-md bg-surface-container-low rounded-xl">
                <div className="relative shrink-0">
                  <img
                    alt="Amina K."
                    className="w-24 h-24 rounded-full object-cover shadow-sm ring-4 ring-surface-container-lowest"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1WiLZoSrMfpzgLJADed8EW3wQi0kyqpx88LkR3KT0adqybtAUGBkckwWAC4TFH1LhDz0IovsoQt3o24HrFtyBk8AsU6yv9sTjs721fOqfSXypoSOiGinnmbKEj9ssmh4edlA_-gpF-F2cSqBgAm2WOhztzzF290ldy4sPG2aCOAvj7Nu3zECcyigGcJgG_fpTmehN_I8Mj-iwB2YfWgwspER4MXFSPek7RwOayx3mzOPQWi0u-v-SDQevOE"
                  />
                  <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-[14px]">school</span>
                  </span>
                </div>
                <div className="flex flex-col gap-space-xs text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-space-sm">
                    <button
                      className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-colors"
                      type="button"
                    >
                      Upload New Photo
                    </button>
                    <button
                      className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-error font-label-md text-label-md hover:bg-error-container transition-colors"
                      type="button"
                    >
                      Remove Photo
                    </button>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline">
                    Recommended: 400x400px JPG or PNG. Institutional avatar auto-updates upon request.
                  </span>
                </div>
              </div>
              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">Full Student Name</label>
                  <input
                    className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    defaultValue="Amina K."
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface">Academic Email</label>
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Verified
                    </span>
                  </div>
                  <input
                    className="h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface-variant font-body-md text-body-md border-0 focus:outline-none cursor-not-allowed"
                    defaultValue="amina.k@westviewprep.edu"
                    readOnly
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">Academic Grade</label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-space-md pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary focus:outline-none transition-shadow appearance-none"
                      defaultValue="Grade 11 (Junior Year)"
                    >
                      <option>Grade 11 (Junior Year)</option>
                      <option>Grade 10 (Sophomore Year)</option>
                      <option>Grade 12 (Senior Year)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">Academic Stream / Track</label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-space-md pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary focus:outline-none transition-shadow appearance-none"
                      defaultValue="Natural Sciences (STEM & Pre-Med Track)"
                    >
                      <option>Natural Sciences (STEM & Pre-Med Track)</option>
                      <option>Pure Mathematics & Computation</option>
                      <option>Humanities & Social Sciences</option>
                      <option>International Baccalaureate Diploma</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs md:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface">
                    School / Registered Institution
                  </label>
                  <div className="flex items-center justify-between h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[18px] text-primary">account_balance</span>
                      <span>Westview High & STEM Academy</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Managed by District 4 SSO
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-space-xs md:col-span-2">
                  <label className="font-label-md text-label-md text-on-surface">
                    Active Target Exams & Milestones
                  </label>
                  <div className="flex flex-wrap items-center gap-space-xs p-space-sm rounded-lg bg-surface-container-low min-h-[48px]">
                    <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm">
                      <span>AP Chemistry (May 2025)</span>
                      <button className="hover:text-error transition-colors" type="button">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm">
                      <span>AP Calculus BC (May 2025)</span>
                      <button className="hover:text-error transition-colors" type="button">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm">
                      <span>SAT Math Prep</span>
                      <button className="hover:text-error transition-colors" type="button">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                    <button
                      className="inline-flex items-center gap-1 px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Add Exam</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Appearance & Accessibility Preferences */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-appearance"
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">palette</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Appearance & Accessibility Preferences
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tailor legibility, sensory load, and reading rhythm for long-haul study sessions.
                  </p>
                </div>
              </div>
              {/* Theme Selection Cards */}
              <div className="flex flex-col gap-space-sm">
                <label className="font-label-md text-label-md text-on-surface">Interface Theme Mode</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                  {/* Light Theme Card */}
                  <div
                    className={theme === "light" ? THEME_CARD_ACTIVE : THEME_CARD_INACTIVE}
                    onClick={() => setTheme("light")}
                  >
                    <div className="h-20 w-full rounded-lg bg-background p-2 flex flex-col gap-1.5 inset-shadow-2xs">
                      <div className="h-3 w-1/3 bg-primary-container rounded" />
                      <div className="h-2 w-full bg-surface-container-high rounded" />
                      <div className="h-2 w-2/3 bg-surface-container rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-on-surface">Light Theme</span>
                      <span
                        className={`material-symbols-outlined text-[20px] check-icon ${
                          theme === "light" ? "text-primary" : "text-outline-variant"
                        }`}
                      >
                        {theme === "light" ? "check_circle" : "radio_button_unchecked"}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Recommended for daytime library & classroom study.
                    </span>
                  </div>
                  {/* Dark Charcoal Mode */}
                  <div
                    className={theme === "dark" ? THEME_CARD_ACTIVE : THEME_CARD_INACTIVE}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="h-20 w-full rounded-lg bg-inverse-surface p-2 flex flex-col gap-1.5 inset-shadow-2xs">
                      <div className="h-3 w-1/3 bg-primary-fixed-dim rounded" />
                      <div className="h-2 w-full bg-secondary rounded" />
                      <div className="h-2 w-2/3 bg-secondary rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-on-surface">Dark Charcoal</span>
                      <span
                        className={`material-symbols-outlined text-[20px] check-icon ${
                          theme === "dark" ? "text-primary" : "text-outline-variant"
                        }`}
                      >
                        {theme === "dark" ? "check_circle" : "radio_button_unchecked"}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Reduces glare during late-night exam prep sprints.
                    </span>
                  </div>
                  {/* System Default Card */}
                  <div
                    className={theme === "system" ? THEME_CARD_ACTIVE : THEME_CARD_INACTIVE}
                    onClick={() => setTheme("system")}
                  >
                    <div className="h-20 w-full rounded-lg bg-linear-to-r from-background to-inverse-surface p-2 flex flex-col gap-1.5 inset-shadow-2xs">
                      <div className="h-3 w-1/3 bg-primary-container rounded" />
                      <div className="h-2 w-full bg-surface-container-high rounded" />
                      <div className="h-2 w-2/3 bg-surface-container rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-label-lg text-on-surface">System Default</span>
                      <span
                        className={`material-symbols-outlined text-[20px] check-icon ${
                          theme === "system" ? "text-primary" : "text-outline-variant"
                        }`}
                      >
                        {theme === "system" ? "check_circle" : "radio_button_unchecked"}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Automatically matches your OS circadian rhythm.
                    </span>
                  </div>
                </div>
              </div>
              {/* Font Scaling & Accessibility Toggles */}
              <div className="flex flex-col gap-space-md pt-space-xs">
                <div className="p-space-md bg-surface-container-low rounded-xl flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Reading & Diagram Font Scale
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Adjust textbook summaries and past paper rendering sizes.
                      </p>
                    </div>
                    <span className="px-space-md py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm">
                      {FONT_SIZE_LABELS[fontSize] || "Standard (15px)"}
                    </span>
                  </div>
                  {/* Stepped Slider */}
                  <div className="flex flex-col gap-space-xs">
                    <input
                      className="w-full accent-primary cursor-pointer h-2 bg-surface-container-high rounded-full"
                      max="4"
                      min="1"
                      onChange={(e) => setFontSize(e.target.value)}
                      type="range"
                      value={fontSize}
                    />
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant px-1">
                      <span>Small (13px)</span>
                      <span className="text-primary font-semibold">Standard (15px)</span>
                      <span>Large (18px)</span>
                      <span>Extra Large (22px)</span>
                    </div>
                  </div>
                </div>
                {/* Toggles List */}
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex flex-col pr-space-md">
                      <span className="font-label-lg text-label-lg text-on-surface">OpenDyslexic Font Mode</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Weights letter bottoms to prevent rotation and inversion during heavy textbook reading.
                      </span>
                    </div>
                    <ToggleSwitch />
                  </div>
                  <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex flex-col pr-space-md">
                      <span className="font-label-lg text-label-lg text-on-surface">
                        High Contrast Formula & Graph Rendering
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Increases line-weight and stroke vibrancy on chemical structures, integrals, and
                        coordinate planes.
                      </span>
                    </div>
                    <ToggleSwitch defaultPressed />
                  </div>
                  <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex flex-col pr-space-md">
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Ambient Focus Beats & Audio Metronome
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Plays gentle 40Hz binaural frequencies during timed diagnostic tests to support deep
                        alpha-state focus.
                      </span>
                    </div>
                    <ToggleSwitch defaultPressed />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Data Privacy, Student Rights & AI Learning Ethics */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-privacy"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">verified_user</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Data Privacy, Student Rights & AI Ethics
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Full transparency over how your diagnostic performance trains your personal tutor.
                    </p>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm px-space-md py-1 rounded-full bg-secondary-container text-on-secondary-container font-semibold self-start sm:self-auto shrink-0">
                  FERPA & GDPR-K Compliant
                </span>
              </div>
              {/* Zero Model Retention Guarantee Callout */}
              <div className="p-space-md rounded-xl bg-primary-fixed/30 flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">
                    Zero Model Retention Guarantee
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Your private chat inquiries, uploaded handwritten notes, homework snapshots, and teacher
                    annotations are cryptographically sandboxed. They are never ingested into global public
                    foundation models or shared with commercial aggregators.
                  </p>
                </div>
              </div>
              {/* Adaptive Grounding Toggles */}
              <div className="flex flex-col gap-space-sm">
                <span className="font-label-md text-label-md text-on-surface tracking-wide uppercase">
                  Adaptive Personalization Controls
                </span>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Historical Exam Mistake Diagnosis
                      </span>
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                        Recommended
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Enables PulseAI to map mistake patterns across past papers to synthesize custom remedial
                      flashcards.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Contribute Anonymized Response Latencies
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Helps calibrate national difficulty curves for AP Chem and SAT math tests without exposing
                      identity.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
              </div>
              {/* Ingestion Permissions */}
              <div className="flex flex-col gap-space-sm">
                <span className="font-label-md text-label-md text-on-surface tracking-wide uppercase">
                  Connected App Ingestion Permissions
                </span>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Read Course Syllabi & Deadlines
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Import upcoming midterms and lab assignment dates from Canvas LMS automatically.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Push Mock Schedules to Google Calendar
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Add recommended 45-minute revision blocks directly onto your linked academic calendar.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      School District Public Leaderboard Broadcast
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Publish daily XP and streak positions to Westview High public hallway monitor displays.
                    </span>
                  </div>
                  <ToggleSwitch />
                </div>
              </div>
              {/* Data Autonomy Actions */}
              <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[24px]">folder_zip</span>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface">Export Your Data Archive</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Download all personal notes, question bank history, and mastery scores in JSON & PDF
                      format.
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                  <button
                    className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1 shadow-sm transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download Archive</span>
                  </button>
                  <button className="text-error hover:underline font-label-md text-label-md px-space-xs" type="button">
                    Request Diagnostic Purge
                  </button>
                </div>
              </div>
            </section>

            {/* Section 4: Password, Authentication & Device Security */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-security"
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Password & Authentication Security
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Protect exam drafts and synchronized school credentials.
                  </p>
                </div>
              </div>
              {/* Password Reset Sub-Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">Current Password</label>
                  <input
                    className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md ring-1 ring-outline-variant focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    defaultValue="••••••••••••"
                    type="password"
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">New Password</label>
                  <input
                    className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md ring-1 ring-outline-variant focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    placeholder="At least 8 characters"
                    type="password"
                  />
                </div>
                <div className="flex flex-col gap-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">Confirm New Password</label>
                  <input
                    className="h-11 px-space-md rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md ring-1 ring-outline-variant focus:ring-2 focus:ring-primary focus:outline-none transition-shadow"
                    placeholder="Repeat new password"
                    type="password"
                  />
                </div>
              </div>
              {/* Strength Meter */}
              <div className="flex flex-col gap-1.5 p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Password Strength Assessment</span>
                  <span className="text-tertiary font-bold">
                    Strong (Includes uppercase, symbols & digits)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                  <div className="bg-tertiary rounded-full" />
                  <div className="bg-tertiary rounded-full" />
                  <div className="bg-tertiary rounded-full" />
                  <div className="bg-tertiary rounded-full" />
                </div>
              </div>
              {/* Two-Factor Authentication Box */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[24px]">phonelink_lock</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Two-Factor Authentication (2FA)
                      </span>
                      <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                        Enabled
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Configured via Google Authenticator on iPhone 15 • Backup codes generated.
                    </span>
                  </div>
                </div>
                <button
                  className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md shrink-0 shadow-sm transition-colors"
                  type="button"
                >
                  Manage 2FA Keys
                </button>
              </div>
              {/* Active Devices Section */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface tracking-wide uppercase">
                    Active Student Devices & Sessions
                  </span>
                  <button className="text-error hover:underline font-label-sm text-label-sm" type="button">
                    Log Out of All Other Devices
                  </button>
                </div>
                <div className="divide-y divide-surface-container rounded-xl bg-surface-container-low overflow-hidden">
                  <div className="flex items-center justify-between p-space-md">
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-primary text-[28px]">laptop_mac</span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-xs">
                          <span className="font-label-lg text-label-lg text-on-surface">
                            MacBook Pro 14'' (macOS Sonoma)
                          </span>
                          <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
                            Current Device
                          </span>
                        </div>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          San Francisco, US • Chrome 124.0 • Active right now
                        </span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary" title="Active now" />
                  </div>
                  <div className="flex items-center justify-between p-space-md">
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-on-surface-variant text-[28px]">
                        tablet_mac
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          iPad Air 5th Gen (Study Lounge)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          San Francisco, US • StudyPulse iOS App 4.2 • 2 hours ago
                        </span>
                      </div>
                    </div>
                    <button
                      className="font-label-md text-label-md text-outline hover:text-error transition-colors"
                      type="button"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Connected Academic Accounts */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-connected"
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">link</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Connected Accounts & Course Tooling
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Bridges between your school LMS, note-taking hubs, and symbolic computation engines.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                {/* Google Workspace */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm text-[#4285F4]">
                        <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-label-lg text-on-surface">Google Workspace</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">
                          amina.k@westviewprep.edu
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                      Synced
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-body-sm text-body-sm text-outline">Last sync: 10 mins ago</span>
                    <button className="text-error hover:underline font-label-md text-label-md" type="button">
                      Disconnect
                    </button>
                  </div>
                </div>
                {/* Canvas LMS */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm text-[#E63946]">
                        <span className="material-symbols-outlined text-[24px]">school</span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-label-lg text-on-surface">Canvas LMS</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[180px]">
                          Westview Student Portal
                        </p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                      4 Courses
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-body-sm text-body-sm text-outline">Assignments auto-pulling</span>
                    <button className="text-primary hover:underline font-label-md text-label-md" type="button">
                      Configure
                    </button>
                  </div>
                </div>
                {/* Anki Flashcard Sync */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm text-primary">
                        <span className="material-symbols-outlined text-[24px]">style</span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-label-lg text-on-surface">Anki Sync Hub</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Auto .apkg export</p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-body-sm text-body-sm text-outline">1,240 cards synced</span>
                    <button className="text-primary hover:underline font-label-md text-label-md" type="button">
                      Sync Now
                    </button>
                  </div>
                </div>
                {/* Desmos & Wolfram */}
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm text-[#FF5A5F]">
                        <span className="material-symbols-outlined text-[24px]">calculate</span>
                      </div>
                      <div>
                        <h3 className="font-label-lg text-label-lg text-on-surface">Wolfram & Desmos</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Symbolic Solver API</p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-bold">
                      Ready
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-body-sm text-body-sm text-outline">
                      AP Calculus BC solver connected
                    </span>
                    <button className="text-error hover:underline font-label-md text-label-md" type="button">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Study Squad & Collaboration Visibility */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-collab"
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">group</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Study Squad & Collaboration Visibility
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Control real-time presence and peer interaction limits during intensive review cycles.
                  </p>
                </div>
              </div>
              {/* Radio Options for Study Presence */}
              <div className="flex flex-col gap-space-sm">
                <label className="font-label-md text-label-md text-on-surface">
                  Who can see when you are currently studying?
                </label>
                <div className="flex flex-col gap-space-xs">
                  <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <input
                        className="w-4 h-4 accent-primary"
                        defaultChecked
                        name="presence"
                        type="radio"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Everyone in My Study Squad
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Squad members can see active subject module and invite you to instant peer huddles.
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                  </label>
                  <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <input className="w-4 h-4 accent-primary" name="presence" type="radio" />
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Only Squad Co-Moderators
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Restricts live notifications to student leads organizing exam cram dates.
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[20px]">
                      admin_panel_settings
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                    <div className="flex items-center gap-space-sm">
                      <input className="w-4 h-4 accent-primary" name="presence" type="radio" />
                      <div className="flex flex-col">
                        <span className="font-label-lg text-label-lg text-on-surface">
                          Invisible (Deep Solo Study Mode)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          You appear offline to all peers, disabling incoming calls and real-time co-review
                          prompts.
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[20px]">visibility_off</span>
                  </label>
                </div>
              </div>
              {/* Squad Feature Toggles */}
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Live Whiteboard & Scratchpad Sharing
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Allows squad members to observe your calculus derivations on the shared infinite canvas.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Share Mock Test Diagnostic Scores with Squad
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Keep individual scores private; only aggregate cohort mastery percentiles are posted.
                    </span>
                  </div>
                  <ToggleSwitch />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                  <div className="flex flex-col pr-space-md">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Ghost Mode During Finals Sprint (Next 12 Days)
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Mutes peer ping notifications while keeping your 14-day study streak fully recorded.
                    </span>
                  </div>
                  <ToggleSwitch />
                </div>
              </div>
            </section>

            {/* Section 7: Notifications & Study Reminders */}
            <section
              className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-[0_2px_8px_-2px_rgba(15,26,52,0.04)] flex flex-col gap-space-lg scroll-mt-24"
              id="section-notifications"
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">notifications_active</span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Notifications & Study Reminders
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Customize push schedules, streak milestone alerts, and exam countdowns.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
                  <div className="flex flex-col pr-space-sm">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Daily Streak At-Risk Alerts
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Notifies you at 7:30 PM if you haven't reviewed daily flashcards yet.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
                  <div className="flex flex-col pr-space-sm">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Mock Exam Countdown Pings
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Alerts you at 7-day, 3-day, and 24-hour milestones before scheduled trials.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
                  <div className="flex flex-col pr-space-sm">
                    <span className="font-label-lg text-label-lg text-on-surface">Squad Huddle Invites</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Receive alerts when chemistry study group initiates a live voice room.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
                <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
                  <div className="flex flex-col pr-space-sm">
                    <span className="font-label-lg text-label-lg text-on-surface">
                      Weekly Performance Digest
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Summary email on Sunday mornings showing accuracy gains and review pace.
                    </span>
                  </div>
                  <ToggleSwitch defaultPressed />
                </div>
              </div>
            </section>

            {/* Bottom Page Action Sticky Bar on Mobile / Standard on Desktop */}
            <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-[18px] text-tertiary">check</span>
                <span>All local changes staged. Click save to apply network sync.</span>
              </div>
              <div className="flex items-center gap-space-sm">
                <button
                  className="px-space-md h-10 rounded-lg text-secondary hover:bg-surface-container font-label-md text-label-md transition-colors"
                  type="button"
                >
                  Reset to Defaults
                </button>
                <button
                  className="px-space-lg h-10 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-space-xs shadow-md transition-all"
                  onClick={triggerSave}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
