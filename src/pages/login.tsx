import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setFormError(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) {
        console.error("Sign-in failed:", error.message);
        setFormError(error.message);
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      navigate("/");
    } catch (err) {
      console.error("Sign-in threw:", err);
      setFormError(err instanceof Error ? err.message : String(err));
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased">
      <main className="w-full min-h-screen flex flex-col justify-center items-center p-margin-mobile sm:p-margin">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-6xl mx-auto py-space-md sm:py-space-xl px-margin-mobile sm:px-margin">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
              {/* Left Narrative / High Impact Showcase (Inspired by student academic focus) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-space-lg order-2 lg:order-1">
                {/* Header Branding & Institutional Credibility */}
                <div className="space-y-space-sm">
                  <div className="inline-flex items-center gap-space-xs bg-surface-container-high px-space-md py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    <span className="font-label-sm text-tertiary uppercase tracking-wider">
                      Exam Sprint Season • Term 2
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-on-surface tracking-tight">
                    Elevating study habits into effortless mastery.
                  </h2>
                  <p className="font-body-md text-on-surface-variant max-w-md">
                    Over 380+ high schools leverage StudyPulse for adaptive diagnostic sets, spaced repetition
                    reviews, and authentic timed AP & IB simulations.
                  </p>
                </div>
                {/* Dynamic Academic Card featuring Photo & Real-time Live Metric */}
                <div className="relative bg-surface-container-lowest rounded-xl p-space-md shadow-md overflow-hidden group">
                  <div className="flex items-center gap-space-md">
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-surface-container-high">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Close-up portrait of an ambitious high school student smiling with dark curly hair and glasses, holding Biology handwritten notes in a sunlit modern academic library with wooden bookshelves and soft warm lighting"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvaDNyZNMgO4jG_fQzxn9Jh1SZvOhgBcqPvmrWPLNU0aElnuSdxGCuKCj5MS_0iGBIFJOSiYTVgKpF7qDcElxS3BdNAB5pLxNF8-wLu6n71cGp7BbJWBrtVr97xhXtgouSkJKTMv6gEVsnQqQL1aXJGmhySPIl7pXoq9ronFBXhZftHbTDbl-0CDtpnYoijexW0-GJKLRbmKJvpb4VHbt1QmjEfgr-T48bZTX3Wg4doHz-oUkQgb9udA"
                      />
                      <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-tertiary-fixed-dim rounded-full ring-2 ring-surface-container-lowest" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-primary font-bold uppercase tracking-wider">
                          Top Learner Profile
                        </span>
                        <span className="inline-flex items-center gap-1 font-label-sm text-tertiary bg-surface-container-low px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-[14px]">local_fire_department</span> 24 Day
                          Streak
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-on-surface truncate">Amina K.</h4>
                      <p className="font-body-sm text-on-surface-variant truncate">
                        Westview Prep • AP Biology & Calc BC
                      </p>
                    </div>
                  </div>
                  <div className="mt-space-md pt-space-md bg-surface-container-low -mx-space-md -mb-space-md p-space-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px]">psychology</span>
                      </div>
                      <div>
                        <p className="font-label-sm text-on-surface">Diagnostic Accuracy</p>
                        <p className="font-body-sm text-on-surface-variant font-bold">
                          94.8% <span className="font-label-sm text-tertiary">(+12% this week)</span>
                        </p>
                      </div>
                    </div>
                    {/* Mini SVG Micro-Chart */}
                    <svg className="w-24 h-8 overflow-visible" fill="none" viewBox="0 0 100 32">
                      <path
                        className="text-primary"
                        d="M 0,26 Q 20,24 35,16 T 70,12 T 100,4"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />
                      <circle className="fill-primary" cx="100" cy="4" r="3.5" />
                    </svg>
                  </div>
                </div>
                {/* Academic Network Trust Pill */}
                <div className="flex items-center gap-space-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                  <span className="font-body-sm">
                    Active Term 2 Finals Prep in progress across{" "}
                    <strong className="text-on-surface font-semibold">380+ high schools & districts</strong>.
                  </span>
                </div>
              </div>
              {/* Right Column: Authentication Hub */}
              <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
                <div className="w-full max-w-lg bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-xl relative">
                  {/* Brand Badge and Header */}
                  <div className="flex flex-col space-y-space-xs mb-space-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-space-xs">
                        <img
                          alt="StudyPulse Logo"
                          className="w-10 h-10 rounded-lg shadow-sm object-contain bg-surface-container-low"
                          src="https://lh3.googleusercontent.com/aida/AEtjO1WxHRTwBeo0DANy75wIT9STgD6_TwPjY1T3yI1ejhQwmbkIDrCVfujEdUYLS_4sYWph95j0brXiCMNlxATdwPjrb7egO-pQFlw575FhRzdYE7YlcxmAgMsSgYbAxPuNrwSW2AkMoVU84atkC4L7ZgPys7jacllPvbR4Td4FRM7_LXszifnU0Q_1oRrkB9TQjWij2zPmTnAb-7dgrkhnvVcWe8pC8I2Yzg6ugUl_7lrgo7v4mC4zdcDlxHuB"
                        />
                        <div>
                          <h1 className="font-headline-sm text-on-surface tracking-tight">StudyPulse</h1>
                          <span className="font-label-sm text-on-surface-variant">Intelligent Exam Readiness</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-sm text-primary bg-secondary-container/40 text-on-secondary-fixed-variant px-space-sm py-1 rounded-full">
                        <span className="material-symbols-outlined text-[14px]">school</span> Student & School Portal
                      </span>
                    </div>
                    <div className="pt-space-sm">
                      <h3 className="font-headline-md text-on-surface">Welcome back to StudyPulse</h3>
                      <p className="font-body-md text-on-surface-variant mt-0.5">
                        Resume your study streak, timed exam simulations, and AI diagnostic drills.
                      </p>
                    </div>
                  </div>
                  {/* Quick Access Institutional OAuth Button */}
                  <div className="space-y-space-sm">
                    <button
                      className="w-full h-11 px-space-md bg-surface-container-low hover:bg-surface-container transition-colors rounded-lg flex items-center justify-between group shadow-sm text-left"
                      id="google-auth-btn"
                      onClick={async () => {
                        setOauthError(null);
                        try {
                          const { error } = await supabase.auth.signInWithOAuth({
                            provider: "google",
                            options: { redirectTo: window.location.origin }
                          });
                          if (error) {
                            console.error("Google sign-in error:", error);
                            setOauthError(error.message);
                          }
                        } catch (err) {
                          console.error("Google sign-in error:", err);
                          setOauthError(err instanceof Error ? err.message : String(err));
                        }
                      }}
                      type="button"
                    >
                      <div className="flex items-center gap-space-sm">
                        {/* SVG Google Icon */}
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
                            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span className="font-label-lg text-on-surface group-hover:text-primary transition-colors">
                          Continue with Google Workspace / School SSO
                        </span>
                      </div>
                      <span className="font-label-sm bg-tertiary-fixed text-on-tertiary-fixed-variant px-1.5 py-0.5 rounded uppercase">
                        Verified SSO
                      </span>
                    </button>
                    {oauthError && (
                      <div
                        className="p-3 rounded-lg bg-error/10 text-error font-body-sm text-body-sm text-left"
                        id="oauth-error"
                        role="alert"
                      >
                        <span className="font-label-sm font-bold">Google sign-in failed:</span> {oauthError}
                      </div>
                    )}
                    <button
                      className="w-full h-10 px-space-md bg-surface-container-lowest hover:bg-surface-container-low transition-colors rounded-lg flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-on-surface"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">account_balance</span>
                      <span className="font-label-md">Sign in with District / Canvas LMS</span>
                    </button>
                  </div>
                  {/* Divider */}
                  <div className="relative my-space-md text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-outline-variant/30" />
                    </div>
                    <span className="relative px-space-sm bg-surface-container-lowest font-label-sm text-outline uppercase tracking-wider">
                      or sign in with credentials
                    </span>
                  </div>
                  {/* Direct Sign-In Form */}
                  <form
                    className="space-y-space-md"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSignIn();
                    }}
                  >
                    {/* Email Input */}
                    <div className="space-y-space-xs">
                      <label className="block font-label-md text-on-surface" htmlFor="email">
                        School / Academic Email
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-space-md material-symbols-outlined text-outline text-[20px] pointer-events-none">
                          alternate_email
                        </span>
                        <input
                          className="w-full h-11 pl-11 pr-space-md bg-surface-container-lowest text-on-surface placeholder:text-outline/70 font-body-md rounded-lg shadow-sm focus:bg-surface-container-low transition-all outline-none"
                          id="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. amina.k@westviewprep.edu"
                          required
                          type="email"
                          value={email}
                        />
                      </div>
                    </div>
                    {/* Password Input */}
                    <div className="space-y-space-xs">
                      <div className="flex items-center justify-between">
                        <label className="block font-label-md text-on-surface" htmlFor="password">
                          Password
                        </label>
                        <a
                          className="font-label-sm text-primary hover:text-on-primary-fixed-variant transition-colors underline-offset-2 hover:underline"
                          href="#forgot"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative flex items-center">
                        <span className="absolute left-space-md material-symbols-outlined text-outline text-[20px] pointer-events-none">
                          lock
                        </span>
                        <input
                          className="w-full h-11 pl-11 pr-11 bg-surface-container-lowest text-on-surface placeholder:text-outline/70 font-body-md rounded-lg shadow-sm focus:bg-surface-container-low transition-all outline-none tracking-widest"
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          required
                          type={showPassword ? "text" : "password"}
                          value={password}
                        />
                        <button
                          aria-label="Toggle password visibility"
                          className="absolute right-space-sm p-1.5 text-outline hover:text-on-surface transition-colors rounded"
                          id="password-toggle"
                          onClick={() => setShowPassword((s) => !s)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>
                    {/* Utility Controls: Remember Device & FERPA Compliant Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pt-1">
                      <label className="flex items-center gap-space-xs cursor-pointer select-none">
                        <input
                          className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                          defaultChecked
                          type="checkbox"
                        />
                        <span className="font-body-sm text-on-surface-variant">
                          Remember this device for 30 days
                        </span>
                      </label>
                      <div className="flex items-center gap-1 font-label-sm text-tertiary bg-tertiary-fixed/30 px-2 py-0.5 rounded-full self-start sm:self-auto">
                        <span className="material-symbols-outlined text-[13px]">shield</span>
                        <span>256-bit SSL • FERPA</span>
                      </div>
                    </div>
                    {/* Submit Button */}
                    <button
                      className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary font-label-lg rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-xs active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={submitting}
                      type="submit"
                    >
                      {submitting ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Workspace</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </>
                      )}
                    </button>
                    {formError && (
                      <div
                        className="p-3 rounded-lg bg-error/10 text-error font-body-sm text-body-sm text-left"
                        id="form-error"
                        role="alert"
                      >
                        <span className="font-label-sm font-bold">Sign-in failed:</span> {formError}
                      </div>
                    )}
                  </form>
                  {/* New User Registration Link */}
                  <div className="mt-space-md pt-space-md text-center bg-surface-container-low -mx-space-md sm:-mx-space-lg -mb-space-md sm:-mb-space-lg p-space-md rounded-b-xl">
                    <p className="font-body-sm text-on-surface-variant">
                      Don't have an account yet?
                      <Link
                        className="font-label-md text-primary hover:text-on-primary-fixed-variant ml-1 underline-offset-2 hover:underline"
                        to="/signup"
                      >
                        Create student account →
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
