import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";
import type { Lesson, Subject } from "../types/database";

// Shape returned by the lesson_progress query below. The embedded
// `lessons(subject_id)` join lets progress be rolled up per subject for the
// "Recommended for you" card without a second request.
interface ProgressRow {
  lesson_id: string;
  progress_pct: number | null;
  lessons: { subject_id: string } | null;
}

function LoadingIndicator({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl bg-surface-container-lowest rounded-xl shadow-sm">
      <span className="material-symbols-outlined text-[32px] text-primary animate-spin">progress_activity</span>
      <span className="font-label-md text-label-md text-on-surface-variant">{label}</span>
    </div>
  );
}

function EmptyState({ icon, title, message }: { icon: string; title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-sm py-space-xl px-space-lg bg-surface-container-lowest rounded-xl shadow-sm text-center">
      <span className="material-symbols-outlined text-[40px] text-on-surface-variant">{icon}</span>
      <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant max-w-md">{message}</p>
    </div>
  );
}

function lessonLabel(lesson: Lesson) {
  return `${lesson.chapter_number ?? "-"}.${lesson.lesson_number ?? "-"} ${lesson.title ?? "Untitled lesson"}`;
}

/** Stable chapter -> lesson ordering used for Next/Previous navigation. */
function compareLessons(a: Lesson, b: Lesson) {
  const chapterA = a.chapter_number ?? Number.POSITIVE_INFINITY;
  const chapterB = b.chapter_number ?? Number.POSITIVE_INFINITY;
  if (chapterA !== chapterB) return chapterA - chapterB;
  const lessonA = a.lesson_number ?? Number.POSITIVE_INFINITY;
  const lessonB = b.lesson_number ?? Number.POSITIVE_INFINITY;
  return lessonA - lessonB;
}

function progressLabel(progressPct: number | null | undefined) {
  if (progressPct == null) return "Not started";
  return `${Math.round(progressPct)}%`;
}

/**
 * Two-level chapter -> lesson selector. Follows the app's dropdown
 * conventions from Header.tsx / group.tsx: toggle button + open state + ref +
 * document click-outside, a surface-container-lowest rounded-xl shadow-xl
 * panel with an uppercase section label, and px-space-sm py-2 rounded-lg
 * items with a check icon on the selected entry. Each lesson row also shows
 * the user's progress from the lesson_progress table.
 */
