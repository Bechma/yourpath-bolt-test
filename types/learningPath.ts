export interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalCourses: number;
  difficultyDistribution: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  subjectArea: string;
  progress?: number; // 0-100 percentage
  completionStatus: 'not-started' | 'in-progress' | 'completed';
  createdAt: string;
  imageUrl: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'recently-added';
export type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';
export type CompletionFilter = 'all' | 'not-started' | 'in-progress' | 'completed';