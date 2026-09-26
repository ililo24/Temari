import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { supabase } from "../lib/supabase";
import type { ExamResult } from "../types/database";

// exam_results exists in the schema but has no writers yet (there is no
// exam-taking flow), so this page is expected to show its empty state until
// results are logged — either by the future exam flow or by the temporary
// manual-entry form below.

function LoadingIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl bg-surface-container-lowest rounded-xl shadow-sm">
      <span className="material-symbols-outlined text-[32px] text-primary animate-spin">progress_activity</span>
      <span className="font-label-md text-label-md text-on-surface-variant">{label}</span>
    </div>
  );
}

// Empty-state pattern matching lessons.tsx / dashboard.tsx (icon + title +
// message card), with an optional call-to-action.
function EmptyState({
  action,
  icon,
  message,
  title
}: {
  action?: ReactNode;
  icon: string;
  message: string;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl px-space-lg bg-surface-container-lowest rounded-xl shadow-sm text-center">
      <span className="material-symbols-outlined text-[40px] text-on-surface-variant">{icon}</span>
      <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{message}</p>
      {action}
    </div>
  );
}

/** Most-recent-first ordering; rows without a taken_at date sort last. */
function compareByTakenAtDesc(a: ExamResult, b: ExamResult) {
  const timeA = a.taken_at ? new Date(a.taken_at).getTime() : Number.NEGATIVE_INFINITY;
  const timeB = b.taken_at ? new Date(b.taken_at).getTime() : Number.NEGATIVE_INFINITY;
  return timeB - timeA;
}

