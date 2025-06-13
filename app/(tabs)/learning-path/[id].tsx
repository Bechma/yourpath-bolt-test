import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle, 
  Circle,
  Play,
  Award,
  Target
} from 'lucide-react-native';
import { mockLearningPaths } from '@/data/mockLearningPaths';
import { mockCourses } from '@/data/mockCourses';
import { Course } from '@/types/course';
import { LearningPath } from '@/types/learningPath';

export default function LearningPathDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Find the learning path
      const path = mockLearningPaths.find(p => p.id === id);
      setLearningPath(path || null);
      
      // Get courses for this learning path
      const pathCourses = mockCourses[id] || [];
      setCourses(pathCourses);
      
      setLoading(false);
    }
  }, [id]);

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return '#10B981';
      case 'intermediate':
        return '#F59E0B';
      case 'advanced':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getDifficultyBadgeStyle = (level: string) => ({
    ...styles.difficultyBadge,
    backgroundColor: getDifficultyColor(level),
  });

  const renderCourseCard = (course: Course, index: number) => (
    <TouchableOpacity 
      key={course.id} 
      style={styles.courseCard}
      onPress={() => {
        // Navigate to course detail page
        router.push({
          pathname: '/(tabs)/course/[courseId]',
          params: { 
            courseId: course.id,
            pathId: id 
          }
        });
      }}
    >
      <View style={styles.courseHeader}>
        <Image source={{ uri: course.thumbnailUrl }} style={styles.courseThumbnail} />
        <View style={styles.courseHeaderContent}>
          <View style={styles.courseNumber}>
            <Text style={styles.courseNumberText}>{index + 1}</Text>
          </View>
          {course.isCompleted && (
            <CheckCircle size={24} color="#10B981" />
          )}
        </View>
      </View>
      
      <View style={styles.courseContent}>
        <View style={styles.courseTitleRow}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {course.title}
          </Text>
          <View style={getDifficultyBadgeStyle(course.difficultyLevel)}>
            <Text style={styles.difficultyText}>
              {course.difficultyLevel.charAt(0).toUpperCase() + course.difficultyLevel.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.courseDescription} numberOfLines={3}>
          {course.description}
        </Text>
        
        <View style={styles.courseMetrics}>
          <View style={styles.metricItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.metricText}>{course.duration}</Text>
          </View>
          <View style={styles.metricItem}>
            <Users size={16} color="#6B7280" />
            <Text style={styles.metricText}>{course.enrolledStudents.toLocaleString()}</Text>
          </View>
          <View style={styles.metricItem}>
            <Star size={16} color="#F59E0B" />
            <Text style={styles.metricText}>{course.rating}</Text>
          </View>
        </View>
        
        <View style={styles.instructorRow}>
          <Text style={styles.instructorLabel}>Instructor:</Text>
          <Text style={styles.instructorName}>{course.instructor}</Text>
        </View>
        
        {course.prerequisites.length > 0 && (
          <View style={styles.prerequisitesContainer}>
            <Text style={styles.prerequisitesLabel}>Prerequisites:</Text>
            <Text style={styles.prerequisitesText}>
              {course.prerequisites.join(', ')}
            </Text>
          </View>
        )}
        
        {course.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressPercentage}>{course.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${course.progress}%` }
                ]} 
              />
            </View>
          </View>
        )}
        
        <View style={styles.topicsContainer}>
          <Text style={styles.topicsLabel}>What you'll learn:</Text>
          <View style={styles.topicsGrid}>
            {course.topics.slice(0, 4).map((topic, idx) => (
              <View key={idx} style={styles.topicTag}>
                <Text style={styles.topicText}>{topic}</Text>
              </View>
            ))}
            {course.topics.length > 4 && (
              <View style={styles.topicTag}>
                <Text style={styles.topicText}>+{course.topics.length - 4} more</Text>
              </View>
            )}
          </View>
        </View>
        
        <TouchableOpacity style={styles.startButton}>
          <Play size={16} color="white" />
          <Text style={styles.startButtonText}>
            {course.isCompleted ? 'Review Course' : course.progress ? 'Continue' : 'Start Course'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading course details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!learningPath) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Learning path not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: learningPath.title,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
              <ArrowLeft size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={{ uri: learningPath.imageUrl }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{learningPath.title}</Text>
              <Text style={styles.heroDescription}>{learningPath.description}</Text>
              
              <View style={styles.heroStats}>
                <View style={styles.statItem}>
                  <BookOpen size={20} color="white" />
                  <Text style={styles.statText}>{learningPath.totalCourses} Courses</Text>
                </View>
                <View style={styles.statItem}>
                  <Award size={20} color="white" />
                  <Text style={styles.statText}>{learningPath.subjectArea}</Text>
                </View>
                {learningPath.progress !== undefined && (
                  <View style={styles.statItem}>
                    <Target size={20} color="white" />
                    <Text style={styles.statText}>{learningPath.progress}% Complete</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        
        {/* Course List */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Courses in this Path</Text>
            <Text style={styles.sectionSubtitle}>
              {courses.length} course{courses.length !== 1 ? 's' : ''} • 
              Estimated {courses.reduce((total, course) => {
                const hours = parseFloat(course.duration.split('h')[0]) || 0;
                const minutes = parseFloat(course.duration.split('h')[1]?.split('m')[0]) || 0;
                return total + hours + (minutes / 60);
              }, 0).toFixed(1)}h total
            </Text>
          </View>
          
          {courses.length === 0 ? (
            <View style={styles.emptyState}>
              <BookOpen size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No courses available yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Courses for this learning path are coming soon!
              </Text>
            </View>
          ) : (
            <View style={styles.coursesList}>
              {courses.map((course, index) => renderCourseCard(course, index))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerBackButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 16,
    lineHeight: 22,
  },
  heroStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  coursesSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  coursesList: {
    gap: 20,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  courseHeader: {
    position: 'relative',
    height: 200,
  },
  courseThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  courseHeaderContent: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseNumber: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  courseContent: {
    padding: 20,
  },
  courseTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 12,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    lineHeight: 26,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  courseMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 14,
    color: '#6B7280',
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  instructorLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  instructorName: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  prerequisitesContainer: {
    marginBottom: 16,
  },
  prerequisitesLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  prerequisitesText: {
    fontSize: 14,
    color: '#111827',
    fontStyle: 'italic',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  topicsContainer: {
    marginBottom: 20,
  },
  topicsLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});