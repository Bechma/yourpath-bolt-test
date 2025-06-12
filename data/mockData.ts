import { LearningPath, Course, Lesson } from '@/types/learning';

// Mock Lessons Data
const reactNativeLessons: Lesson[] = [
  {
    id: 'rn-lesson-1',
    title: 'Introduction to React Native',
    description: 'Learn the basics of React Native and its core concepts',
    content: 'React Native is a framework for building mobile applications...',
    contentType: 'video',
    estimatedTime: 45,
    status: 'completed',
    resources: ['React Native Documentation', 'Setup Guide'],
    createdBy: 'sarah_dev',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01'
  },
  {
    id: 'rn-lesson-2',
    title: 'Setting Up Development Environment',
    description: 'Configure your development environment for React Native',
    content: 'Setting up React Native development environment...',
    contentType: 'interactive',
    estimatedTime: 60,
    status: 'in_progress',
    resources: ['Expo CLI Guide', 'Android Studio Setup'],
    createdBy: 'mike_teacher',
    createdAt: '2024-01-16',
    updatedAt: '2024-05-28'
  },
  {
    id: 'rn-lesson-3',
    title: 'Core Components and APIs',
    description: 'Explore React Native core components',
    content: 'React Native provides many built-in components...',
    contentType: 'text',
    estimatedTime: 90,
    status: 'not_started',
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'Which component is used for text input?',
          options: ['Text', 'TextInput', 'Input', 'TextField'],
          correctAnswer: 1
        }
      ]
    },
    createdBy: 'alex_coder',
    createdAt: '2024-01-17',
    updatedAt: '2024-05-30'
  },
  {
    id: 'rn-lesson-4',
    title: 'Navigation Fundamentals',
    description: 'Learn how to implement navigation in React Native apps',
    content: 'Navigation is crucial for mobile applications...',
    contentType: 'video',
    estimatedTime: 75,
    status: 'not_started',
    createdBy: 'emma_ui',
    createdAt: '2024-01-18',
    updatedAt: '2024-06-02'
  },
  {
    id: 'rn-lesson-5',
    title: 'State Management with Hooks',
    description: 'Master React hooks for state management',
    content: 'React hooks provide a powerful way to manage state...',
    contentType: 'interactive',
    estimatedTime: 120,
    status: 'not_started',
    createdBy: 'david_react',
    createdAt: '2024-01-19',
    updatedAt: '2024-06-01'
  }
];

const jsAdvancedLessons: Lesson[] = [
  {
    id: 'js-lesson-1',
    title: 'Closures and Scope',
    description: 'Deep dive into JavaScript closures and lexical scope',
    content: 'Closures are a fundamental concept in JavaScript...',
    contentType: 'text',
    estimatedTime: 60,
    status: 'completed',
    createdBy: 'js_master',
    createdAt: '2024-02-01',
    updatedAt: '2024-05-15'
  },
  {
    id: 'js-lesson-2',
    title: 'Promises and Async/Await',
    description: 'Master asynchronous JavaScript programming',
    content: 'Asynchronous programming is essential for modern JavaScript...',
    contentType: 'video',
    estimatedTime: 90,
    status: 'in_progress',
    createdBy: 'async_expert',
    createdAt: '2024-02-02',
    updatedAt: '2024-05-20'
  },
  {
    id: 'js-lesson-3',
    title: 'Prototypes and Inheritance',
    description: 'Understand JavaScript prototype chain',
    content: 'JavaScript uses prototypal inheritance...',
    contentType: 'interactive',
    estimatedTime: 75,
    status: 'not_started',
    createdBy: 'proto_guru',
    createdAt: '2024-02-03',
    updatedAt: '2024-05-25'
  },
  {
    id: 'js-lesson-4',
    title: 'Functional Programming Concepts',
    description: 'Explore functional programming in JavaScript',
    content: 'Functional programming paradigms in JavaScript...',
    contentType: 'text',
    estimatedTime: 105,
    status: 'not_started',
    createdBy: 'fp_advocate',
    createdAt: '2024-02-04',
    updatedAt: '2024-05-30'
  }
];

const uiDesignLessons: Lesson[] = [
  {
    id: 'ui-lesson-1',
    title: 'Design Principles',
    description: 'Learn fundamental design principles',
    content: 'Good design follows certain principles...',
    contentType: 'video',
    estimatedTime: 50,
    status: 'completed',
    createdBy: 'design_pro',
    createdAt: '2024-01-20',
    updatedAt: '2024-05-30'
  },
  {
    id: 'ui-lesson-2',
    title: 'Color Theory',
    description: 'Understanding color in design',
    content: 'Color plays a crucial role in design...',
    contentType: 'interactive',
    estimatedTime: 65,
    status: 'completed',
    createdBy: 'color_expert',
    createdAt: '2024-01-21',
    updatedAt: '2024-06-01'
  },
  {
    id: 'ui-lesson-3',
    title: 'Typography Fundamentals',
    description: 'Master the art of typography',
    content: 'Typography is the art of arranging type...',
    contentType: 'text',
    estimatedTime: 70,
    status: 'in_progress',
    createdBy: 'type_master',
    createdAt: '2024-01-22',
    updatedAt: '2024-05-28'
  },
  {
    id: 'ui-lesson-4',
    title: 'Layout and Composition',
    description: 'Create effective layouts',
    content: 'Layout is the foundation of good design...',
    contentType: 'video',
    estimatedTime: 80,
    status: 'not_started',
    createdBy: 'layout_guru',
    createdAt: '2024-01-23',
    updatedAt: '2024-06-02'
  }
];

