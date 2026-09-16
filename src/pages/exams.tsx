import { useEffect, useRef, useState } from "react";

const SUBJECTS: { label: string; value: string }[] = [
  { label: "All Subjects", value: "All" },
  { label: "Biology", value: "Biology" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Physics", value: "Physics" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "Economics", value: "Economics" },
  { label: "World History", value: "World History" }
];

const YEARS: { label: string; value: string }[] = [
  { label: "2024 (Latest)", value: "2024" },
  { label: "2023", value: "2023" },
  { label: "2022", value: "2022" },
  { label: "2021", value: "2021" },
  { label: "2020", value: "2020" },
  { label: "Archive (2015-19)", value: "Archive" }
];

const SUBJECT_CHIP_ACTIVE =
  "subject-chip px-space-md py-1.5 rounded-full font-label-md text-label-md bg-primary text-on-primary font-semibold transition-all";
const SUBJECT_CHIP_INACTIVE =
  "subject-chip px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:text-on-surface transition-all";

const YEAR_CHIP_ACTIVE =
  "year-chip px-space-sm py-1 rounded-md font-label-sm text-label-sm bg-primary-container text-on-primary font-semibold transition-all";
const YEAR_CHIP_INACTIVE =
  "year-chip px-space-sm py-1 rounded-md font-label-sm text-label-sm bg-surface-container-low text-on-surface hover:bg-surface-container transition-all";

const STREAM_ACTIVE =
  "px-space-sm py-1 rounded-md text-label-md font-label-md bg-surface-container-lowest text-on-surface shadow-xs font-semibold";
const STREAM_INACTIVE =
  "px-space-sm py-1 rounded-md text-label-md font-label-md text-on-surface-variant hover:text-on-surface";

const TAB_ACTIVE =
  "px-space-md py-2 rounded-lg font-label-lg text-label-lg bg-primary text-on-primary shadow-sm flex items-center gap-space-xs transition-all";
const TAB_INACTIVE =
  "px-space-md py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-low transition-all flex items-center gap-space-xs";

export default function Exams() {
  const [currentSubject, setCurrentSubject] = useState("All");
  const [currentYear, setCurrentYear] = useState("2024");
  const [currentStream, setCurrentStream] = useState("Natural Sciences");
  const [examType, setExamType] = useState("All");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"archive" | "diagnostics">("archive");
  const [visibleCount, setVisibleCount] = useState(6);
  const [highlightPanel, setHighlightPanel] = useState(false);
  const [practiceState, setPracticeState] = useState<"idle" | "generating" | "ready">("idle");
  const [modal, setModal] = useState({ open: false, title: "", duration: 0, count: 0 });

  const archiveRef = useRef<HTMLDivElement>(null);
  const diagnosticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".paper-card"));
    let count = 0;
    const term = search.toLowerCase();

    cards.forEach((card) => {
      const cardSubject = card.getAttribute("data-subject");
      const cardType = card.getAttribute("data-type");
      const cardText = card.innerText.toLowerCase();

      const matchSubject = currentSubject === "All" || cardSubject === currentSubject;
      const matchType = examType === "All" || cardType === examType;
      const matchSearch = !term || cardText.includes(term);

      if (matchSubject && matchType && matchSearch) {
        card.style.display = "flex";
        count++;
      } else {
        card.style.display = "none";
      }
    });

    setVisibleCount(count);
  }, [currentSubject, examType, search]);

  const switchMainTab = (tab: "archive" | "diagnostics") => {
    setActiveTab(tab);
    if (tab === "diagnostics") {
      diagnosticRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      archiveRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openSimulationModal = (title: string, duration: number, count: number) => {
    setModal({ open: true, title, duration, count });
  };

  const closeSimulationModal = () => {
    setModal((m) => ({ ...m, open: false }));
  };

  const launchSessionDirectly = () => {
    closeSimulationModal();
    alert("Mock Exam Initialized! Launching fullscreen exam environment with active timer...");
  };

  const openUntimedNotice = () => {
    alert(
      "Un-timed Mode started: Practice at your own pace with immediate solution explanations enabled after each question."
    );
  };

  const openReviewModal = (title: string, score: number) => {
    alert(
      `Opening Diagnostic Report for ${title}\nScore: ${score}/100\nClicking questions will expand step-by-step marker comments.`
    );
  };

  const resumeExamSession = (title: string, answered: number, total: number, timeLeft: number) => {
    alert(
      `Resuming ${title}\nState: ${answered}/${total} questions completed\nRemaining: ${timeLeft} minutes.`
    );
  };

  const scrollToMistakes = () => {
    const panel = diagnosticRef.current;
    if (!panel) return;
    panel.scrollIntoView({ behavior: "smooth" });
    setHighlightPanel(true);
    window.setTimeout(() => setHighlightPanel(false), 1500);
  };

  const generateTargetedPractice = () => {
    setPracticeState("generating");
    window.setTimeout(() => {
      setPracticeState("ready");
      alert(
        "Custom practice set compiled: 7 Reaction Mechanism drills, 5 Integral Calculus word problems, 3 Kirchhoff network tasks. Test ready in Lessons!"
      );
      window.setTimeout(() => setPracticeState("idle"), 3000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Interactive State Scripts & Top Container */}
      <div className="p-space-lg max-w-[1360px] mx-auto w-full space-y-space-lg">
        {/* Top Breadcrumb & Page Lead */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span className="hover:text-primary cursor-pointer transition-colors">StudyPulse</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Exams & Past Papers</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-label-sm font-label-sm">
              2024 Prep Hub
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
            <div className="space-y-1 max-w-2xl">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Past Year Exams & Mock Simulator
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Practice with official standardized papers from past years, timed simulation, and instant
                diagnostic scoring.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-lowest p-space-xs rounded-xl shadow-sm">
              <button
                className={activeTab === "archive" ? TAB_ACTIVE : TAB_INACTIVE}
                id="tab-archive"
                onClick={() => switchMainTab("archive")}
              >
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                <span>Paper Archive</span>
              </button>
              <button
                className={activeTab === "diagnostics" ? TAB_ACTIVE : TAB_INACTIVE}
                id="tab-diagnostics"
                onClick={() => switchMainTab("diagnostics")}
              >
                <span className="material-symbols-outlined text-[18px]">troubleshoot</span>
                <span>Diagnostic & Error Log</span>
                <span className="w-2 h-2 rounded-full bg-error" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Metric 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex items-center gap-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">library_books</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Library Volume
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">
                24 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">Papers</span>
              </p>
              <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                Official & Verified
              </span>
            </div>
          </div>
          {/* Metric 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex items-center gap-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary shrink-0">
              <span className="material-symbols-outlined text-[26px]">task_alt</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Completed
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">
                14 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">of 24 sets</span>
              </p>
              <div className="w-28 bg-surface-container h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: "58.3%" }} />
              </div>
            </div>
          </div>
          {/* Metric 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex items-center gap-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-fixed shrink-0">
              <span className="material-symbols-outlined text-[26px]">analytics</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Average Accuracy
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">86.4%</p>
              <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +3.2% vs baseline
              </span>
            </div>
          </div>
          {/* Metric 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md flex items-center gap-space-md shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-on-secondary-fixed shrink-0">
              <span className="material-symbols-outlined text-[26px]">speed</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Completion Speed
              </p>
              <p className="font-headline-md text-headline-md text-on-surface">+8 mins</p>
              <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                Under official time limit
              </span>
            </div>
          </div>
        </div>

        {/* Featured Mock Simulator Hero */}
        <div className="relative bg-inverse-surface rounded-2xl p-space-lg text-inverse-on-surface overflow-hidden shadow-xl">
          {/* Decorative Backdrop Graphic / Glow */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
          <div className="absolute right-12 bottom-0 opacity-10 pointer-events-none hidden xl:block">
            <span className="material-symbols-outlined text-[240px] leading-none">science</span>
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-8 space-y-space-md">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="px-space-sm py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  Featured Standardized Mock
                </span>
                <span className="px-space-sm py-1 rounded-full bg-surface-container-lowest/15 text-inverse-on-surface backdrop-blur-md font-label-sm text-label-sm">
                  Paper 1 & 2 Combined
                </span>
                <span className="px-space-sm py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" /> Difficulty: High
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="font-headline-lg text-headline-lg text-white tracking-tight">
                  2024 National Standardized Chemistry Exam
                </h2>
                <p className="font-body-md text-body-md text-slate-300 max-w-2xl">
                  Authentic simulation mimicking official scoring criteria, organic reaction pathways,
                  stoichiometry, and thermochemistry section timers. Includes step-by-step marking rubrics.
                </p>
              </div>
              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                <div className="flex items-center gap-space-xs bg-white/5 backdrop-blur-sm p-space-sm rounded-lg">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">timer</span>
                  <div>
                    <p className="font-label-xs text-[10px] text-slate-400 uppercase leading-none">Strict Timer</p>
                    <p className="font-label-md text-label-md text-white">120 Minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs bg-white/5 backdrop-blur-sm p-space-sm rounded-lg">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">quiz</span>
                  <div>
                    <p className="font-label-xs text-[10px] text-slate-400 uppercase leading-none">
                      Item Structure
                    </p>
                    <p className="font-label-md text-label-md text-white">85 Questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs bg-white/5 backdrop-blur-sm p-space-sm rounded-lg">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">auto_graph</span>
                  <div>
                    <p className="font-label-xs text-[10px] text-slate-400 uppercase leading-none">Analytics</p>
                    <p className="font-label-md text-label-md text-white">Live Diagnostic</p>
                  </div>
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <button
                  className="px-space-lg py-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-space-xs shadow-[0_4px_14px_rgba(91,77,246,0.45)]"
                  onClick={() =>
                    openSimulationModal("2024 National Standardized Chemistry Exam", 120, 85)
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">play_circle</span>
                  <span>Start Timed Simulation</span>
                </button>
                <button
                  className="px-space-md py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-label-lg text-label-lg transition-all flex items-center gap-space-xs"
                  onClick={openUntimedNotice}
                >
                  <span className="material-symbols-outlined text-[20px]">menu_book</span>
                  <span>Practice Un-timed Mode</span>
                </button>
                <button
                  className="px-space-md py-3 rounded-lg text-slate-300 hover:text-white font-label-lg text-label-lg transition-colors flex items-center gap-space-xs"
                  onClick={() =>
                    alert("Downloading official 2024 Chem Question Paper & Marking Scheme PDF...")
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
            {/* Right Side Preview Visual */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-xl p-space-md space-y-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-slate-300">Cohort Benchmarks</span>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-emerald-500/20 text-tertiary-fixed font-semibold">
                    Top 10% target: 82+
                  </span>
                </div>
                {/* Mini Visual SVG Distribution Chart */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-label-sm text-slate-300">
                    <span>Score Curve</span>
                    <span>Median: 67 pts</span>
                  </div>
                  <div className="h-20 w-full flex items-end justify-between gap-1 pt-2">
                    <div className="w-full bg-white/10 rounded-t h-[20%] hover:bg-primary transition-all" />
                    <div className="w-full bg-white/15 rounded-t h-[35%] hover:bg-primary transition-all" />
                    <div className="w-full bg-white/20 rounded-t h-[55%] hover:bg-primary transition-all" />
                    <div className="w-full bg-white/30 rounded-t h-[80%] hover:bg-primary transition-all" />
                    <div className="w-full bg-primary-container rounded-t h-[95%] relative group">
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-primary text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Amina Target
                      </div>
                    </div>
                    <div className="w-full bg-white/30 rounded-t h-[70%] hover:bg-primary transition-all" />
                    <div className="w-full bg-white/20 rounded-t h-[40%] hover:bg-primary transition-all" />
                    <div className="w-full bg-white/10 rounded-t h-[15%] hover:bg-primary transition-all" />
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">verified</span>{" "}
                    Syllabus v4.2
                  </span>
                  <span>1,840 Students Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Control & Search Section */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
          {/* Search + Category Switchers */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            {/* Subject Selector Chips */}
            <div
              className="flex items-center gap-space-xs overflow-x-auto pb-1 lg:pb-0 text-nowrap scrollbar-none"
              id="subject-filter-group"
            >
              {SUBJECTS.map((s) => (
                <button
                  className={currentSubject === s.value ? SUBJECT_CHIP_ACTIVE : SUBJECT_CHIP_INACTIVE}
                  key={s.value}
                  onClick={() => setCurrentSubject(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {/* Academic Stream Segment */}
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg shrink-0 self-start lg:self-auto">
              <button
                className={currentStream === "Natural Sciences" ? STREAM_ACTIVE : STREAM_INACTIVE}
                id="stream-natural"
                onClick={() => setCurrentStream("Natural Sciences")}
              >
                Natural Sciences
              </button>
              <button
                className={currentStream === "Social Sciences" ? STREAM_ACTIVE : STREAM_INACTIVE}
                id="stream-social"
                onClick={() => setCurrentStream("Social Sciences")}
              >
                Social Sciences
              </button>
            </div>
          </div>
          {/* Secondary Filters Row: Year selector, Exam Type & Text Search */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center pt-space-xs">
            {/* Year Pills */}
            <div
              className="md:col-span-6 flex items-center gap-space-xs overflow-x-auto text-nowrap pb-1 md:pb-0"
              id="year-filter-group"
            >
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline shrink-0 mr-1">
                Year:
              </span>
              {YEARS.map((y) => (
                <button
                  className={currentYear === y.value ? YEAR_CHIP_ACTIVE : YEAR_CHIP_INACTIVE}
                  key={y.value}
                  onClick={() => setCurrentYear(y.value)}
                >
                  {y.label}
                </button>
              ))}
            </div>
            {/* Exam Type Select & Search */}
            <div className="md:col-span-6 flex flex-col sm:flex-row items-center gap-space-sm justify-end">
              <div className="flex items-center gap-1 w-full sm:w-auto">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline shrink-0">
                  Type:
                </span>
                <select
                  className="w-full sm:w-48 bg-surface-container-low text-on-surface font-label-md text-label-md px-space-sm py-1.5 rounded-lg border-none focus:outline-primary cursor-pointer"
                  id="exam-type-filter"
                  onChange={(e) => setExamType(e.target.value)}
                  value={examType}
                >
                  <option value="All">All Types</option>
                  <option value="Official Final Exams">Official Final Exams</option>
                  <option value="Midterm Mocks">Midterm Mocks</option>
                  <option value="Diagnostic Assessments">Diagnostic Assessments</option>
                  <option value="Topic-specific Quizzes">Topic-specific Quizzes</option>
                </select>
              </div>
              <div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-lg gap-space-xs text-on-surface-variant w-full sm:w-56">
                <span className="material-symbols-outlined text-[18px]">filter_alt</span>
                <input
                  className="bg-transparent text-body-sm font-body-sm text-on-surface outline-none placeholder:text-outline w-full"
                  id="paper-search-input"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter current list..."
                  type="text"
                  value={search}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Grid vs Error Log Panel) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Left Column: Past Papers Grid (Spans 8 cols on xl) */}
          <div className="xl:col-span-8 space-y-space-md" id="archive-section" ref={archiveRef}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Available Standardized Papers
                </h3>
                <span
                  className="px-space-xs py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant"
                  id="result-counter"
                >
                  {visibleCount} Papers Shown
                </span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span>Sort by:</span>
                <button className="font-semibold text-primary flex items-center">
                  Recent Added <span className="material-symbols-outlined text-[14px]">expand_more</span>
                </button>
              </div>
            </div>
            {/* Papers Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md" id="paper-cards-container">
              {/* Card 1: Biology Completed */}
              <div
                className="paper-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                data-subject="Biology"
                data-type="Official Final Exams"
                data-year="2023"
              >
                {/* Top Accent Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary rounded-t-xl" />
                <div className="space-y-space-sm">
                  <div className="flex items-start justify-between gap-space-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">Taken Nov 12</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-tertiary font-semibold tracking-wide uppercase">
                      Biology • 2023
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                      2023 Biology Final Exam (Paper 1)
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      Cell biology, Mendelian genetics, ecological pyramids, and human organ homeostasis.
                    </p>
                  </div>
                  {/* Score Indicator Bar */}
                  <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Official Score</span>
                      <div className="font-headline-sm text-headline-sm text-tertiary">
                        92 <span className="text-body-sm text-on-surface-variant font-normal">/ 100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        Grade 1 equivalent
                      </span>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Top 5% Cohort</p>
                    </div>
                  </div>
                </div>
                <div className="pt-space-md mt-space-sm flex items-center gap-space-xs">
                  <button
                    className="flex-1 py-2 px-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1"
                    onClick={() => openReviewModal("2023 Biology Final Exam (Paper 1)", 92)}
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span> Review Solutions
                  </button>
                  <button
                    className="py-2 px-space-md rounded-lg text-primary hover:bg-primary-fixed transition-colors font-label-md text-label-md flex items-center gap-1"
                    onClick={() => openSimulationModal("2023 Biology Final Exam (Paper 1)", 90, 75)}
                  >
                    <span className="material-symbols-outlined text-[16px]">replay</span> Retake
                  </button>
                </div>
              </div>
              {/* Card 2: Math Completed */}
              <div
                className="paper-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                data-subject="Mathematics"
                data-type="Official Final Exams"
                data-year="2023"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary rounded-t-xl" />
                <div className="space-y-space-sm">
                  <div className="flex items-start justify-between gap-space-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">Taken Nov 5</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">
                      Mathematics • 2023
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                      2023 Mathematics Calculus & Algebra Paper
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      Definite integrals, trigonometric derivatives, matrix determinants, and vector projections.
                    </p>
                  </div>
                  {/* Score Indicator Bar */}
                  <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Official Score</span>
                      <div className="font-headline-sm text-headline-sm text-tertiary">
                        88 <span className="text-body-sm text-on-surface-variant font-normal">/ 100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-space-xs py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        Grade 1 equivalent
                      </span>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Top 12% Cohort</p>
                    </div>
                  </div>
                </div>
                <div className="pt-space-md mt-space-sm flex items-center gap-space-xs">
                  <button
                    className="flex-1 py-2 px-space-sm rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1"
                    onClick={() => openReviewModal("2023 Mathematics Calculus & Algebra Paper", 88)}
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span> Review Solutions
                  </button>
                  <button
                    className="py-2 px-space-md rounded-lg text-primary hover:bg-primary-fixed transition-colors font-label-md text-label-md flex items-center gap-1"
                    onClick={() => openSimulationModal("2023 Mathematics Calculus & Algebra Paper", 120, 60)}
                  >
                    <span className="material-symbols-outlined text-[16px]">replay</span> Retake
                  </button>
                </div>
              </div>
              {/* Card 3: Physics Incomplete / Paused */}
              <div
                className="paper-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                data-subject="Physics"
                data-type="Midterm Mocks"
                data-year="2023"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 rounded-t-xl" />
                <div className="space-y-space-sm">
                  <div className="flex items-start justify-between gap-space-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">pause_circle</span> In Progress /
                      Paused
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">35m left</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-amber-700 font-semibold tracking-wide uppercase">
                      Physics • 2023 Mock
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                      2023 Physics Mechanics & Thermodynamics
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      Rotational inertia, conservation of momentum, Carnot cycles, and entropy problems.
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="bg-surface-container-low p-space-sm rounded-lg space-y-1.5">
                    <div className="flex justify-between font-label-sm text-label-sm">
                      <span className="text-on-surface-variant">Answered: 45 of 75</span>
                      <span className="text-amber-700 font-semibold">60% Complete</span>
                    </div>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: "60%" }} />
                    </div>
                  </div>
                </div>
                <div className="pt-space-md mt-space-sm flex items-center gap-space-xs">
                  <button
                    className="w-full py-2.5 px-space-md rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-space-xs"
                    onClick={() => resumeExamSession("2023 Physics Mechanics", 45, 75, 35)}
                  >
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span> Resume Test (35m
                    left)
                  </button>
                </div>
              </div>
              {/* Card 4: Chemistry 2022 National Mock (Not started) */}
              <div
                className="paper-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                data-subject="Chemistry"
                data-type="Midterm Mocks"
                data-year="2022"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container rounded-t-xl" />
                <div className="space-y-space-sm">
                  <div className="flex items-start justify-between gap-space-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">circle</span> Not started
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">Est: 110 Mins</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">
                      Chemistry • 2022
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                      2022 Chemistry National Mock
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      Electrochemical cells, rate laws, equilibrium constants, and spectroscopy identification.
                    </p>
                  </div>
                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded">
                      Section A + B
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded">
                      80 Items
                    </span>
                    <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container font-label-sm text-label-sm rounded">
                      Official Marking Scheme
                    </span>
                  </div>
                </div>
                <div className="pt-space-md mt-space-sm flex items-center gap-space-xs">
                  <button
                    className="w-full py-2.5 px-space-md rounded-lg bg-primary hover:bg-primary/95 text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-space-xs"
                    onClick={() => openSimulationModal("2022 Chemistry National Mock", 110, 80)}
                  >
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span> Start Test
                  </button>
                </div>
              </div>
              {/* Card 5: Biology 2022 State Olympiad (Not started) */}
              <div
                className="paper-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                data-subject="Biology"
                data-type="Diagnostic Assessments"
                data-year="2022"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container rounded-t-xl" />
                <div className="space-y-space-sm">
                  <div className="flex items-start justify-between gap-space-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">circle</span> Not started
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">Est: 90 Mins</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-tertiary font-semibold tracking-wide uppercase">
                      Biology • 2022
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                      2022 Biology State Olympiad Paper
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      High-order conceptual questions on biotechnology, recombinant DNA, and phylogeny trees.
                    </p>
                  </div>
                  {/* Metadata Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded">
                      Advanced Tier
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm rounded">
                      60 Items
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-high text-on-secondary-fixed font-label-sm text-label-sm rounded">
                      Olympiad Prep
                    </span>
                  </div>
                </div>
                <div className="pt-space-md mt-space-sm flex items-center gap-space-xs">
                  <button
                    className="w-full py-2.5 px-space-md rounded-lg bg-primary hover:bg-primary/95 text-on-primary font-label-lg text-label-lg shadow-sm transition-all flex items-center justify-center gap-space-xs"
                    onClick={() => openSimulationModal("2022 Biology State Olympiad Paper", 90, 60)}
                  >
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span> Start Test
                  </button>
                </div>
              </div>
              {/* Card 6: Mathematics 2021 Completed Needs Review */}
              <div
                className="paper-card bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
                data-subject="Mathematics"
                data-type="Official Final Exams"
                data-year="2021"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500 rounded-t-xl" />
                <div className="space-y-space-sm">
                  <div className="flex items-start justify-between gap-space-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">priority_high</span> Needs
                      Remediation
                    </span>
                    <span className="text-on-surface-variant font-label-sm text-label-sm">Taken Oct 28</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">
                      Mathematics • 2021
                    </span>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface mt-0.5 group-hover:text-primary transition-colors">
                      2021 Mathematics Comprehensive Paper
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      Analytical geometry, differential equation applications, and probability distributions.
                    </p>
                  </div>
                  {/* Score Indicator Bar */}
                  <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Official Score</span>
                      <div className="font-headline-sm text-headline-sm text-amber-700">
                        79 <span className="text-body-sm text-on-surface-variant font-normal">/ 100</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-space-xs py-0.5 rounded bg-amber-100 text-amber-800 font-label-sm text-label-sm font-bold">
                        Grade 2 equivalent
                      </span>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                        3 Critical Weak Areas
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-space-md mt-space-sm flex items-center gap-space-xs">
                  <button
                    className="w-full py-2 px-space-sm rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 font-label-md text-label-md transition-colors flex items-center justify-center gap-1"
                    onClick={scrollToMistakes}
                  >
                    <span className="material-symbols-outlined text-[16px]">troubleshoot</span> Review Weak
                    Topics
                  </button>
                </div>
              </div>
            </div>
            {/* Pagination & Archive Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm pt-space-sm">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Showing 6 of 24 authenticated past papers
              </p>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 rounded-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors">
                  Previous
                </button>
                <button className="px-3 py-1 rounded-md bg-primary text-on-primary font-label-md text-label-md">
                  1
                </button>
                <button className="px-3 py-1 rounded-md bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors">
                  2
                </button>
                <button className="px-3 py-1 rounded-md bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors">
                  3
                </button>
                <button className="px-3 py-1 rounded-md bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Exam Diagnostic & Error Log Side Panel */}
          <div
            className={`xl:col-span-4 space-y-space-md ${highlightPanel ? "ring-2 ring-primary" : ""}`}
            id="diagnostic-side-panel"
            ref={diagnosticRef}
          >
            {/* Main Mistake Intelligence Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-lg bg-error-container text-error flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Mistake Pattern & Error Log
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                  28 Flags
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Automated cognitive triage generated from your 14 completed mock exams across all STEM subjects.
              </p>
              {/* Error Breakdown Category Bars */}
              <div className="space-y-space-sm pt-space-xs">
                <div className="space-y-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Conceptual Gap
                    </span>
                    <span className="font-bold text-on-surface">
                      45% <span className="font-normal text-on-surface-variant text-[11px]">(13 items)</span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: "45%" }}
                    />
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Requires revisiting theoretical definitions & derivations.
                  </p>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Calculation Error
                    </span>
                    <span className="font-bold text-on-surface">
                      30% <span className="font-normal text-on-surface-variant text-[11px]">(8 items)</span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: "30%" }}
                    />
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Sign flips, unit conversions, and algebraic missteps.
                  </p>
                </div>
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-error" /> Time Pressure / Rushed
                    </span>
                    <span className="font-bold text-on-surface">
                      25% <span className="font-normal text-on-surface-variant text-[11px]">(7 items)</span>
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-low h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-error h-full rounded-full transition-all duration-500"
                      style={{ width: "25%" }}
                    />
                  </div>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    Questions solved in &lt;30 seconds during final 10 minutes.
                  </p>
                </div>
              </div>
              {/* Top 3 Mistake-Prone Question Types */}
              <div className="pt-space-sm space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                    Top 3 Mistake-Prone Types
                  </span>
                  <span className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline">
                    Full Breakdown
                  </span>
                </div>
                {/* List Item 1 */}
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm group hover:bg-surface-container transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-surface-container-lowest text-error flex items-center justify-center shrink-0 font-headline-sm text-[13px] font-bold">
                    1
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        Reaction Mechanisms
                      </p>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-error-container text-on-error-container font-bold">
                        5 Misses
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Organic Chemistry (Nucleophilic substitution)
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-primary">
                      <span
                        className="cursor-pointer hover:underline flex items-center gap-0.5"
                        onClick={() => alert("Viewing 5 specific flash review cards")}
                      >
                        <span className="material-symbols-outlined text-[13px]">visibility</span> Review 5 cards
                      </span>
                    </div>
                  </div>
                </div>
                {/* List Item 2 */}
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm group hover:bg-surface-container transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-surface-container-lowest text-error flex items-center justify-center shrink-0 font-headline-sm text-[13px] font-bold">
                    2
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        Integral Calculus Word Problems
                      </p>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-error-container text-on-error-container font-bold">
                        4 Misses
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Volume of revolution & rate of change integration
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-primary">
                      <span
                        className="cursor-pointer hover:underline flex items-center gap-0.5"
                        onClick={() => alert("Viewing step-by-step calculus explanations")}
                      >
                        <span className="material-symbols-outlined text-[13px]">visibility</span> Review 4 cards
                      </span>
                    </div>
                  </div>
                </div>
                {/* List Item 3 */}
                <div className="p-space-sm rounded-xl bg-surface-container-low flex items-start gap-space-sm group hover:bg-surface-container transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-surface-container-lowest text-error flex items-center justify-center shrink-0 font-headline-sm text-[13px] font-bold">
                    3
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-label-md text-label-md text-on-surface font-semibold truncate">
                        Circuit Resistances & Kirchhoff
                      </p>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-error-container text-on-error-container font-bold">
                        4 Misses
                      </span>
                    </div>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Physics Section 3 (Parallel junction laws)
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-primary">
                      <span
                        className="cursor-pointer hover:underline flex items-center gap-0.5"
                        onClick={() => alert("Viewing circuit loop rules walkthrough")}
                      >
                        <span className="material-symbols-outlined text-[13px]">visibility</span> Review 4 cards
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Targeted Remediation Generator CTA */}
              <div className="pt-space-xs">
                <button
                  className="w-full py-3 px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-space-xs text-center"
                  id="btn-generate-practice"
                  onClick={generateTargetedPractice}
                >
                  {practiceState === "generating" ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                      <span>Generating AI Drill...</span>
                    </>
                  ) : practiceState === "ready" ? (
                    <>
                      <span className="material-symbols-outlined text-[20px]">check</span>
                      <span>Drill Ready: 15 Questions</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
                      <span>Generate 15-Question Practice Set</span>
                    </>
                  )}
                </button>
                <p className="text-center font-label-sm text-[11px] text-on-surface-variant mt-1.5">
                  Trained specifically on your 28 recorded historical mistakes
                </p>
              </div>
            </div>
            {/* Academic Advisor Quick Diagnostic Tip */}
            <div className="bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
              <div className="space-y-1 min-w-0">
                <p className="font-label-md text-label-md text-on-surface font-semibold">Diagnostic Insight</p>
                <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                  Your pacing on Paper 1 questions is solid (+8m bonus). However, error density spikes during
                  multi-part Chemistry kinetics questions. Schedule a 20-minute kinetics drill before the next
                  timed mock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulation Overlay / Modal Container (Hidden by default) */}
      <div
        className={`fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm ${
          modal.open ? "flex" : "hidden"
        } items-center justify-center p-space-md`}
        id="simulation-modal"
      >
        <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-space-lg shadow-2xl space-y-space-md animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
              <h3 className="font-headline-sm text-headline-sm text-on-surface">
                Timed Exam Simulation Launch
              </h3>
            </div>
            <button
              className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant"
              onClick={closeSimulationModal}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
            <p className="font-label-md text-label-md text-primary uppercase font-bold" id="modal-exam-title">
              {modal.title || "Selected Exam"}
            </p>
            <div className="grid grid-cols-2 gap-space-sm font-label-md text-label-md text-on-surface">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline">schedule</span>
                <span>
                  Duration: <strong id="modal-exam-time">{modal.duration || 120}</strong> mins
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline">help_center</span>
                <span>
                  Questions: <strong id="modal-exam-questions">{modal.count || 85}</strong> items
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline">lock</span>
                <span>Lockdown: Tab-switch warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline">calculate</span>
                <span>Formula Sheet: Permitted</span>
              </div>
            </div>
          </div>
          <div className="space-y-space-xs text-body-sm font-body-sm text-on-surface-variant">
            <p>• Once initiated, the simulation counter runs without interruptions.</p>
            <p>• Questions are scored strictly according to National Examination marking guidelines.</p>
            <p>• Instant personalized diagnostic report is delivered upon submission.</p>
          </div>
          <div className="flex items-center justify-end gap-space-sm pt-space-xs">
            <button
              className="px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-colors"
              onClick={closeSimulationModal}
            >
              Cancel
            </button>
            <button
              className="px-space-lg py-2.5 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary/95 transition-all flex items-center gap-1.5 shadow-md"
              onClick={launchSessionDirectly}
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span> Begin Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
