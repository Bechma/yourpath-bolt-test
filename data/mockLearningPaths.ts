import { LearningPath } from '@/types/learningPath';

export const mockLearningPaths: LearningPath[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Master modern web development with React, Node.js, and databases. Build real-world applications from scratch.',
    totalCourses: 12,
    difficultyDistribution: {
      beginner: 4,
      intermediate: 6,
      advanced: 2
    },
    subjectArea: 'Web Development',
    progress: 65,
    completionStatus: 'in-progress',
    createdAt: '2024-01-15T10:00:00Z',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Learn Python, statistics, machine learning, and data visualization to become a data scientist.',
    totalCourses: 8,
    difficultyDistribution: {
      beginner: 3,
      intermediate: 4,
      advanced: 1
    },
    subjectArea: 'Data Science',
    progress: 25,
    completionStatus: 'in-progress',
    createdAt: '2024-01-20T14:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    description: 'Create native mobile apps for iOS and Android using React Native and modern development practices.',
    totalCourses: 10,
    difficultyDistribution: {
      beginner: 2,
      intermediate: 5,
      advanced: 3
    },
    subjectArea: 'Mobile Development',
    completionStatus: 'not-started',
    createdAt: '2024-02-01T09:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services and cloud architecture. Deploy scalable applications in the cloud.',
    totalCourses: 15,
    difficultyDistribution: {
      beginner: 3,
      intermediate: 8,
      advanced: 4
    },
    subjectArea: 'Cloud Computing',
    progress: 100,
    completionStatus: 'completed',
    createdAt: '2023-12-10T16:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    title: 'UI/UX Design Mastery',
    description: 'Learn design principles, user research, prototyping, and create beautiful user experiences.',
    totalCourses: 9,
    difficultyDistribution: {
      beginner: 4,
      intermediate: 3,
      advanced: 2
    },
    subjectArea: 'Design',
    progress: 40,
    completionStatus: 'in-progress',
    createdAt: '2024-01-25T11:20:00Z',
    imageUrl: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    title: 'Cybersecurity Essentials',
    description: 'Protect systems and data with comprehensive cybersecurity knowledge and hands-on practice.',
    totalCourses: 11,
    difficultyDistribution: {
      beginner: 2,
      intermediate: 6,
      advanced: 3
    },
    subjectArea: 'Cybersecurity',
    completionStatus: 'not-started',
    createdAt: '2024-02-05T13:10:00Z',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '7',
    title: 'DevOps Engineering',
    description: 'Master CI/CD, containerization, monitoring, and infrastructure as code for modern software delivery.',
    totalCourses: 13,
    difficultyDistribution: {
      beginner: 2,
      intermediate: 7,
      advanced: 4
    },
    subjectArea: 'DevOps',
    progress: 80,
    completionStatus: 'in-progress',
    createdAt: '2024-01-08T08:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '8',
    title: 'Artificial Intelligence',
    description: 'Explore machine learning, deep learning, and AI applications in real-world scenarios.',
    totalCourses: 14,
    difficultyDistribution: {
      beginner: 3,
      intermediate: 6,
      advanced: 5
    },
    subjectArea: 'Artificial Intelligence',
    completionStatus: 'not-started',
    createdAt: '2024-02-10T15:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];