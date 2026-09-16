import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const GRADES: { value: string; label: string }[] = [
  { value: "grade-9", label: "Grade 9" },
  { value: "grade-10", label: "Grade 10" },
  { value: "grade-11", label: "Grade 11 (Junior)" },
  { value: "grade-12", label: "Grade 12 / AP" }
];

const GRADE_PILL_ACTIVE =
  "grade-pill py-2.5 px-2 text-center rounded-lg font-label-sm text-label-sm bg-primary text-on-primary font-bold shadow-sm transition-all";
const GRADE_PILL_INACTIVE =
  "grade-pill py-2.5 px-2 text-center rounded-lg font-label-sm text-label-sm bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container";

interface StrengthState {
  bar: string;
  label: string;
  labelClass: string;
}

function getStrength(val: string): StrengthState {
  if (val.length === 0) {
    return {
      bar: "h-full w-0 bg-outline rounded-full transition-all duration-300",
      label: "Enter password",
      labelClass: "font-label-sm text-label-sm text-secondary shrink-0"
    };
  }
  if (val.length < 6) {
    return {
      bar: "h-full w-1/4 bg-error rounded-full transition-all duration-300",
      label: "Too weak",
      labelClass: "font-label-sm text-label-sm text-error shrink-0"
    };
  }
  if (val.length < 9) {
    return {
      bar: "h-full w-2/3 bg-secondary rounded-full transition-all duration-300",
      label: "Fair",
      labelClass: "font-label-sm text-label-sm text-secondary shrink-0"
    };
  }
  return {
    bar: "h-full w-full bg-tertiary-container rounded-full transition-all duration-300",
    label: "Strong key",
    labelClass: "font-label-sm text-label-sm text-tertiary shrink-0"
  };
}

