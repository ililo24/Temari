import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

// Partial row shapes returned by the queries below. Same convention as
// lessons.tsx: local interfaces for partial selects.
interface ProfileSummary {
  full_name: string | null;
  streak_days: number | null;
}

interface LessonRef {
  id: string;
  subject_id: string;
}

// lesson_progress joined through lessons -> subjects so per-subject rollups
// (name, category) come back in a single request.
interface ProgressRow {
  lesson_id: string;
  progress_pct: number | null;
  lessons: {
    subject_id: string | null;
    subjects: { id: string; name: string | null; category: string | null } | null;
  } | null;
}

interface SubjectStat {
  subjectId: string;
  name: string;
  category: string | null;
  averagePct: number;
  startedCount: number;
  completedCount: number;
  totalLessons: number;
}

// Subjects at or above this average lesson progress are listed under
// "Mastered Strengths"; everything below goes to "Growth Areas".
const MASTERY_STRENGTH_THRESHOLD = 80;
// Growth-area rows below this average get the error ("critical") styling.
const GROWTH_CRITICAL_THRESHOLD = 60;

function LoadingIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl rounded-xl bg-surface-container-low">
      <span className="material-symbols-outlined text-[32px] text-primary animate-spin">progress_activity</span>
      <span className="font-label-md text-label-md text-on-surface-variant">{label}</span>
    </div>
  );
}

// Empty-state pattern matching lessons.tsx (icon + title + message card),
// adapted to sit inside an already-white section card, with an optional
// call-to-action.
function EmptyState({ icon, title, message, action }: { icon: string; title: string; message: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl px-space-lg rounded-xl bg-surface-container-low text-center">
      <span className="material-symbols-outlined text-[40px] text-on-surface-variant">{icon}</span>
      <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{message}</p>
      {action}
    </div>
  );
}