function LessonPicker({
  lessons,
  selectedLessonId,
  progressByLessonId,
  onSelect
}: {
  lessons: Lesson[];
  selectedLessonId: string | null;
  progressByLessonId: Record<string, number>;
  onSelect: (lesson: Lesson) => void;
}) {
  const [chapterOpen, setChapterOpen] = useState(false);
  const [lessonOpen, setLessonOpen] = useState(false);
  const chapterRef = useRef<HTMLDivElement>(null);
  const lessonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chapterRef.current && !chapterRef.current.contains(event.target as Node)) {
        setChapterOpen(false);
      }
      if (lessonRef.current && !lessonRef.current.contains(event.target as Node)) {
        setLessonOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const chapters = useMemo(() => {
    const numbers = lessons
      .map((lesson) => lesson.chapter_number)
      .filter((chapterNumber): chapterNumber is number => chapterNumber != null);
    return Array.from(new Set(numbers)).sort((a, b) => a - b);
  }, [lessons]);

  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId) ?? null;
  const selectedChapter = selectedLesson?.chapter_number ?? chapters[0] ?? null;

  const chapterLessons = useMemo(
    () =>
      lessons
        .filter((lesson) => lesson.chapter_number === selectedChapter && lesson.lesson_number != null)
        .sort((a, b) => (a.lesson_number ?? 0) - (b.lesson_number ?? 0)),
    [lessons, selectedChapter]
  );

  const handleSelectChapter = (chapter: number) => {
    setChapterOpen(false);
    const firstInChapter = lessons
      .filter((lesson) => lesson.chapter_number === chapter && lesson.lesson_number != null)
      .sort((a, b) => (a.lesson_number ?? 0) - (b.lesson_number ?? 0))[0];
    if (firstInChapter) onSelect(firstInChapter);
  };

  return (
    <div className="flex flex-wrap items-center gap-space-sm flex-1 min-w-0">
      {/* Level 1: chapter (unit) selector */}
      <div className="relative flex-shrink-0" ref={chapterRef}>
        <button
          className="flex w-44 items-center justify-between gap-space-xs rounded-xl bg-surface-container-low px-space-md py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container text-left"
          onClick={() => {
            setChapterOpen((open) => !open);
            setLessonOpen(false);
          }}
          type="button"
        >
          <span className="truncate">
            {selectedChapter != null ? `Unit ${selectedChapter}` : "Select unit"}
          </span>
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">expand_more</span>
        </button>
        {chapterOpen && (
          <div className="absolute left-0 z-50 mt-2 max-h-72 w-44 overflow-y-auto rounded-xl bg-surface-container-lowest shadow-xl p-space-xs">
            <div className="px-space-sm py-1 font-label-sm text-outline uppercase tracking-wider">Unit</div>
            {chapters.map((chapter) => (
              <button
                key={chapter}
                className={`w-full flex items-center justify-between px-space-sm py-2 rounded-lg font-label-md text-label-md transition-colors ${
                  chapter === selectedChapter
                    ? "bg-surface-container-low text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
                onClick={() => handleSelectChapter(chapter)}
                type="button"
              >
                <span>Unit {chapter}</span>
                {chapter === selectedChapter && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Level 2: lesson selector scoped to the selected chapter */}
      <div className="relative min-w-[240px] flex-1" ref={lessonRef}>
        <button
          className="flex w-full items-center justify-between gap-space-xs rounded-xl bg-surface-container-low px-space-md py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container text-left"
          onClick={() => {
            setLessonOpen((open) => !open);
            setChapterOpen(false);
          }}
          type="button"
        >
          <span className="truncate">{selectedLesson ? lessonLabel(selectedLesson) : "Select lesson"}</span>
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">expand_more</span>
        </button>
        {lessonOpen && (
          <div className="absolute left-0 z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl bg-surface-container-lowest shadow-xl p-space-xs">
            <div className="px-space-sm py-1 font-label-sm text-outline uppercase tracking-wider">Lesson</div>
            {chapterLessons.map((lesson) => {
              const progressPct = progressByLessonId[lesson.id];
              const progressClass =
                progressPct == null
                  ? "text-outline"
                  : progressPct >= 100
                    ? "text-primary"
                    : "text-on-surface-variant";
              return (
                <button
                  key={lesson.id}
                  className={`w-full flex items-center justify-between gap-space-sm px-space-sm py-2 rounded-lg font-label-md text-label-md transition-colors ${
                    lesson.id === selectedLessonId
                      ? "bg-surface-container-low text-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                  onClick={() => {
                    setLessonOpen(false);
                    onSelect(lesson);
                  }}
                  type="button"
                >
                  <span className="truncate flex-1 min-w-0 text-left">{lessonLabel(lesson)}</span>
                  <span className={`shrink-0 font-label-sm text-label-sm ${progressClass}`}>
                    {progressLabel(progressPct)}
                  </span>
                  {lesson.id === selectedLessonId && (
                    <span className="material-symbols-outlined text-[16px] shrink-0">check</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Immersive reading area. Renders the lesson's content_md as formatted HTML
 * via react-markdown, constrained to a comfortable ~70-character measure.
 * Blockquotes (the "Activity" / "At the end of this section" callouts in the
 * content) render as distinct callout boxes — colored left border, subtle
 * tinted background, rounded corners — and images are centered, responsive,
 * and capped so they never overflow the reading column.
 */
function LessonContent({ lesson }: { lesson: Lesson }) {
  if (!lesson.content_md) {
    return (
      <p className="mx-auto max-w-[70ch] font-body-md text-body-md text-on-surface-variant">
        This lesson doesn't have written content yet. Pick another lesson or check back later.
      </p>
    );
  }

  return (
    <article className="mx-auto max-w-[70ch] font-body-md text-body-md leading-relaxed text-on-surface">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="mb-space-md mt-space-xl font-headline-lg text-headline-lg tracking-tight text-on-surface">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-space-md mt-space-xl font-headline-md text-headline-md text-on-surface">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-space-sm mt-space-lg font-headline-sm text-headline-sm text-on-surface">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-space-xs mt-space-md font-label-lg text-label-lg text-on-surface">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="mb-space-xs mt-space-md font-label-md text-label-md text-on-surface">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="mb-space-xs mt-space-md font-label-sm text-label-sm text-on-surface-variant">
              {children}
            </h6>
          ),
          p: ({ children }) => <p className="mb-space-md">{children}</p>,
          ul: ({ children }) => <ul className="mb-space-md list-disc pl-space-md">{children}</ul>,
          ol: ({ children }) => <ol className="mb-space-md list-decimal pl-space-md">{children}</ol>,
          strong: ({ children }) => <strong className="font-semibold text-on-surface">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-space-lg rounded-xl border-l-4 border-primary bg-primary-container/30 p-space-md">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a className="text-primary underline underline-offset-2" href={href}>
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              alt={alt ?? ""}
              className="mx-auto my-space-lg block h-auto max-w-full rounded-lg lg:max-w-[560px]"
              src={src}
            />
          ),
          hr: () => <hr className="my-space-lg border-outline-variant" />,
          pre: ({ children }) => (
            <pre className="my-space-md overflow-x-auto rounded-lg bg-surface-container-low p-space-md font-mono text-body-sm leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isBlock = typeof className === "string" && className.startsWith("language-");
            if (isBlock) {
              return <code className={`${className ?? ""} font-mono text-body-sm`}>{children}</code>;
            }
            return (
              <code className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-body-sm">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-space-md overflow-x-auto">
              <table className="w-full border-collapse font-body-sm text-body-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-outline-variant px-space-sm py-2 text-left font-label-md text-label-md text-on-surface">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-outline-variant px-space-sm py-2 align-top">{children}</td>
          )
        }}
      >
        {lesson.content_md}
      </ReactMarkdown>
    </article>
  );
}

/**
 * Scaffolding for a future feature: a clearly labeled placeholder panel at
 * the end of every lesson. No real video is generated or embedded.
 */
function VideoPlaceholder() {
  return (
    <div className="mx-auto mt-space-xl max-w-[70ch]">
      <div className="flex flex-col items-center gap-space-sm rounded-xl border border-dashed border-outline-variant bg-surface-container-low px-space-lg py-space-lg text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-high">
          <span className="material-symbols-outlined text-[28px] text-on-surface-variant">smart_display</span>
        </span>
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Video walkthrough coming soon</h3>
        <p className="max-w-md font-body-md text-body-md text-on-surface-variant">
          We're putting together a short video walkthrough for this lesson. For now, the written content above has
          everything you need.
        </p>
      </div>
    </div>
  );
}

/**
 * End-of-lesson actions: "Mark as Complete" (writes 100 to lesson_progress)
 * next to the Previous / Next Lesson navigation buttons.
 */
function LessonFooter({
  hasPreviousLesson,
  hasNextLesson,
  progressPct,
  markingComplete,
  onMarkComplete,
  onPrevious,
  onNext
}: {
  hasPreviousLesson: boolean;
  hasNextLesson: boolean;
  progressPct: number | null;
  markingComplete: boolean;
  onMarkComplete: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const complete = progressPct != null && progressPct >= 100;

  return (
    <div className="mx-auto mt-space-lg max-w-[70ch] flex flex-col gap-space-md">
      {/* Mark as Complete */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md rounded-xl bg-surface-container-low p-space-md">
        <div className="flex items-center gap-space-sm">
          <span
            className={`material-symbols-outlined text-[22px] ${complete ? "text-primary" : "text-on-surface-variant"}`}
          >
            {complete ? "task_alt" : "check_circle"}
          </span>
          <div>
            <p className="font-label-lg text-label-lg text-on-surface">
              {complete ? "Lesson completed" : "Finished this lesson?"}
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {complete
                ? "Nice work — this one is checked off."
                : "Mark it as complete to keep your progress up to date."}
            </p>
          </div>
        </div>
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex-shrink-0 self-start sm:self-auto"
          disabled={complete || markingComplete}
          onClick={onMarkComplete}
          type="button"
        >
          <span className={`material-symbols-outlined text-[18px] ${markingComplete ? "animate-spin" : ""}`}>
            {markingComplete ? "progress_activity" : complete ? "check" : "task_alt"}
          </span>
          <span>{markingComplete ? "Saving..." : complete ? "Completed" : "Mark as Complete"}</span>
        </button>
      </div>

      {/* Previous / Next Lesson */}
      <div className="flex items-center justify-between gap-space-md">
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!hasPreviousLesson}
          onClick={onPrevious}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Previous</span>
        </button>
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!hasNextLesson}
          onClick={onNext}
          type="button"
        >
          <span>Next Lesson</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

/**
 * Persistent, minimal navigation bar shown only while Focus Mode is active.
 * It is rendered as the last direct child of the Focus Mode overlay (which is
 * that view's scroll container) with `sticky bottom-0`, so it stays pinned
 * to the bottom edge of the screen at every scroll position — the
 * bottom-of-screen counterpart to the overlay's existing sticky top bar.
 * Because it remains in flow, it never covers the lesson content or the
 * end-of-lesson footer; when you do scroll to the very end it simply settles
 * into place right below them. It reuses the exact same previousLesson /
 * nextLesson state and handlers as the in-flow LessonFooter, so the
 * disable-at-first/last-lesson behavior is identical in both views.
 */
function FocusModeNavBar({
  hasPreviousLesson,
  hasNextLesson,
  onPrevious,
  onNext,
  onExit
}: {
  hasPreviousLesson: boolean;
  hasNextLesson: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-[5] border-t border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-space-sm">
      <div className="mx-auto flex max-w-[70ch] items-center justify-between gap-space-md">
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!hasPreviousLesson}
          onClick={onPrevious}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span className="hidden sm:inline">Previous</span>
        </button>
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-sm text-label-sm transition-colors"
          onClick={onExit}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">fullscreen_exit</span>
          <span>Exit Focus Mode</span>
        </button>
        <button
          className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!hasNextLesson}
          onClick={onNext}
          type="button"
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

export default function Lessons() {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);
  // The signed-in user's lesson_progress rows, joined with lessons(subject_id)
  // so progress can be rolled up per subject for the recommendation card.
  const [progressRows, setProgressRows] = useState<ProgressRow[] | null>(null);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [lessonsError, setLessonsError] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const [focusMode, setFocusMode] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);

  const focusOverlayRef = useRef<HTMLDivElement>(null);
  // Snapshot taken when a subject is chosen from the landing view: which
  // lesson to auto-open once that subject's lessons finish loading (the
  // "Recommended for you" card jumps to the first unfinished lesson).
  const initialLessonPreference = useRef<{ preferIncomplete: boolean; progress: Record<string, number> }>({
    preferIncomplete: false,
    progress: {}
  });

  // lesson_id -> progress_pct, for the picker rows and the footer.
  const progressByLessonId = useMemo(() => {
    const map: Record<string, number> = {};
    for (const row of progressRows ?? []) {
      if (row.lesson_id && row.progress_pct != null) {
        map[row.lesson_id] = Number(row.progress_pct);
      }
    }
    return map;
  }, [progressRows]);

  // subject_id -> average progress across the lessons the user has started.
  const subjectCompletion = useMemo(() => {
    const totals = new Map<string, { sum: number; count: number }>();
    for (const row of progressRows ?? []) {
      const subjectId = row.lessons?.subject_id;
      if (!subjectId || row.progress_pct == null) continue;
      const total = totals.get(subjectId) ?? { sum: 0, count: 0 };
      total.sum += Number(row.progress_pct);
      total.count += 1;
      totals.set(subjectId, total);
    }
    const averages: Record<string, number> = {};
    for (const [subjectId, total] of totals.entries()) {
      averages[subjectId] = total.sum / total.count;
    }
    return averages;
  }, [progressRows]);

  // Lightweight "Recommended for you" placeholder: the subject the user is
  // least far along in, or simply the first subject when no progress data
  // exists yet.
  const recommendation = useMemo(() => {
    if (!subjects || subjects.length === 0) return null;
    let leastComplete: { subject: Subject; average: number } | null = null;
    for (const subject of subjects) {
      const average = subjectCompletion[subject.id];
      if (average == null) continue;
      if (!leastComplete || average < leastComplete.average) {
        leastComplete = { subject, average };
      }
    }
    if (!leastComplete) {
      return { subject: subjects[0], label: "Start here" };
    }
    return {
      subject: leastComplete.subject,
      label: leastComplete.average > 0 ? "Pick up where you left off" : "Start here"
    };
  }, [subjects, subjectCompletion]);

  // Load subjects + the user's lesson progress once on mount. No subject is
  // auto-selected: the landing view shows the subject list first.
  useEffect(() => {
    let cancelled = false;

    async function loadSubjectsAndProgress() {
      const { data: subjectData, error: subjectError } = await supabase.from("subjects").select("*");
      if (cancelled) return;
      if (subjectError) {
        setSubjectsError(subjectError.message);
        setSubjects([]);
        return;
      }
      setSubjects((subjectData ?? []) as Subject[]);

      const { data: progressData, error: progressError } = await supabase
        .from("lesson_progress")
        .select("lesson_id, progress_pct, lessons(subject_id)");
      if (cancelled) return;
      if (progressError) {
        // Progress enriches the landing view but isn't critical; fall back
        // to "no progress yet" rather than blocking the page.
        console.warn("Failed to load lesson progress:", progressError.message);
        setProgressRows([]);
        return;
      }
      setProgressRows((progressData ?? []) as ProgressRow[]);
    }

    loadSubjectsAndProgress();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load lessons whenever a subject is selected from the landing view.
  useEffect(() => {
    if (!selectedSubjectId) return;

    let cancelled = false;
    setLessons(null);
    setLessonsError(null);
    setSelectedLessonId(null);

    async function loadLessons() {
      const { data, error } = await supabase
        .from("lessons")
        .select("id, subject_id, chapter_number, lesson_number, title, content_md")
        .eq("subject_id", selectedSubjectId)
        .order("chapter_number", { ascending: true })
        .order("lesson_number", { ascending: true });
      if (cancelled) return;
      if (error) {
        setLessonsError(error.message);
        setLessons([]);
        return;
      }
      const loaded = (data ?? []) as Lesson[];
      setLessons(loaded);

      // Auto-open the first lesson — or, when the user clicked the
      // "Recommended for you" card, the first lesson that isn't complete.
      const preference = initialLessonPreference.current;
      const target = preference.preferIncomplete
        ? loaded.find((lesson) => (preference.progress[lesson.id] ?? 0) < 100) ?? loaded[0]
        : loaded[0];
      setSelectedLessonId(target?.id ?? null);
    }

    loadLessons();
    return () => {
      cancelled = true;
    };
  }, [selectedSubjectId]);

  // Progress tracking: when a lesson is opened, make sure a lesson_progress
  // row exists for (user_id, lesson_id). New rows start at 10% ("started");
  // existing rows are left untouched (ignoreDuplicates), so re-opening a
  // completed lesson never resets it.
  useEffect(() => {
    if (selectedLessonId === null || selectedSubjectId === null) return;
    const lessonId: string = selectedLessonId;
    const subjectId: string = selectedSubjectId;
    let cancelled = false;

    (async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      const { error } = await supabase.from("lesson_progress").upsert(
        { user_id: user.id, lesson_id: lessonId, progress_pct: 10 },
        { onConflict: "user_id,lesson_id", ignoreDuplicates: true }
      );
      if (cancelled) return;
      if (error) {
        console.warn("Failed to record lesson progress:", error.message);
        return;
      }
      // Mirror the row locally (only when it's genuinely new) so the picker
      // percentages and the recommendation stay in sync without a refetch.
      setProgressRows((rows) => {
        const current = rows ?? [];
        if (current.some((row) => row.lesson_id === lessonId)) return rows;
        return [...current, { lesson_id: lessonId, progress_pct: 10, lessons: { subject_id: subjectId } }];
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedLessonId, selectedSubjectId]);

  const selectedSubject = subjects?.find((subject) => subject.id === selectedSubjectId) ?? null;
  const selectedLesson = lessons?.find((lesson) => lesson.id === selectedLessonId) ?? null;
  const selectedLessonProgress = selectedLessonId ? (progressByLessonId[selectedLessonId] ?? null) : null;

  // Sequential navigation: chapter_number -> lesson_number within the subject.
  const orderedLessons = useMemo(() => [...(lessons ?? [])].sort(compareLessons), [lessons]);
  const currentIndex = selectedLessonId
    ? orderedLessons.findIndex((lesson) => lesson.id === selectedLessonId)
    : -1;
  const previousLesson = currentIndex > 0 ? orderedLessons[currentIndex - 1] ?? null : null;
  const nextLesson =
    currentIndex !== -1 && currentIndex < orderedLessons.length - 1
      ? orderedLessons[currentIndex + 1] ?? null
      : null;

  const recordLocalProgress = (lessonId: string, subjectId: string, progressPct: number) => {
    setProgressRows((rows) => {
      const current = rows ?? [];
      const index = current.findIndex((row) => row.lesson_id === lessonId);
      if (index === -1) {
        return [...current, { lesson_id: lessonId, progress_pct: progressPct, lessons: { subject_id: subjectId } }];
      }
      if (current[index].progress_pct === progressPct) return rows;
      const next = [...current];
      next[index] = { ...current[index], progress_pct: progressPct };
      return next;
    });
  };

  const handleMarkComplete = async () => {
    if (selectedLessonId === null || selectedSubjectId === null || markingComplete) return;
    const lessonId = selectedLessonId;
    const subjectId = selectedSubjectId;

    setMarkingComplete(true);
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            progress_pct: 100,
            updated_at: new Date().toISOString()
          },
          { onConflict: "user_id,lesson_id" }
        );
      if (error) {
        console.warn("Failed to mark lesson as complete:", error.message);
        return;
      }
      recordLocalProgress(lessonId, subjectId, 100);
    } finally {
      setMarkingComplete(false);
    }
  };

  const goToLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    // Start the newly opened lesson from the top of the reading area.
    if (focusMode) {
      focusOverlayRef.current?.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  // Shared Previous/Next/Exit handlers: used by BOTH the in-flow LessonFooter
  // and the persistent FocusModeNavBar, so the navigation logic and the
  // disable-at-first/last-lesson behavior can never drift between views.
  const handlePreviousLesson = () => {
    if (previousLesson) goToLesson(previousLesson);
  };

  const handleNextLesson = () => {
    if (nextLesson) goToLesson(nextLesson);
  };

  const handleExitFocusMode = () => setFocusMode(false);

  const openSubject = (subject: Subject, preferIncompleteLesson: boolean) => {
    initialLessonPreference.current = {
      preferIncomplete: preferIncompleteLesson,
      progress: progressByLessonId
    };
    setFocusMode(false);
    setLessons(null);
    setLessonsError(null);
    setSelectedLessonId(null);
    setSelectedSubjectId(subject.id);
  };

  const handleBackToSubjects = () => {
    setFocusMode(false);
    setSelectedLessonId(null);
    setLessons(null);
    setLessonsError(null);
    setSelectedSubjectId(null);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden px-space-lg py-space-lg space-y-space-xl">
        {/* Subtle Ambient Glow Overlay (parent contained) */}
        <div className="absolute -top-32 right-12 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none" />
        <div className="absolute top-96 left-0 w-80 h-80 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none" />

        {/* Page Title Header */}
        <header className="relative">
          <div>
            <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-wide mb-1">
              <span className="material-symbols-outlined text-[16px]">layers</span>
              <span>CURRICULUM ARCHITECTURE</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">ACADEMIC YEAR 2024-2025</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Curriculum & Lessons
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
              Pick a subject to browse its units and lessons, then dive into the full lesson content — everything
              here is loaded live from your curriculum database.
            </p>
          </div>
        </header>

        {selectedSubjectId === null ? (
          /* ------------------------------ Landing view ------------------------------ */
          subjects === null ? (
            <LoadingIndicator label="Loading subjects..." />
          ) : subjectsError ? (
            <EmptyState
              icon="error"
              title="Couldn't load subjects"
              message={`Something went wrong while fetching subjects: ${subjectsError}`}
            />
          ) : subjects.length === 0 ? (
            <EmptyState
              icon="school"
              title="No subjects yet"
              message="Your curriculum database doesn't have any subjects configured yet. Add subjects in Supabase to get started."
            />
          ) : (
            <>
              {/* Subject list */}
              <section className="relative">
                <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant tracking-wide mb-space-md">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>ALL SUBJECTS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  {subjects.map((subject) => (
                    <button
                      key={subject.id}
                      className="group flex w-full flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-colors hover:bg-surface-container-low text-left"
                      onClick={() => openSubject(subject, false)}
                      type="button"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-container text-on-primary">
                          <span className="material-symbols-outlined text-[22px]">school</span>
                        </span>
                        {subject.category && (
                          <span className="rounded-full bg-surface-container-low px-space-sm py-0.5 font-label-sm text-label-sm text-on-surface-variant">
                            {subject.category}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          {subject.name ?? "Untitled subject"}
                        </h3>
                        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">
                          Browse this subject's units and lessons.
                        </p>
                      </div>
                      <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary">
                        <span>View lessons</span>
                        <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
                          arrow_forward
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Recommended for you (lightweight placeholder logic) */}
              {recommendation && progressRows !== null && (
                <section className="relative bg-surface-container-lowest rounded-xl shadow-sm p-space-md">
                  <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-wide mb-space-sm">
                    <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                    <span>RECOMMENDED FOR YOU</span>
                  </div>
                  <button
                    className="flex w-full flex-col gap-space-sm md:flex-row md:items-center md:justify-between rounded-xl bg-primary-container p-space-md text-left transition-opacity hover:opacity-95"
                    onClick={() => openSubject(recommendation.subject, true)}
                    type="button"
                  >
                    <div className="min-w-0">
                      <p className="font-label-md text-label-md text-on-primary">{recommendation.label}</p>
                      <h3 className="font-headline-md text-headline-md text-on-primary">
                        {recommendation.subject.name ?? "Untitled subject"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-primary/80">
                        {recommendation.label === "Start here"
                          ? "We'll open the first lesson so you can dive right in."
                          : "We'll take you to your first unfinished lesson."}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-space-xs font-label-lg text-label-lg text-on-primary">
                      <span>Continue</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </span>
                  </button>
                </section>
              )}
            </>
          )
        ) : (
          /* --------------------------- Subject workspace view --------------------------- */
          lessons === null ? (
            <LoadingIndicator label={`Loading lessons for ${selectedSubject?.name ?? "the selected subject"}...`} />
          ) : lessonsError ? (
            <EmptyState
              icon="error"
              title="Couldn't load lessons"
              message={`Something went wrong while fetching lessons: ${lessonsError}`}
            />
          ) : lessons.length === 0 ? (
            <EmptyState
              icon="menu_book"
              title="No lessons yet"
              message={`${selectedSubject?.name ?? "This subject"} doesn't have any lessons yet. Check back once content has been added.`}
            />
          ) : (
            <section className="relative bg-surface-container-lowest rounded-xl shadow-sm">
              {/* Back to subjects + chapter -> lesson picker + focus toggle */}
              <div className="p-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border-b border-outline-variant">
                <div className="flex flex-wrap items-center gap-space-sm flex-1 min-w-0">
                  <button
                    className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex-shrink-0"
                    onClick={handleBackToSubjects}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span className="hidden sm:inline">All subjects</span>
                  </button>
                  <LessonPicker
                    lessons={lessons}
                    progressByLessonId={progressByLessonId}
                    selectedLessonId={selectedLessonId}
                    onSelect={goToLesson}
                  />
                </div>
                <button
                  className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex-shrink-0"
                  onClick={() => setFocusMode(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                  <span>Focus Mode</span>
                </button>
              </div>
              {/* Reading area */}
              <div className="p-space-lg">
                {selectedLesson ? (
                  <>
                    <div className="mx-auto mb-space-lg max-w-[70ch]">
                      <p className="font-label-md text-label-md text-primary tracking-wide uppercase">
                        {selectedSubject?.name ?? "Subject"}
                        <span className="text-outline-variant"> / </span>
                        <span className="text-on-surface-variant">{lessons.length} lessons</span>
                      </p>
                    </div>
                    <LessonContent lesson={selectedLesson} />
                    <VideoPlaceholder />
                    <LessonFooter
                      hasNextLesson={nextLesson != null}
                      hasPreviousLesson={previousLesson != null}
                      markingComplete={markingComplete}
                      progressPct={selectedLessonProgress}
                      onMarkComplete={handleMarkComplete}
                      onNext={handleNextLesson}
                      onPrevious={handlePreviousLesson}
                    />
                  </>
                ) : (
                  <p className="mx-auto max-w-[70ch] font-body-md text-body-md text-on-surface-variant">
                    Select a lesson above to start reading.
                  </p>
                )}
              </div>
            </section>
          )
        )}
      </div>

      {/* Focus Mode: full-screen overlay rendered by this page so the fixed
          Sidebar (z-50) and Header (z-40) are completely hidden while
          reading. z-[60] sits above both regardless of DOM order. The
          overlay itself is the scroll container: the sticky top bar keeps
          the lesson picker + exit control pinned at the top, and the
          FocusModeNavBar (last child, sticky bottom-0) keeps Previous /
          Exit / Next pinned to the bottom of the screen at every scroll
          position. */}
      {focusMode && selectedLesson && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-background" ref={focusOverlayRef}>
          <div className="sticky top-0 z-10 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-space-sm">
            <div className="flex flex-wrap items-center justify-between gap-space-md">
              <LessonPicker
                lessons={lessons ?? []}
                progressByLessonId={progressByLessonId}
                selectedLessonId={selectedLessonId}
                onSelect={goToLesson}
              />
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex-shrink-0"
                onClick={handleExitFocusMode}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen_exit</span>
                <span>Exit Focus Mode</span>
              </button>
            </div>
          </div>
          <div className="px-space-lg py-space-lg">
            <LessonContent lesson={selectedLesson} />
            <VideoPlaceholder />
            <LessonFooter
              hasNextLesson={nextLesson != null}
              hasPreviousLesson={previousLesson != null}
              markingComplete={markingComplete}
              progressPct={selectedLessonProgress}
              onMarkComplete={handleMarkComplete}
              onNext={handleNextLesson}
              onPrevious={handlePreviousLesson}
            />
          </div>
          {/* Persistent Focus Mode navigation, pinned to the bottom of the
              screen for the entire reading session. z-[5] keeps it above the
              static lesson content but below the top bar (z-10), so the
              lesson picker's dropdowns still open above it on very short
              viewports. */}
          <FocusModeNavBar
            hasPreviousLesson={previousLesson != null}
            hasNextLesson={nextLesson != null}
            onExit={handleExitFocusMode}
            onNext={handleNextLesson}
            onPrevious={handlePreviousLesson}
          />
        </div>
      )}
    </div>
  );
}
