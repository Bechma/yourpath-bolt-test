import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
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
  FileText,
  HelpCircle,
  PenTool,
  Monitor
} from 'lucide-react-native';
import { mockCourses } from '@/data/mockCourses';
import { mockLessons } from '@/data/mockLessons';
import { Course } from '@/types/course';
import { Lesson } from '@/types/lesson';

export default function CourseDetailScreen() {
  const { courseId, pathId } = useLocalSearchParams<{ courseId: string; pathId?: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      // Find the course across all learning paths
      let foundCourse: Course | null = null;
      
      for (const pathCourses of Object.values(mockCourses)) {
        const course = pathCourses.find(c => c.id === courseId);
        if (course) {
          foundCourse = course;
          break;
        }
      }
      
      setCourse(foundCourse);
      
      // Get lessons for this course
      const courseLessons = mockLessons[courseId] || [];
      setLessons(courseLessons.sort((a, b) => a.order - b.order));
      
      setLoading(false);
    }
  }, [courseId]);

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play size={20} color="#007AFF" />;
      case 'reading':
        return <FileText size={20} color="#10B981" />;
      case 'quiz':
        return <HelpCircle size={20} color="#F59E0B" />;
      case 'assignment':
        return <PenTool size={20} color="#EF4444" />;
      case 'interactive':
        return <Monitor size={20} color="#8B5CF6" />;
      default:
        return <BookOpen size={20} color="#6B7280" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return '#007AFF';
      case 'reading':
        return '#10B981';
      case 'quiz':
        return '#F59E0B';
      case 'assignment':
        return '#EF4444';
      case 'interactive':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  const renderLessonCard = (lesson: Lesson, index: number) => (
    <TouchableOpacity 
      key={lesson.id} 
      style={styles.lessonCard}
      onPress={() => {
        // Navigate to lesson detail page
        router.push({
          pathname: '/(tabs)/lesson/[lessonId]',
          params: { 
            lessonId: lesson.id, 
            courseId: courseId,
            pathId: pathId 
          }
        });
      }}
    >
      <View style={styles.lessonHeader}>
        <View style={styles.lessonNumber}>
          <Text style={styles.lessonNumberText}>{lesson.order}</Text>
        </View>
        <View style={styles.lessonIconContainer}>
          {getLessonIcon(lesson.type)}
        </View>
        <View style={styles.lessonStatus}>
          {lesson.isCompleted ? (
            <CheckCircle size={24} color="#10B981" />
          ) : lesson.progress ? (
            <View style={styles.progressCircle}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    transform: [{ rotate: `${(lesson.progress / 100) * 360}deg` }] 
                  }
                ]} 
              />
              <Text style={styles.progressText}>{lesson.progress}%</Text>
            </View>
          ) : (
            <Circle size={24} color="#D1D5DB" />
          )}
        </View>
      </View>
      
      <View style={styles.lessonContent}>
        <View style={styles.lessonTitleRow}>
          <Text style={styles.lessonTitle} numberOfLines={2}>
            {lesson.title}
          </Text>
          <View style={[styles.lessonTypeBadge, { backgroundColor: getLessonTypeColor(lesson.type) }]}>
            <Text style={styles.lessonTypeText}>
              {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.lessonDescription} numberOfLines={2}>
          {lesson.description}
        </Text>
        
        <View style={styles.lessonMeta}>
          <View style={styles.metaItem}>
            <Clock size={16} color="#6B7280" />
            <Text style={styles.metaText}>{lesson.duration}</Text>
          </View>
          <Text style={styles.objectivesCount}>
            {lesson.objectives.length} learning objectives
          </Text>
        </View>
        
        {lesson.progress !== undefined && lesson.progress > 0 && !lesson.isCompleted && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${lesson.progress}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressLabel}>
              {lesson.progress}% complete
            </Text>
          </View>
        )}
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

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Course not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const totalLessons = lessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: course.title,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
              <ArrowLeft size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Course Header */}
        <View style={styles.courseHeader}>
          <Image source={{ uri: course.thumbnailUrl }} style={styles.courseImage} />
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            
            <View style={styles.courseStats}>
              <View style={styles.statItem}>
                <Clock size={18} color="#6B7280" />
                <Text style={styles.statText}>{course.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <Users size={18} color="#6B7280" />
                <Text style={styles.statText}>{course.enrolledStudents.toLocaleString()}</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={18} color="#F59E0B" />
                <Text style={styles.statText}>{course.rating}</Text>
              </View>
            </View>
            
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorLabel}>Instructor:</Text>
              <Text style={styles.instructorName}>{course.instructor}</Text>
            </View>
            
            {totalLessons > 0 && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Course Progress</Text>
                  <Text style={styles.progressPercentage}>
                    {completedLessons}/{totalLessons} lessons • {Math.round(overallProgress)}%
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${overallProgress}%` }
                    ]} 
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        
        {/* Lessons Section */}
        <View style={styles.lessonsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Course Content</Text>
            <Text style={styles.sectionSubtitle}>
              {totalLessons} lesson{totalLessons !== 1 ? 's' : ''} • 
              {lessons.reduce((total, lesson) => {
                const minutes = parseInt(lesson.duration.replace('m', '')) || 0;
                return total + minutes;
              }, 0)}m total
            </Text>
          </View>
          
          {lessons.length === 0 ? (
            <View style={styles.emptyState}>
              <BookOpen size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No lessons available yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Lessons for this course are coming soon!
              </Text>
            </View>
          ) : (
            <View style={styles.lessonsList}>
              {lessons.map((lesson, index) => renderLessonCard(lesson, index))}
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
  courseHeader: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  courseInfo: {
    gap: 12,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  courseDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  lessonsSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  lessonsList: {
    gap: 16,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  lessonNumber: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  lessonIconContainer: {
    flex: 1,
  },
  lessonStatus: {
    alignItems: 'center',
  },
  progressCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#10B981',
  },
  progressText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#111827',
  },
  lessonContent: {
    gap: 8,
  },
  lessonTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    lineHeight: 22,
  },
  lessonTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lessonTypeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  lessonMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  objectivesCount: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
    marginTop: 4,
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