function subjectDetailLabel(stat: SubjectStat) {
  const completed =
    stat.totalLessons > 0
      ? `${stat.completedCount} of ${stat.totalLessons} lessons completed`
      : `${stat.completedCount} lessons completed`;
  return stat.category ? `${stat.category} • ${completed}` : completed;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileSummary | null>(null);
  const [allLessons, setAllLessons] = useState<LessonRef[]>([]);
  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);

  // Load the signed-in user's real dashboard data once on mount: their
  // profile row (streak + display name), the full lesson catalog (totals),
  // and their lesson_progress rows (completed count, readiness heuristic,
  // and the per-subject mastery proxy). exam_results and subject_mastery
  // are intentionally NOT queried — both are empty and have no writers yet.
  useEffect(() => {
    let cancelled = false;

    async function loadDashboardData() {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (cancelled) return;
      if (authError || !user) {
        // AppLayout's guard should ensure a session; treat a missing user
        // as "no data" rather than crashing the page.
        console.warn("Dashboard could not resolve the current user:", authError?.message ?? "no session");
        setLoading(false);
        return;
      }

      const [profileResult, lessonsResult, progressResult] = await Promise.all([
        supabase.from("profiles").select("full_name, streak_days").eq("id", user.id).maybeSingle(),
        supabase.from("lessons").select("id, subject_id"),
        supabase
          .from("lesson_progress")
          .select("lesson_id, progress_pct, lessons(subject_id, subjects(id, name, category))")
          .eq("user_id", user.id)
      ]);
      if (cancelled) return;

      if (profileResult.error) {
        console.warn("Failed to load profile:", profileResult.error.message);
      } else {
        setProfile((profileResult.data ?? null) as ProfileSummary | null);
      }

      if (lessonsResult.error) {
        console.warn("Failed to load lessons:", lessonsResult.error.message);
        setAllLessons([]);
      } else {
        setAllLessons((lessonsResult.data ?? []) as LessonRef[]);
      }

      if (progressResult.error) {
        console.warn("Failed to load lesson progress:", progressResult.error.message);
        setProgressRows([]);
      } else {
        setProgressRows((progressResult.data ?? []) as ProgressRow[]);
      }

      setLoading(false);
    }

    loadDashboardData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Study Goals checklist counter (existing DOM-based pattern, unchanged).
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

    return () => {
      checkboxes.forEach((cb) => {
        cb.removeEventListener("change", updateGoalCount);
      });
    };
  }, []);

  const totalLessons = allLessons.length;

  const completedLessonCount = useMemo(
    () =>
      (progressRows ?? []).filter((row) => row.progress_pct != null && Number(row.progress_pct) >= 100).length,
    [progressRows]
  );

  const lessonsCompletedPct = totalLessons > 0 ? Math.round((completedLessonCount / totalLessons) * 100) : 0;

  // TEMPORARY HEURISTIC — NOT A VALIDATED READINESS METRIC.
  // Readiness is derived purely from lesson_progress: the average progress
  // across ALL lessons in the catalog, where a lesson with no progress row
  // counts as 0%. Replace with a real calculation once exam_results and
  // subject_mastery hold actual data.
  const readinessPct = useMemo(() => {
    if (totalLessons === 0) return 0;
    const sum = (progressRows ?? []).reduce(
      (total, row) => total + (row.progress_pct != null ? Number(row.progress_pct) : 0),
      0
    );
    return Math.round(sum / totalLessons);
  }, [progressRows, totalLessons]);

  // Lightweight per-subject mastery proxy: average lesson_progress.progress_pct
  // for lessons belonging to each subject the user has actually started.
  // Subjects with zero progress rows are excluded entirely (no 0% noise).
  const subjectStats = useMemo<SubjectStat[]>(() => {
    const totalsBySubject = new Map<string, number>();
    for (const lesson of allLessons) {
      totalsBySubject.set(lesson.subject_id, (totalsBySubject.get(lesson.subject_id) ?? 0) + 1);
    }

    const rollups = new Map<
      string,
      { name: string; category: string | null; sum: number; started: number; completed: number }
    >();
    for (const row of progressRows ?? []) {
      const subjectId = row.lessons?.subject_id;
      if (!subjectId) continue;
      const rollup =
        rollups.get(subjectId) ?? {
          name: row.lessons?.subjects?.name ?? "Untitled subject",
          category: row.lessons?.subjects?.category ?? null,
          sum: 0,
          started: 0,
          completed: 0
        };
      const pct = row.progress_pct != null ? Number(row.progress_pct) : 0;
      rollup.sum += pct;
      rollup.started += 1;
      if (pct >= 100) rollup.completed += 1;
      rollups.set(subjectId, rollup);
    }

    return Array.from(rollups.entries())
      .map(([subjectId, rollup]) => ({
        subjectId,
        name: rollup.name,
        category: rollup.category,
        averagePct: Math.round(rollup.sum / rollup.started),
        startedCount: rollup.started,
        completedCount: rollup.completed,
        totalLessons: totalsBySubject.get(subjectId) ?? 0
      }))
      .sort((a, b) => b.averagePct - a.averagePct);
  }, [progressRows, allLessons]);

  const strengths = subjectStats.filter((s) => s.averagePct >= MASTERY_STRENGTH_THRESHOLD);
  const growthAreas = subjectStats.filter((s) => s.averagePct < MASTERY_STRENGTH_THRESHOLD);
  const strengthsAverage =
    strengths.length > 0
      ? Math.round(strengths.reduce((total, s) => total + s.averagePct, 0) / strengths.length)
      : 0;

  const displayName = profile?.full_name?.trim() ?? "";

  return (
    <div className="flex flex-col w-full">
      {/* Interactive Dashboard Root Container */}
      <div className="px-space-lg py-space-xl max-w-7xl mx-auto w-full space-y-space-xl">
        {/* Top Welcome Banner & Momentum Header */}
        <section className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary via-primary-container to-surface-tint p-space-xl text-on-primary shadow-xl">
          {/* Decorative Backdrop Geometry */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="space-y-space-xs max-w-2xl">
              <div className="flex flex-wrap items-center gap-space-xs">
                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-white/15 backdrop-blur-md text-on-primary font-label-md text-label-md uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse" />
                  Term 2 Examination Sprint • Week 7
                </div>
                {/* Real streak from profiles.streak_days (hidden until the
                    profile row loads — never a fabricated number). */}
                {profile && (
                  <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-white/15 backdrop-blur-md text-on-primary font-label-md text-label-md">
                    <span className="text-base leading-none">🔥</span>
                    <span>{profile.streak_days ?? 0}-day streak</span>
                  </div>
                )}
              </div>

              <h1 className="font-headline-xl text-headline-xl tracking-tight text-on-primary">
                Welcome back{displayName ? `, ${displayName}` : ""}! 🚀
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
            {/* Readiness — temporary heuristic derived from lesson_progress
                (see readinessPct above), not a validated readiness metric. */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span> Readiness
              </span>
              <div className="flex items-baseline gap-space-xs">
                {loading ? (
                  <span className="material-symbols-outlined text-[28px] animate-spin text-white">progress_activity</span>
                ) : (
                  <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">
                    {readinessPct}%
                  </span>
                )}
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container/80">
                {loading ? "Loading your progress..." : "Based on your lesson progress so far"}
              </span>
            </div>

            {/* Lessons Completed — real counts from lesson_progress + the
                lesson catalog. */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">task_alt</span> Lessons Completed
              </span>
              <div className="flex items-baseline gap-space-xs">
                {loading ? (
                  <span className="material-symbols-outlined text-[28px] animate-spin text-white">progress_activity</span>
                ) : (
                  <span className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">
                    {completedLessonCount}
                    <span className="text-on-primary-container/60 font-normal text-headline-sm">/{totalLessons}</span>
                  </span>
                )}
                {!loading && (
                  <span className="font-label-sm text-label-sm text-white/90 bg-white/20 px-1.5 py-0.5 rounded">
                    {lessonsCompletedPct}%
                  </span>
                )}
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container/80">
                {loading
                  ? "Loading your progress..."
                  : totalLessons === 0
                    ? "No lessons in your curriculum yet"
                    : totalLessons - completedLessonCount === 0
                      ? "All modules complete — nice work!"
                      : `${totalLessons - completedLessonCount} modules remaining`}
              </span>
            </div>

            {/* Mock Exam Avg — exam_results has no data yet (the Exams &
                Past Papers flow isn't built), so this intentionally shows an
                honest empty state instead of querying an empty table or
                displaying a fabricated average. */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">query_stats</span> Mock Exam Avg
              </span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-lg text-headline-lg font-bold text-white/60 tracking-tight">—</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-primary-container/80">
                Take your first exam to see this
              </span>
            </div>

            {/* Daily Focus — no time-tracking data source yet; intentionally
                left as the existing placeholder (separate future task). */}
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
              <div className="pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
                    Diagnostic Intelligence
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                    Based on lesson progress
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Subject Strengths & Targeted Growth
                </h2>
              </div>

              {loading ? (
                <LoadingIndicator label="Loading your subject progress..." />
              ) : subjectStats.length === 0 ? (
                <EmptyState
                  action={
                    <Link
                      className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md transition-opacity hover:opacity-90"
                      to="/lessons"
                    >
                      <span className="material-symbols-outlined text-[18px]">menu_book</span>
                      <span>Browse lessons</span>
                    </Link>
                  }
                  icon="school"
                  message="Start a lesson to build your subject mastery. Your strengths and growth areas will appear here as you make progress."
                  title="No subject activity yet"
                />
              ) : (
                <>
                  {/* Mastered Strengths */}
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-tertiary flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[18px] text-tertiary-container">check_circle</span>
                        Mastered Strengths ({MASTERY_STRENGTH_THRESHOLD}%+ Average)
                      </span>
                      {strengths.length > 0 && (
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          Avg: {strengthsAverage}% Mastery
                        </span>
                      )}
                    </div>
                    {strengths.length === 0 ? (
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        No subjects averaging {MASTERY_STRENGTH_THRESHOLD}%+ yet — your strongest subjects will
                        appear here as you complete lessons.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                        {strengths.map((stat) => (
                          <div
                            className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow"
                            key={stat.subjectId}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-space-xs">
                                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                                  {stat.averagePct}% Mastery
                                </span>
                                <span className="material-symbols-outlined text-tertiary-container text-[20px]">school</span>
                              </div>
                              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                                {stat.name}
                              </h3>
                              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                {subjectDetailLabel(stat)}
                              </p>
                            </div>
                            <div className="pt-space-xs border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                              <span>{stat.startedCount} lessons started</span>
                              <span className="text-tertiary font-bold">Strong subject</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Growth Areas & Critical Weaknesses */}
                  <div className="space-y-space-sm pt-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-error flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[18px]">priority_high</span>
                        Growth Areas (Below {MASTERY_STRENGTH_THRESHOLD}% Average)
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {growthAreas.length} active subject{growthAreas.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    {growthAreas.length === 0 ? (
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Every subject you've started is averaging {MASTERY_STRENGTH_THRESHOLD}% or higher — nice
                        work.
                      </p>
                    ) : (
                      <div className="space-y-space-xs">
                        {growthAreas.map((stat) => {
                          const critical = stat.averagePct < GROWTH_CRITICAL_THRESHOLD;
                          return (
                            <div
                              className={`p-space-md rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-space-md transition-colors ${
                                critical
                                  ? "bg-error-container/20 hover:bg-error-container/30"
                                  : "bg-secondary-container/30 hover:bg-secondary-container/50"
                              }`}
                              key={stat.subjectId}
                            >
                              <div className="flex items-start gap-space-md">
                                <div
                                  className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${
                                    critical ? "bg-error text-on-error" : "bg-secondary text-on-secondary"
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-[22px]">school</span>
                                </div>
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-space-xs">
                                    <h4 className="font-headline-sm text-headline-sm text-on-surface">{stat.name}</h4>
                                    <span
                                      className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold ${
                                        critical ? "bg-error text-on-error" : "bg-secondary text-on-secondary"
                                      }`}
                                    >
                                      {stat.averagePct}% Mastery
                                    </span>
                                  </div>
                                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    {subjectDetailLabel(stat)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-space-sm shrink-0">
                                <Link
                                  className="px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm"
                                  to="/lessons"
                                >
                                  <span>Practice Now</span>
                                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Per-subject progress overview — real averages derived
                      from lesson_progress. The mock "school median"
                      benchmark bars had no data source, so they are dropped
                      until cohort data exists. */}
                  <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface font-semibold">
                        Your Average Lesson Progress by Subject
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        Cohort benchmarks coming soon
                      </span>
                    </div>
                    <div className="space-y-space-sm pt-space-xs">
                      {subjectStats.map((stat) => (
                        <div key={stat.subjectId}>
                          <div className="flex justify-between font-label-sm text-label-sm mb-1 text-on-surface-variant">
                            <span className="font-semibold text-on-surface">{stat.name}</span>
                            <span>{stat.averagePct}% average</span>
                          </div>
                          <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${stat.averagePct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
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
                <Link
                  className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
                  to="/lessons"
                >
                  <span>View All 16 Modules</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
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
            <div className="bg-linear-to-b from-primary-fixed/60 to-surface-container-lowest rounded-xl p-space-lg shadow-sm space-y-space-md relative overflow-hidden">
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
  );
}
