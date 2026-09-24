import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";
import type { Lesson, Subject } from "../types/database";

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

/**
 * Two-level chapter -> lesson selector. Follows the app's dropdown
 * conventions from Header.tsx / group.tsx: toggle button + open state + ref +
 * document click-outside, a surface-container-lowest rounded-xl shadow-xl
 * panel with an uppercase section label, and px-space-sm py-2 rounded-lg
 * items with a check icon on the selected entry.
 */
function LessonPicker({
  lessons,
  selectedLessonId,
  onSelect
}: {
  lessons: Lesson[];
  selectedLessonId: string | null;
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
        >
          <span className="truncate">{selectedLesson ? lessonLabel(selectedLesson) : "Select lesson"}</span>
          <span className="material-symbols-outlined text-[20px] text-on-surface-variant">expand_more</span>
        </button>
        {lessonOpen && (
          <div className="absolute left-0 z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl bg-surface-container-lowest shadow-xl p-space-xs">
            <div className="px-space-sm py-1 font-label-sm text-outline uppercase tracking-wider">Lesson</div>
            {chapterLessons.map((lesson) => (
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
              >
                <span className="truncate">{lessonLabel(lesson)}</span>
                {lesson.id === selectedLessonId && (
                  <span className="material-symbols-outlined text-[16px]">check</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Immersive reading area. Renders the lesson's content_md as formatted HTML
 * via react-markdown, constrained to a comfortable ~70-character measure.
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
            <blockquote className="my-space-md rounded-r-lg border-l-4 border-primary bg-surface-container-low py-space-xs pl-space-md">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a className="text-primary underline underline-offset-2" href={href}>
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img alt={alt ?? ""} className="my-space-md max-w-full rounded-lg" src={src} />
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

export default function Lessons() {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [subjectsError, setSubjectsError] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [lessonsError, setLessonsError] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const [focusMode, setFocusMode] = useState(false);

  // Load all subjects once on mount. Default to "Chemistry" when present,
  // otherwise fall back to the first subject.
  useEffect(() => {
    let cancelled = false;

    async function loadSubjects() {
      const { data, error } = await supabase.from("subjects").select("*");
      if (cancelled) return;
      if (error) {
        setSubjectsError(error.message);
        setSubjects([]);
        return;
      }
      const loaded = (data ?? []) as Subject[];
      setSubjects(loaded);
      const chemistry =
        loaded.find((subject) => (subject.name ?? "").trim().toLowerCase() === "chemistry") ?? loaded[0];
      setSelectedSubjectId(chemistry?.id ?? null);
    }

    loadSubjects();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load lessons whenever the selected subject changes.
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
      setSelectedLessonId(loaded[0]?.id ?? null);
    }

    loadLessons();
    return () => {
      cancelled = true;
    };
  }, [selectedSubjectId]);

  const selectedSubject = subjects?.find((subject) => subject.id === selectedSubjectId) ?? null;
  const selectedLesson = lessons?.find((lesson) => lesson.id === selectedLessonId) ?? null;

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
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
              Pick a subject, drill into a unit, and read the full lesson content — everything here is loaded
              live from your curriculum database.
            </p>
          </div>
        </header>

        {/* Subject selector (real data from the `subjects` table) */}
        {subjects !== null && subjects.length > 0 && (
          <section className="relative bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-sm">
              <label className="font-label-md text-label-md text-on-surface-variant flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>SUBJECT</span>
              </label>
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  className={`px-space-md py-2 rounded-full font-label-lg text-label-lg transition-colors ${
                    subject.id === selectedSubjectId
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                  onClick={() => setSelectedSubjectId(subject.id)}
                >
                  {subject.name ?? "Untitled subject"}
                </button>
              ))}
            </div>
            {selectedSubject && (
              <span className="font-label-sm text-label-sm text-on-surface-variant self-start md:self-auto">
                {lessonsError
                  ? "Couldn't load lessons"
                  : lessons === null
                    ? "Loading lessons…"
                    : `${lessons.length} lessons available`}
              </span>
            )}
          </section>
        )}

        {/* Lesson workspace */}
        {subjects === null ? (
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
        ) : lessons === null ? (
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
            {/* Chapter -> lesson picker + focus toggle */}
            <div className="p-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border-b border-outline-variant">
              <LessonPicker
                lessons={lessons}
                selectedLessonId={selectedLessonId}
                onSelect={handleSelectLesson}
              />
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex-shrink-0"
                onClick={() => setFocusMode(true)}
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                <span>Focus Mode</span>
              </button>
            </div>
            {/* Reading area */}
            <div className="p-space-lg">
              {selectedLesson ? (
                <LessonContent lesson={selectedLesson} />
              ) : (
                <p className="mx-auto max-w-[70ch] font-body-md text-body-md text-on-surface-variant">
                  Select a lesson above to start reading.
                </p>
              )}
            </div>
          </section>
        )}
      </div>

      {/* Focus Mode: full-screen overlay rendered by this page so the fixed
          Sidebar (z-50) and Header (z-40) are completely hidden while
          reading. z-[60] sits above both regardless of DOM order. */}
      {focusMode && selectedLesson && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-background">
          <div className="sticky top-0 z-10 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur-md px-space-lg py-space-sm">
            <div className="flex flex-wrap items-center justify-between gap-space-md">
              <LessonPicker
                lessons={lessons ?? []}
                selectedLessonId={selectedLessonId}
                onSelect={handleSelectLesson}
              />
              <button
                className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex-shrink-0"
                onClick={() => setFocusMode(false)}
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen_exit</span>
                <span>Exit Focus Mode</span>
              </button>
            </div>
          </div>
          <div className="px-space-lg py-space-lg">
            <LessonContent lesson={selectedLesson} />
          </div>
        </div>
      )}
    </div>
  );
}