// Mock Courses Data
const webDevelopmentCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete React Native Development',
    description: 'Master React Native from basics to advanced concepts with hands-on projects',
    objective: 'Build production-ready mobile applications using React Native and modern development practices',
    instructor: 'Sarah Johnson',
    createdBy: 'sarah_dev',
    prerequisites: ['Basic JavaScript', 'React fundamentals'],
    lessons: reactNativeLessons,
    rating: 4.8,
    votes: 1250,
    upvotes: 1100,
    downvotes: 150,
    duration: 390, // total minutes from lessons
    category: 'Mobile Development',
    tags: ['React Native', 'Mobile', 'JavaScript'],
    status: 'public',
    progress: 45,
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-15',
    updatedAt: '2024-06-01'
  },
  {
    id: 'course-2',
    title: 'Advanced JavaScript Concepts',
    description: 'Deep dive into advanced JavaScript programming patterns and best practices',
    objective: 'Master complex JavaScript concepts including closures, prototypes, and functional programming',
    instructor: 'Mike Chen',
    createdBy: 'mike_teacher',
    prerequisites: ['JavaScript basics', 'ES6 knowledge'],
    lessons: jsAdvancedLessons,
    rating: 4.6,
    votes: 890,
    upvotes: 750,
    downvotes: 140,
    duration: 330,
    category: 'Programming',
    tags: ['JavaScript', 'Advanced', 'Programming'],
    status: 'public',
    progress: 60,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-02-01',
    updatedAt: '2024-05-15'
  },
  {
    id: 'course-3',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and experience design with practical exercises',
    objective: 'Create intuitive and beautiful user interfaces following modern design principles',
    instructor: 'Emma Davis',
    createdBy: 'emma_ui',
    prerequisites: [],
    lessons: uiDesignLessons,
    rating: 4.9,
    votes: 2100,
    upvotes: 1950,
    downvotes: 150,
    duration: 265,
    category: 'Design',
    tags: ['UI', 'UX', 'Design', 'User Experience'],
    status: 'public',
    progress: 75,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-01-20',
    updatedAt: '2024-05-30'
  }
];

const dataAnalyticsCourses: Course[] = [
  {
    id: 'course-4',
    title: 'Python for Data Science',
    description: 'Learn Python programming for data analysis and visualization with real-world datasets',
    objective: 'Analyze and visualize data using Python libraries like pandas, numpy, and matplotlib',
    instructor: 'Dr. Alex Rodriguez',
    createdBy: 'data_scientist_alex',
    prerequisites: ['Basic programming knowledge'],
    lessons: [], // Would contain Python lessons
    rating: 4.7,
    votes: 1560,
    upvotes: 1350,
    downvotes: 210,
    duration: 480,
    category: 'Data Science',
    tags: ['Python', 'Data Science', 'Analytics'],
    status: 'public',
    progress: 25,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-03-01',
    updatedAt: '2024-06-05'
  },
  {
    id: 'course-5',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to machine learning algorithms and applications with hands-on implementation',
    objective: 'Understand and implement basic machine learning algorithms for real-world problems',
    instructor: 'Dr. Lisa Wang',
    createdBy: 'ml_researcher_lisa',
    prerequisites: ['Python basics', 'Statistics knowledge'],
    lessons: [], // Would contain ML lessons
    rating: 4.5,
    votes: 980,
    upvotes: 820,
    downvotes: 160,
    duration: 600,
    category: 'Machine Learning',
    tags: ['ML', 'AI', 'Data Science'],
    status: 'public',
    progress: 0,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-03-15',
    updatedAt: '2024-06-10'
  }
];

const businessCourses: Course[] = [
  {
    id: 'course-6',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to digital marketing in the modern era with case studies',
    objective: 'Develop and execute effective digital marketing campaigns across multiple channels',
    instructor: 'Jennifer Smith',
    createdBy: 'marketing_jen',
    prerequisites: [],
    lessons: [], // Would contain marketing lessons
    rating: 4.4,
    votes: 1200,
    upvotes: 980,
    downvotes: 220,
    duration: 360,
    category: 'Marketing',
    tags: ['Digital Marketing', 'Strategy', 'Business'],
    status: 'public',
    progress: 30,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-02-10',
    updatedAt: '2024-05-20'
  },
  {
    id: 'course-7',
    title: 'Project Management Essentials',
    description: 'Learn essential project management skills and methodologies for successful delivery',
    objective: 'Lead projects effectively using proven methodologies and tools',
    instructor: 'Robert Johnson',
    createdBy: 'pm_robert',
    prerequisites: [],
    lessons: [], // Would contain PM lessons
    rating: 4.3,
    votes: 850,
    upvotes: 680,
    downvotes: 170,
    duration: 300,
    category: 'Business',
    tags: ['Project Management', 'Leadership', 'Business'],
    status: 'public',
    progress: 15,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: '2024-02-25',
    updatedAt: '2024-06-01'
  }
];

