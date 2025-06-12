export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  contentType: 'text' | 'video' | 'interactive';
  estimatedTime: number; // in minutes
  status: 'not_started' | 'in_progress' | 'completed';
  resources?: string[];
  quiz?: {
    questions: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
  createdBy: string; // username of creator
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  objective: string; // main learning objective
  instructor: string;
  createdBy: string; // username of creator
  prerequisites: string[];
  lessons: Lesson[];
  rating: number;
  votes: number;
  upvotes: number;
  downvotes: number;
  duration: number; // total minutes
  category: string;
  tags: string[];
  status: 'public' | 'private';
  progress: number; // 0-100
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  estimatedTime: number; // total hours
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Guru';
  visibility: 'public' | 'private';
  courses: Course[];
  totalCourses: number;
  progress: number; // 0-100
  image: string;
  createdBy: string; // username of creator
  createdAt: string;
  updatedAt: string;
}

export interface UserInteraction {
  userId: string;
  itemId: string;
  itemType: 'course' | 'learning_path';
  action: 'upvote' | 'downvote' | 'enroll' | 'complete';
  timestamp: string;
}