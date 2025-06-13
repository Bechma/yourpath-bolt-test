import { Lesson } from '@/types/lesson';

export const mockLessons: Record<string, Lesson[]> = {
  'course-1-1': [ // HTML & CSS Fundamentals
    {
      id: 'lesson-1-1-1',
      title: 'Introduction to HTML',
      description: 'Learn the basics of HTML markup language and understand how web pages are structured.',
      duration: '25m',
      type: 'video',
      content: 'Welcome to HTML fundamentals! In this lesson, we\'ll explore the building blocks of web development...',
      videoUrl: 'https://example.com/video1',
      order: 1,
      isCompleted: true,
      progress: 100,
      objectives: [
        'Understand what HTML is and its purpose',
        'Learn basic HTML document structure',
        'Create your first HTML page',
        'Understand semantic markup'
      ],
      resources: [
        {
          id: 'resource-1',
          title: 'HTML Cheat Sheet',
          type: 'pdf',
          url: 'https://example.com/html-cheat-sheet.pdf',
          description: 'Quick reference for HTML tags and attributes'
        },
        {
          id: 'resource-2',
          title: 'MDN HTML Documentation',
          type: 'link',
          url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          description: 'Comprehensive HTML documentation'
        }
      ]
    },
    {
      id: 'lesson-1-1-2',
      title: 'HTML Elements and Tags',
      description: 'Deep dive into HTML elements, tags, and attributes. Learn how to structure content properly.',
      duration: '35m',
      type: 'video',
      content: 'HTML elements are the building blocks of web pages. Let\'s explore different types of elements...',
      videoUrl: 'https://example.com/video2',
      order: 2,
      isCompleted: true,
      progress: 100,
      objectives: [
        'Master common HTML elements',
        'Understand element attributes',
        'Learn proper nesting techniques',
        'Practice with hands-on examples'
      ]
    },
    {
      id: 'lesson-1-1-3',
      title: 'CSS Fundamentals',
      description: 'Introduction to Cascading Style Sheets and how to style your HTML content.',
      duration: '40m',
      type: 'video',
      content: 'CSS brings life to HTML by adding styles, colors, and layouts...',
      videoUrl: 'https://example.com/video3',
      order: 3,
      isCompleted: false,
      progress: 60,
      objectives: [
        'Understand CSS syntax and selectors',
        'Learn how to apply styles to HTML',
        'Master the box model concept',
        'Create visually appealing layouts'
      ]
    },
    {
      id: 'lesson-1-1-4',
      title: 'Responsive Design Basics',
      description: 'Learn how to create websites that work on all devices using responsive design principles.',
      duration: '45m',
      type: 'video',
      content: 'Responsive design ensures your website looks great on all devices...',
      order: 4,
      objectives: [
        'Understand mobile-first design',
        'Learn CSS media queries',
        'Master flexible layouts',
        'Optimize for different screen sizes'
      ]
    },
    {
      id: 'lesson-1-1-5',
      title: 'HTML & CSS Quiz',
      description: 'Test your knowledge of HTML and CSS fundamentals with this comprehensive quiz.',
      duration: '15m',
      type: 'quiz',
      content: 'Time to test what you\'ve learned! This quiz covers all the key concepts from the previous lessons.',
      order: 5,
      objectives: [
        'Assess your HTML knowledge',
        'Test CSS understanding',
        'Identify areas for improvement',
        'Reinforce key concepts'
      ]
    }
  ],
  'course-1-2': [ // JavaScript Essentials
    {
      id: 'lesson-1-2-1',
      title: 'JavaScript Basics',
      description: 'Introduction to JavaScript programming language and its core concepts.',
      duration: '30m',
      type: 'video',
      content: 'JavaScript is the programming language of the web. Let\'s start with the fundamentals...',
      order: 1,
      isCompleted: true,
      progress: 100,
      objectives: [
        'Understand JavaScript syntax',
        'Learn variables and data types',
        'Master basic operators',
        'Write your first JavaScript program'
      ]
    },
    {
      id: 'lesson-1-2-2',
      title: 'Functions and Scope',
      description: 'Learn how to create and use functions, understand scope, and write modular code.',
      duration: '35m',
      type: 'video',
      content: 'Functions are reusable blocks of code that perform specific tasks...',
      order: 2,
      isCompleted: false,
      progress: 45,
      objectives: [
        'Create and call functions',
        'Understand function parameters',
        'Master scope concepts',
        'Write clean, modular code'
      ]
    },
    {
      id: 'lesson-1-2-3',
      title: 'DOM Manipulation',
      description: 'Learn how to interact with HTML elements using JavaScript and the Document Object Model.',
      duration: '40m',
      type: 'interactive',
      content: 'The DOM allows JavaScript to interact with HTML elements dynamically...',
      order: 3,
      objectives: [
        'Understand the DOM structure',
        'Select and modify elements',
        'Handle user events',
        'Create dynamic web pages'
      ]
    }
  ],
  'course-2-1': [ // Python for Data Science
    {
      id: 'lesson-2-1-1',
      title: 'Python Installation and Setup',
      description: 'Get started with Python by setting up your development environment.',
      duration: '20m',
      type: 'video',
      content: 'Let\'s set up Python and create your first data science environment...',
      order: 1,
      isCompleted: true,
      progress: 100,
      objectives: [
        'Install Python and pip',
        'Set up a virtual environment',
        'Install essential packages',
        'Configure your IDE'
      ]
    },
    {
      id: 'lesson-2-1-2',
      title: 'Python Syntax and Data Types',
      description: 'Learn Python\'s syntax, variables, and built-in data types.',
      duration: '35m',
      type: 'video',
      content: 'Python\'s clean syntax makes it perfect for data science. Let\'s explore the basics...',
      order: 2,
      isCompleted: true,
      progress: 100,
      objectives: [
        'Master Python syntax',
        'Understand data types',
        'Work with variables',
        'Practice with examples'
      ]
    },
    {
      id: 'lesson-2-1-3',
      title: 'Introduction to NumPy',
      description: 'Discover NumPy for numerical computing and array operations.',
      duration: '45m',
      type: 'video',
      content: 'NumPy is the foundation of scientific computing in Python...',
      order: 3,
      isCompleted: false,
      progress: 30,
      objectives: [
        'Understand NumPy arrays',
        'Perform array operations',
        'Master indexing and slicing',
        'Apply mathematical functions'
      ]
    }
  ]
};