/** Readable date for a taken_at timestamp, e.g. "Nov 12, 2024". */
function formatTakenAt(takenAt: string | null) {
  if (!takenAt) return "Date not recorded";
  const date = new Date(takenAt);
  if (Number.isNaN(date.getTime())) return takenAt;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// Score coloring: 80%+ reads as a strength (tertiary), below 60% as a
// weakness (error), everything in between as neutral.
function scoreColorClass(score: number | null, maxScore: number) {
  if (score == null || maxScore <= 0) return "text-on-surface";
  const pct = (score / maxScore) * 100;
  if (pct >= 80) return "text-tertiary";
  if (pct >= 60) return "text-on-surface";
  return "text-error";
}

// Today's local date as YYYY-MM-DD, for the date input's default value.
function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

interface LogFormState {
  title: string;
  score: string;
  max_score: string;
  taken_at: string;
  diagnostic_note: string;
}

// Fresh form state: max_score defaults to 100 and taken_at defaults to today.
function emptyLogForm(): LogFormState {
  return {
    title: "",
    score: "",
    max_score: "100",
    taken_at: todayISO(),
    diagnostic_note: ""
  };
}

const LOG_LABEL_CLASS = "font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant";
const LOG_INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-outline-variant bg-surface-container-low px-space-sm py-2 font-body-md text-body-md text-on-surface placeholder:text-outline transition-colors focus:border-primary focus:outline-none";

// One exam_results row, rendered as a card: title, formatted date, optional
// diagnostic note, and the score/max_score (color-coded by percentage).
function ExamResultCard({ result }: { result: ExamResult }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">
        <div className="flex items-start gap-space-md min-w-0">
          <span className="p-2 rounded-lg bg-secondary-container text-on-secondary-container shrink-0">
            <span className="material-symbols-outlined text-[20px]">assignment</span>
          </span>
          <div className="min-w-0 space-y-1">
            <h3 className="font-headline-sm text-headline-sm text-on-surface break-words">
              {result.title ?? "Untitled exam"}
            </h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">event</span>
              {formatTakenAt(result.taken_at)}
            </p>
            {result.diagnostic_note && (
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">notes</span>
                <span className="break-words">{result.diagnostic_note}</span>
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0 sm:text-right">
          <span
            className={`font-headline-sm text-headline-sm font-bold ${scoreColorClass(result.score, result.max_score)}`}
          >
            {result.score != null ? result.score : "—"}
            <span className="text-on-surface-variant font-normal text-label-sm">/{result.max_score}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Exams() {
  const [loading, setLoading] = useState(true);
  // null while loading; always an array once loading finishes (empty when the
  // user has no exam_results rows yet — the expected state right now).
  const [results, setResults] = useState<ExamResult[] | null>(null);
  const [resultsError, setResultsError] = useState<string | null>(null);

  const [form, setForm] = useState<LogFormState>(emptyLogForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const logFormRef = useRef<HTMLDivElement>(null);

  // Load the signed-in user's exam_results once on mount, most recent first.
  useEffect(() => {
    let cancelled = false;

    async function loadExamResults() {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (cancelled) return;
      if (authError || !user) {
        // AppLayout's guard should ensure a session; treat a missing user
        // as "no data" rather than crashing the page.
        console.warn("Exams could not resolve the current user:", authError?.message ?? "no session");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("exam_results")
        .select("id, user_id, title, score, max_score, taken_at, diagnostic_note")
        .eq("user_id", user.id)
        .order("taken_at", { ascending: false, nullsFirst: false });
      if (cancelled) return;

      if (error) {
        setResultsError(error.message);
        setResults([]);
      } else {
        // Re-sort locally so the client-side ordering always matches the
        // ordering used when new rows are added by the form below.
        const loaded = (data ?? []) as ExamResult[];
        setResults([...loaded].sort(compareByTakenAtDesc));
      }

      setLoading(false);
    }

    loadExamResults();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (field: keyof LogFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  // TEMPORARY manual entry (until real exam content exists): inserts one
  // exam_results row for the current user, then mirrors the returned row into
  // the list so it appears immediately without a page refresh.
  const handleLogResult = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    const title = form.title.trim();
    const score = form.score.trim() === "" ? NaN : Number(form.score);
    const maxScore = form.max_score.trim() === "" ? NaN : Number(form.max_score);

    if (!title) {
      setFormError("Give this result a title first.");
      return;
    }
    if (!Number.isFinite(score) || !Number.isFinite(maxScore)) {
      setFormError("Score and max score must be numbers.");
      return;
    }
    if (maxScore <= 0) {
      setFormError("Max score must be greater than zero.");
      return;
    }
    if (score < 0 || score > maxScore) {
      setFormError(`Score must be between 0 and ${maxScore}.`);
      return;
    }

    setFormError(null);
    setSaving(true);
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        setFormError("You need to be signed in to log a result.");
        return;
      }

      const { data, error } = await supabase
        .from("exam_results")
        .insert({
          user_id: user.id,
          title,
          score,
          max_score: maxScore,
          taken_at: form.taken_at ? new Date(`${form.taken_at}T00:00:00`).toISOString() : null,
          diagnostic_note: form.diagnostic_note.trim() || null
        })
        .select("id, user_id, title, score, max_score, taken_at, diagnostic_note")
        .single();
      if (error) {
        setFormError(`Couldn't save this result: ${error.message}`);
        return;
      }

      if (data) {
        const savedRow = data as ExamResult;
        setResults((rows) => [...(rows ?? []), savedRow].sort(compareByTakenAtDesc));
      }
      setForm(emptyLogForm());
    } finally {
      setSaving(false);
    }
  };

  const scrollToLogForm = () => {
    logFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleResults = results ?? [];
  const hasResults = visibleResults.length > 0;

  return (
    <div className="flex flex-col w-full">
      <div className="p-space-lg max-w-[1360px] mx-auto w-full space-y-space-lg">
        {/* Breadcrumb & Page Lead */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span className="hover:text-primary cursor-pointer transition-colors">StudyPulse</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Exams & Past Papers</span>
          </div>
          <div className="space-y-1 max-w-2xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Exams & Past Papers
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your recorded exam and past paper scores, loaded live from your results history. Log a past paper
              score to start building your record — real exam taking is coming soon.
            </p>
          </div>
        </div>

        {/* Main Content: Exam History (8 cols) + Manual Score Log (4 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Exam History List */}
          <div className="xl:col-span-8 space-y-space-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                  Exam History
                </span>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Recent Exam & Past Paper Scores
                </h2>
              </div>
              {!loading && hasResults && (
                <span className="px-space-xs py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  {visibleResults.length} result{visibleResults.length === 1 ? "" : "s"}
                </span>
              )}
            </div>

            {loading ? (
              <LoadingIndicator label="Loading your exam results..." />
            ) : resultsError ? (
              <EmptyState
                icon="error"
                message={`Something went wrong while fetching your exam results: ${resultsError}`}
                title="Couldn't load exam results"
              />
            ) : !hasResults ? (
              <EmptyState
                action={
                  <button
                    className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md transition-opacity hover:opacity-90"
                    onClick={scrollToLogForm}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    <span>Log a past paper score</span>
                  </button>
                }
                icon="history"
                message="This page will populate once exam content is available and you can take your first exam. In the meantime, you can log past paper scores manually with the form."
                title="No exams taken yet"
              />
            ) : (
              <div className="space-y-space-md">
                {visibleResults.map((result) => (
                  <ExamResultCard key={result.id} result={result} />
                ))}
              </div>
            )}
          </div>

          {/* Manual "Log a Past Paper Score" Entry (temporary, until real
              exam content exists) */}
          <div className="xl:col-span-4" ref={logFormRef}>
            <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Results Entry
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                    Temporary
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Log a Past Paper Score</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Manual entry for now — built-in exam taking is coming soon.
                </p>
              </div>

              <form className="space-y-space-md" onSubmit={handleLogResult}>
                <div>
                  <label className={LOG_LABEL_CLASS} htmlFor="log-title">
                    Title
                  </label>
                  <input
                    className={LOG_INPUT_CLASS}
                    id="log-title"
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder="e.g. 2023 Chemistry Paper 2"
                    type="text"
                    value={form.title}
                  />
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div>
                    <label className={LOG_LABEL_CLASS} htmlFor="log-score">
                      Score
                    </label>
                    <input
                      className={LOG_INPUT_CLASS}
                      id="log-score"
                      min="0"
                      onChange={(e) => updateField("score", e.target.value)}
                      placeholder="78"
                      step="any"
                      type="number"
                      value={form.score}
                    />
                  </div>
                  <div>
                    <label className={LOG_LABEL_CLASS} htmlFor="log-max-score">
                      Max score
                    </label>
                    <input
                      className={LOG_INPUT_CLASS}
                      id="log-max-score"
                      min="1"
                      onChange={(e) => updateField("max_score", e.target.value)}
                      step="any"
                      type="number"
                      value={form.max_score}
                    />
                  </div>
                </div>

                <div>
                  <label className={LOG_LABEL_CLASS} htmlFor="log-taken-at">
                    Date taken
                  </label>
                  <input
                    className={LOG_INPUT_CLASS}
                    id="log-taken-at"
                    onChange={(e) => updateField("taken_at", e.target.value)}
                    type="date"
                    value={form.taken_at}
                  />
                </div>

                <div>
                  <label className={LOG_LABEL_CLASS} htmlFor="log-note">
                    Diagnostic note (optional)
                  </label>
                  <input
                    className={LOG_INPUT_CLASS}
                    id="log-note"
                    onChange={(e) => updateField("diagnostic_note", e.target.value)}
                    placeholder="e.g. Weakness: organic section B"
                    type="text"
                    value={form.diagnostic_note}
                  />
                </div>

                {formError && (
                  <p className="font-body-sm text-body-sm text-error flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    {formError}
                  </p>
                )}

                <button
                  className="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                  disabled={loading || saving}
                  type="submit"
                >
                  <span className={`material-symbols-outlined text-[18px] ${saving ? "animate-spin" : ""}`}>
                    {saving ? "progress_activity" : "save"}
                  </span>
                  <span>{saving ? "Saving..." : "Log Score"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
