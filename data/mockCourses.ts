import { Course } from '@/types/course';

export const mockCourses: Record<string, Course[]> = {
  '1': [ // Full Stack Web Development
    {
      id: 'course-1-1',
      title: 'HTML & CSS Fundamentals',
      description: 'Master the building blocks of web development with comprehensive HTML and CSS training. Learn semantic markup, responsive design, and modern CSS techniques.',
      duration: '4h 15m',
      difficultyLevel: 'beginner',
      prerequisites: [],
      instructor: 'Sarah Johnson',
      rating: 4.8,
      enrolledStudents: 12450,
      thumbnailUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: true,
      progress: 100,
      estimatedTime: '1 week',
      topics: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'],
      learningObjectives: [
        'Create semantic HTML structures',
        'Style websites with modern CSS',
        'Build responsive layouts',
        'Understand web accessibility principles'
      ]
    },
    {
      id: 'course-1-2',
      title: 'JavaScript Essentials',
      description: 'Dive deep into JavaScript programming. From basic syntax to advanced concepts like closures, promises, and async/await.',
      duration: '6h 30m',
      difficultyLevel: 'beginner',
      prerequisites: ['HTML & CSS Fundamentals'],
      instructor: 'Michael Chen',
      rating: 4.9,
      enrolledStudents: 10230,
      thumbnailUrl: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: false,
      progress: 65,
      estimatedTime: '2 weeks',
      topics: ['ES6+', 'DOM Manipulation', 'Async Programming', 'Error Handling'],
      learningObjectives: [
        'Master JavaScript fundamentals',
        'Manipulate the DOM effectively',
        'Handle asynchronous operations',
        'Write clean, maintainable code'
      ]
    },
    {
      id: 'course-1-3',
      title: 'React Development',
      description: 'Build modern user interfaces with React. Learn components, hooks, state management, and best practices for scalable applications.',
      duration: '8h 45m',
      difficultyLevel: 'intermediate',
      prerequisites: ['JavaScript Essentials'],
      instructor: 'Emily Rodriguez',
      rating: 4.7,
      enrolledStudents: 8750,
      thumbnailUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 25,
      estimatedTime: '3 weeks',
      topics: ['Components', 'Hooks', 'State Management', 'React Router', 'Testing'],
      learningObjectives: [
        'Build component-based UIs',
        'Manage application state',
        'Implement routing and navigation',
        'Test React applications'
      ]
    },
    {
      id: 'course-1-4',
      title: 'Node.js Backend Development',
      description: 'Create robust server-side applications with Node.js. Learn Express.js, database integration, authentication, and API development.',
      duration: '7h 20m',
      difficultyLevel: 'intermediate',
      prerequisites: ['JavaScript Essentials'],
      instructor: 'David Kim',
      rating: 4.6,
      enrolledStudents: 6890,
      thumbnailUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      estimatedTime: '3 weeks',
      topics: ['Express.js', 'MongoDB', 'Authentication', 'RESTful APIs', 'Security'],
      learningObjectives: [
        'Build RESTful APIs',
        'Implement user authentication',
        'Work with databases',
        'Deploy applications'
      ]
    }
  ],
  '2': [ // Data Science Fundamentals
    {
      id: 'course-2-1',
      title: 'Python for Data Science',
      description: 'Learn Python programming specifically for data science applications. Master NumPy, Pandas, and data manipulation techniques.',
      duration: '5h 30m',
      difficultyLevel: 'beginner',
      prerequisites: [],
      instructor: 'Dr. Lisa Wang',
      rating: 4.9,
      enrolledStudents: 15200,
      thumbnailUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      isCompleted: true,
      progress: 100,
      estimatedTime: '2 weeks',
      topics: ['Python Basics', 'NumPy', 'Pandas', 'Data Cleaning', 'File I/O'],
      learningObjectives: [
        'Master Python fundamentals',
        'Manipulate data with Pandas',
        'Perform numerical computations',
        'Clean and prepare datasets'
      ]
    },
    {
      id: 'course-2-2',
      title: 'Statistics and Probability',
      description: 'Essential statistical concepts for data science. Understand distributions, hypothesis testing, and statistical inference.',
      duration: '4h 45m',
      difficultyLevel: 'intermediate',
      prerequisites: ['Python for Data Science'],
      instructor: 'Prof. Robert Martinez',
      rating: 4.7,
      enrolledStudents: 9800,
      thumbnailUrl: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      progress: 40,
      estimatedTime: '2 weeks',
      topics: ['Descriptive Statistics', 'Probability', 'Hypothesis Testing', 'Regression'],
      learningObjectives: [
        'Apply statistical methods',
        'Interpret data distributions',
        'Conduct hypothesis tests',
        'Understand correlation and causation'
      ]
    }
  ],
  '3': [ // Mobile App Development
    {
      id: 'course-3-1',
      title: 'React Native Fundamentals',
      description: 'Build cross-platform mobile apps with React Native. Learn navigation, styling, and platform-specific development.',
      duration: '6h 15m',
      difficultyLevel: 'intermediate',
      prerequisites: ['React Development'],
      instructor: 'Alex Thompson',
      rating: 4.8,
      enrolledStudents: 7650,
      thumbnailUrl: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      estimatedTime: '3 weeks',
      topics: ['React Native', 'Navigation', 'Native Modules', 'Platform APIs'],
      learningObjectives: [
        'Build mobile applications',
        'Implement navigation patterns',
        'Access device features',
        'Optimize app performance'
      ]
    }
  ]
};