export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "2h 30m"
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  instructor: string;
  rating: number;
  enrolledStudents: number;
  thumbnailUrl: string;
  isCompleted?: boolean;
  progress?: number; // 0-100 percentage
  estimatedTime: string;
  topics: string[];
  learningObjectives: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isCompleted?: boolean;
}