// Mock Learning Paths Data
export const mockLearningPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: 'Full-Stack Web Development Mastery',
    description: 'Complete journey from frontend to backend development with modern technologies. Master React Native, advanced JavaScript, and UI/UX design principles to build production-ready applications.',
    objectives: [
      'Master React Native for mobile development',
      'Learn advanced JavaScript concepts and patterns',
      'Understand UI/UX design principles',
      'Build production-ready applications',
      'Implement modern development workflows'
    ],
    estimatedTime: 18, // hours
    difficulty: 'Intermediate',
    visibility: 'public',
    courses: webDevelopmentCourses,
    totalCourses: 3,
    progress: 60,
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdBy: 'community_lead',
    createdAt: '2024-01-10',
    updatedAt: '2024-06-01'
  },
  {
    id: 'path-2',
    title: 'Data Science & Machine Learning Track',
    description: 'Comprehensive path to become a data scientist with hands-on projects. Learn Python, machine learning algorithms, and work with real-world datasets to solve complex problems.',
    objectives: [
      'Master Python for data analysis',
      'Learn machine learning algorithms',
      'Understand statistical concepts',
      'Work with real-world datasets',
      'Deploy ML models to production',
      'Build data visualization dashboards'
    ],
    estimatedTime: 25, // hours
    difficulty: 'Advanced',
    visibility: 'public',
    courses: dataAnalyticsCourses,
    totalCourses: 2,
    progress: 12,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdBy: 'ai_enthusiast',
    createdAt: '2024-02-15',
    updatedAt: '2024-06-05'
  },
  {
    id: 'path-3',
    title: 'Business Leadership & Strategy',
    description: 'Develop essential business skills for modern leaders and entrepreneurs. Learn digital marketing, project management, and leadership skills to drive business success.',
    objectives: [
      'Learn digital marketing strategies',
      'Master project management methodologies',
      'Develop leadership skills',
      'Understand business analytics',
      'Build effective teams'
    ],
    estimatedTime: 12, // hours
    difficulty: 'Beginner',
    visibility: 'public',
    courses: businessCourses,
    totalCourses: 2,
    progress: 22,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdBy: 'business_mentor',
    createdAt: '2024-01-25',
    updatedAt: '2024-05-25'
  },
  {
    id: 'path-4',
    title: 'Mobile App Development Bootcamp',
    description: 'Intensive bootcamp covering iOS and Android development using React Native. Build multiple apps and learn deployment strategies.',
    objectives: [
      'Master React Native framework',
      'Learn native iOS and Android concepts',
      'Implement app store deployment',
      'Build cross-platform applications',
      'Understand mobile UI/UX patterns'
    ],
    estimatedTime: 32, // hours
    difficulty: 'Expert',
    visibility: 'public',
    courses: [webDevelopmentCourses[0]], // Just React Native course for now
    totalCourses: 1,
    progress: 0,
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdBy: 'mobile_dev_pro',
    createdAt: '2024-03-01',
    updatedAt: '2024-06-08'
  },
  {
    id: 'path-5',
    title: 'AI & Machine Learning Guru Path',
    description: 'Advanced path for experienced developers wanting to master AI and ML. Covers deep learning, neural networks, and cutting-edge AI technologies.',
    objectives: [
      'Master deep learning frameworks',
      'Understand neural network architectures',
      'Implement computer vision solutions',
      'Build natural language processing models',
      'Deploy AI models at scale',
      'Research latest AI developments'
    ],
    estimatedTime: 45, // hours
    difficulty: 'Guru',
    visibility: 'public',
    courses: dataAnalyticsCourses,
    totalCourses: 2,
    progress: 5,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdBy: 'ai_researcher',
    createdAt: '2024-03-20',
    updatedAt: '2024-06-10'
  }
];

// Mock user interactions
export const mockUserInteractions = [
  {
    userId: 'user-1',
    itemId: 'course-1',
    itemType: 'course' as const,
    action: 'upvote' as const,
    timestamp: '2024-06-01T10:30:00Z'
  },
  {
    userId: 'user-1',
    itemId: 'course-2',
    itemType: 'course' as const,
    action: 'enroll' as const,
    timestamp: '2024-06-02T14:15:00Z'
  },
  {
    userId: 'user-1',
    itemId: 'path-1',
    itemType: 'learning_path' as const,
    action: 'enroll' as const,
    timestamp: '2024-06-01T09:00:00Z'
  }
];