export default function Signup() {
  const [selectedGrade, setSelectedGrade] = useState("grade-11");
  const [selectedStream, setSelectedStream] = useState<"stem" | "humanities">("stem");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [pwdStrength, setPwdStrength] = useState<StrengthState>({
    bar: "h-full w-2/3 bg-tertiary-container rounded-full transition-all duration-300",
    label: "Strong key",
    labelClass: "font-label-sm text-label-sm text-tertiary shrink-0"
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "done">("idle");
  const submitTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(submitTimer.current);
  }, []);

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setPwdStrength(getStrength(val));
  };

  const handleRegistration = () => {
    if (submitState !== "idle") return;
    setSubmitState("submitting");
    window.clearTimeout(submitTimer.current);
    submitTimer.current = window.setTimeout(() => {
      setSubmitState("done");
    }, 900);
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased">
      <main className="w-full min-h-screen flex flex-col justify-center items-center p-margin-mobile sm:p-margin">
        <div className="flex flex-col w-full max-w-7xl mx-auto py-space-sm sm:py-space-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Left Trust Column / Contextual Hero Showcase */}
            <div className="lg:col-span-5 flex flex-col justify-between p-space-lg lg:p-space-xl bg-surface-container-low rounded-xl relative overflow-hidden shadow-sm">
              {/* Subtle Decorative Accent Gradients */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 right-0 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-space-lg">
                {/* Brand Kicker */}
                <div className="flex items-center gap-space-xs">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-on-primary shadow-sm">
                    <span className="material-symbols-outlined text-base">school</span>
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">StudyPulse</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm uppercase">
                    2025 Edition
                  </span>
                </div>
                {/* Hero Pitch */}
                <div className="space-y-space-sm">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight leading-tight">
                    Join 42,000+ students mastering exams with diagnostic precision.
                  </h1>
                  <p className="font-body-md text-body-md text-secondary">
                    Turn revision anxiety into systematic mastery. Built for high-schoolers aiming for top percentiles
                    without the burnout.
                  </p>
                </div>
                {/* Academic Value Bullets */}
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-tertiary-container/15 text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-base">analytics</span>
                    </div>
                    <div>
                      <p className="font-label-lg text-label-lg text-on-surface">Instant Mistake Triage</p>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Isolate recurring conceptual weak spots across 24+ years of past exam papers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-base">auto_fix_high</span>
                    </div>
                    <div>
                      <p className="font-label-lg text-label-lg text-on-surface">Socratic Adaptive Tutor</p>
                      <p className="font-body-sm text-secondary text-body-sm">
                        AI trained strictly on your district syllabus, textbook chapters, and grading rubrics.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-space-sm bg-surface-container-lowest p-space-md rounded-lg shadow-sm">
                    <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-base">groups</span>
                    </div>
                    <div>
                      <p className="font-label-lg text-label-lg text-on-surface">Focus Squads & Live Whiteboards</p>
                      <p className="font-body-sm text-body-sm text-secondary">
                        Structured study sprints with peer verification and instant LaTeX math rendering.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Student Social Proof Card with Photo */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm relative">
                  <div className="flex items-center gap-space-sm">
                    <img
                      className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-primary/20"
                      data-alt="A portrait of an expressive smiling South Asian teenage female high school student wearing round glasses, an olive knit sweater, and holding her handwritten biology notebook inside a warm sunlit library with bookstacks and study desks behind her."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmdvkCoMZ-2upoJfDebuYaF8czZ-B9MNOz0-ieL5hZTdbp9v1fRnxGu2qTnM8tPG8CZ8TUs5FLXjfeh_VB5xuK1-5ud7uxNv5gKTUOffQOwgbnvBFbLz3tXkwJYflFu4a6Iz2TVmNQIBkHbCHQYs4AkTWWf-sQcwWTL2BrXp2e32PyQLzmURhbBYppcgvED3JGt2N7ncVhDWbp5cBhOFx3NDN3kDYXoirauiXyHCN1lSbdfSwVnheNMg"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-label-lg text-label-lg text-on-surface truncate">Amina K.</span>
                        <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm">
                          Verified Student
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-secondary truncate">Grade 11 · Westview Prep</p>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface italic">
                    “The targeted quiz generator saved my AP Chem grade in just 10 days. Seeing exactly where my redox
                    reactions failed completely transformed my study plan.”
                  </p>
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary ml-1.5">Score lift: +18 percentile</span>
                  </div>
                </div>
              </div>
              {/* Institutional Trust Anchor */}
              <div className="relative z-10 pt-space-lg flex flex-col gap-2">
                <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                  Verified District Integrations
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-on-surface-variant font-label-md text-label-md opacity-85">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-primary">hub</span> Canvas LMS
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-tertiary">co_present</span> Google
                    Classroom
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base text-secondary">verified_user</span> Clever /
                    ClassLink SSO
                  </span>
                </div>
              </div>
            </div>
            {/* Right Column: Frictionless Signup Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg sm:p-space-xl rounded-xl shadow-md flex flex-col justify-center">
              <div className="max-w-xl w-full mx-auto space-y-space-md">
                {/* Form Header */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm mb-1">
                    <span className="material-symbols-outlined text-xs">bolt</span>
                    <span>Takes &lt; 60 seconds</span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Create your StudyPulse account
                  </h2>
                  <p className="font-body-md text-body-md text-secondary">
                    Free forever for individual exam preparation. No credit card required.
                  </p>
                </div>
                {/* Google OAuth Primary Quick-Action */}
                <button
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-lg text-label-lg transition-all active:scale-[0.99] shadow-sm"
                  id="google-auth-btn"
                  type="button"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Continue with Google Workspace / School Account</span>
                </button>
                {/* Divider */}
                <div className="relative flex items-center justify-center my-space-xs">
                  <div className="w-full bg-surface-container-high h-[1px]" />
                  <span className="px-3 bg-surface-container-lowest text-secondary font-label-sm text-label-sm absolute">
                    or sign up with school email
                  </span>
                </div>
                {/* Main Minimal Friction Input Form */}
                <form
                  className="space-y-space-md"
                  id="signup-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegistration();
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="full-name">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container-low shadow-sm"
                          id="full-name"
                          placeholder="e.g. Amina Khan"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                    {/* Academic Email */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="academic-email">
                          Academic Email
                        </label>
                        <span className="font-label-sm text-label-sm text-primary">Cohort Match</span>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full h-11 px-3.5 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container-low shadow-sm"
                          id="academic-email"
                          placeholder="amina.k@westviewprep.edu"
                          required
                          type="email"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Grade / Level Segmented Selector */}
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface">
                      Current Grade / Exam Target
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" id="grade-selector">
                      {GRADES.map((g) => (
                        <button
                          className={selectedGrade === g.value ? GRADE_PILL_ACTIVE : GRADE_PILL_INACTIVE}
                          data-grade={g.value}
                          key={g.value}
                          onClick={() => setSelectedGrade(g.value)}
                          type="button"
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Academic Stream Preference Chips */}
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface">
                      Focus Stream (Customizes First Diagnostic)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="stream-selector">
                      <div
                        className={`stream-card cursor-pointer p-2.5 rounded-lg flex items-center gap-2.5 transition-all active:scale-[0.99] ${
                          selectedStream === "stem" ? "bg-surface-container-low opacity-100" : "bg-surface-container-lowest opacity-70 hover:opacity-100"
                        }`}
                        data-stream="stem"
                        onClick={() => setSelectedStream("stem")}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-base">biotech</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-sm text-label-sm text-on-surface">Natural Sciences</p>
                          <p className="font-body-sm text-body-sm text-secondary truncate">STEM, Pre-Med & AP Math</p>
                        </div>
                        <span
                          className={`material-symbols-outlined ml-auto text-base stream-check ${
                            selectedStream === "stem" ? "text-primary" : "hidden text-outline"
                          }`}
                        >
                          check_circle
                        </span>
                      </div>
                      <div
                        className={`stream-card cursor-pointer p-2.5 rounded-lg flex items-center gap-2.5 transition-all active:scale-[0.99] ${
                          selectedStream === "humanities" ? "bg-surface-container-low opacity-100" : "bg-surface-container-lowest opacity-70 hover:opacity-100"
                        }`}
                        data-stream="humanities"
                        onClick={() => setSelectedStream("humanities")}
                      >
                        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-base">menu_book</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-label-sm text-label-sm text-on-surface">Social Sciences</p>
                          <p className="font-body-sm text-body-sm text-secondary truncate">Econ, History & Literature</p>
                        </div>
                        <span
                          className={`material-symbols-outlined ml-auto text-base stream-check ${
                            selectedStream === "humanities" ? "text-primary" : "hidden text-outline"
                          }`}
                        >
                          check_circle
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Password & Interactive Strength Bar */}
                  <div className="space-y-1.5">
                    <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="student-password">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        className="w-full h-11 pl-3.5 pr-11 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:bg-surface-container-low shadow-sm"
                        id="student-password"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        placeholder="At least 8 characters with 1 number"
                        required
                        type={showPassword ? "text" : "password"}
                        value={password}
                      />
                      <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface flex items-center justify-center"
                        id="toggle-pwd-btn"
                        onClick={() => setShowPassword((s) => !s)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg" id="pwd-icon">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                    {/* Strength Indicator */}
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-1.5 flex-1 bg-surface-container rounded-full overflow-hidden flex">
                        <div className={pwdStrength.bar} id="pwd-strength-bar" />
                      </div>
                      <span className={pwdStrength.labelClass} id="pwd-strength-label">
                        {pwdStrength.label}
                      </span>
                    </div>
                  </div>
                  {/* Privacy & FERPA Compliance Consent */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary"
                      defaultChecked
                      id="terms-check"
                      required
                      type="checkbox"
                    />
                    <label
                      className="font-body-sm text-body-sm text-secondary leading-snug cursor-pointer select-none"
                      htmlFor="terms-check"
                    >
                      I agree to the <a className="text-primary hover:underline" href="#terms">Terms of Service</a>.
                      StudyPulse employs zero-data-retention AI models calibrated strictly for student confidentiality (
                      <span className="text-on-surface font-label-sm">FERPA & GDPR-K compliant</span>).
                    </label>
                  </div>
                  {/* Primary Submit CTA */}
                  <button
                    className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] group disabled:opacity-90"
                    disabled={submitState !== "idle"}
                    id="submit-cta"
                    type="submit"
                  >
                    {submitState === "submitting" ? (
                      <>
                        <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                        <span>Generating diagnostic environment...</span>
                      </>
                    ) : submitState === "done" ? (
                      <>
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        <span>Sprint Ready</span>
                      </>
                    ) : (
                      <>
                        <span>Start Free Diagnostic Sprint</span>
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                  {/* Feedback Status Region for Async UX */}
                  <div
                    className={`p-3 rounded-lg font-body-sm text-body-sm text-center ${
                      submitState === "done" ? "bg-tertiary-container/15 text-tertiary" : "hidden"
                    }`}
                    id="status-message"
                  >
                    {submitState === "done" && (
                      <>
                        <strong>Welcome aboard!</strong> Initializing your Grade 11 diagnostic sprint...
                      </>
                    )}
                  </div>
                  {/* Login Deep Link */}
                  <div className="text-center pt-2">
                    <p className="font-body-sm text-body-sm text-secondary">
                      Already have a StudyPulse account?
                      <Link
                        className="font-label-md text-label-md text-primary hover:underline ml-1"
                        to="/login"
                      >
                        Log in here →
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
