export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment' | 'interactive';
  content: string;
  videoUrl?: string;
  resources?: LessonResource[];
  isCompleted?: boolean;
  progress?: number;
  order: number;
  objectives: string[];
  transcript?: string;
  notes?: string;
}

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'code' | 'image';
  url: string;
  description?: string;
}

export interface LessonProgress {
  lessonId: string;
  courseId: string;
  userId: string;
  isCompleted: boolean;
  progress: number;
  timeSpent: number;
  lastAccessed: string;
  notes?: string;
}