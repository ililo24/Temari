// TypeScript interfaces matching supabase/schema.sql.
// Use these to type Supabase query results, e.g.:
//   const { data } = await supabase.from("profiles").select("*");
//   const profiles = data as Profile[];
// Timestamps (timestamptz) and dates arrive as ISO strings from Supabase.

export interface Profile {
  id: string;
  full_name: string | null;
  grade_level: string | null;
  academic_term: string | null;
  streak_days: number;
  created_at: string;
}

export interface Subject {
  id: string;
  name: string | null;
  category: string | null;
}

export interface SubjectMastery {
  id: string;
  user_id: string;
  subject_id: string;
  mastery_pct: number | null;
  questions_solved: number | null;
  updated_at: string;
}

export interface Lesson {
  id: string;
  subject_id: string;
  title: string | null;
  lesson_order: number | null;
  total_lessons: number | null;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  progress_pct: number | null;
  updated_at: string;
}

export interface ExamResult {
  id: string;
  user_id: string;
  title: string | null;
  score: number | null;
  max_score: number;
  taken_at: string | null;
  diagnostic_note: string | null;
}

export interface StudyGoal {
  id: string;
  user_id: string;
  description: string | null;
  is_complete: boolean;
  target_date: string;
}

export interface AiRecommendation {
  id: string;
  user_id: string;
  subject_id: string;
  message: string | null;
  created_at: string;
}
