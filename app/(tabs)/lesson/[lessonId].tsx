import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  Circle,
  Play,
  FileText,
  HelpCircle,
  PenTool,
  Monitor,
  Target,
  ExternalLink,
  Download,
  BookOpen
} from 'lucide-react-native';
import { mockLessons } from '@/data/mockLessons';
import { Lesson } from '@/types/lesson';

const { width } = Dimensions.get('window');

export default function LessonDetailScreen() {
  const { lessonId, courseId, pathId } = useLocalSearchParams<{ 
    lessonId: string; 
    courseId: string; 
    pathId?: string; 
  }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lessonId && courseId) {
      // Get all lessons for this course
      const courseLessons = mockLessons[courseId] || [];
      const sortedLessons = courseLessons.sort((a, b) => a.order - b.order);
      setAllLessons(sortedLessons);
      
      // Find the current lesson
      const currentLesson = sortedLessons.find(l => l.id === lessonId);
      setLesson(currentLesson || null);
      
      // Find current lesson index
      const index = sortedLessons.findIndex(l => l.id === lessonId);
      setCurrentIndex(index);
      
      setLoading(false);
    }
  }, [lessonId, courseId]);

  const getLessonIcon = (type: string, size: number = 24) => {
    const color = getLessonTypeColor(type);
    switch (type) {
      case 'video':
        return <Play size={size} color={color} />;
      case 'reading':
        return <FileText size={size} color={color} />;
      case 'quiz':
        return <HelpCircle size={size} color={color} />;
      case 'assignment':
        return <PenTool size={size} color={color} />;
      case 'interactive':
        return <Monitor size={size} color={color} />;
      default:
        return <BookOpen size={size} color={color} />;
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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <Download size={16} color="#EF4444" />;
      case 'link':
        return <ExternalLink size={16} color="#007AFF" />;
      case 'code':
        return <FileText size={16} color="#10B981" />;
      default:
        return <FileText size={16} color="#6B7280" />;
    }
  };

  const navigateToLesson = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < allLessons.length) {
      const newLesson = allLessons[newIndex];
      router.replace({
        pathname: '/(tabs)/lesson/[lessonId]',
        params: { 
          lessonId: newLesson.id, 
          courseId: courseId,
          pathId: pathId 
        }
      });
    }
  };

  const markAsComplete = () => {
    // In a real app, this would update the backend
    console.log('Marking lesson as complete:', lessonId);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading lesson...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Lesson not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: `Lesson ${lesson.order}`,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
              <ArrowLeft size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Lesson Header */}
        <View style={styles.lessonHeader}>
          <View style={styles.lessonTitleRow}>
            <View style={styles.lessonIconContainer}>
              {getLessonIcon(lesson.type, 32)}
            </View>
            <View style={styles.lessonTitleContent}>
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <View style={styles.lessonMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.metaText}>{lesson.duration}</Text>
                </View>
                <View style={[styles.lessonTypeBadge, { backgroundColor: getLessonTypeColor(lesson.type) }]}>
                  <Text style={styles.lessonTypeText}>
                    {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.lessonStatus}>
              {lesson.isCompleted ? (
                <CheckCircle size={32} color="#10B981" />
              ) : (
                <Circle size={32} color="#D1D5DB" />
              )}
            </View>
          </View>
          
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
          
          {lesson.progress !== undefined && lesson.progress > 0 && !lesson.isCompleted && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercentage}>{lesson.progress}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${lesson.progress}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>

        {/* Learning Objectives */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={20} color="#007AFF" />
            <Text style={styles.sectionTitle}>Learning Objectives</Text>
          </View>
          <View style={styles.objectivesList}>
            {lesson.objectives.map((objective, index) => (
              <View key={index} style={styles.objectiveItem}>
                <View style={styles.objectiveBullet} />
                <Text style={styles.objectiveText}>{objective}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lesson Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lesson Content</Text>
          
          {lesson.type === 'video' && (
            <View style={styles.videoPlaceholder}>
              <Play size={48} color="white" />
              <Text style={styles.videoPlaceholderText}>Video Player</Text>
              <Text style={styles.videoPlaceholderSubtext}>
                In a real app, this would be a video player component
              </Text>
            </View>
          )}
          
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{lesson.content}</Text>
          </View>
        </View>

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Resources</Text>
            <View style={styles.resourcesList}>
              {lesson.resources.map((resource) => (
                <TouchableOpacity key={resource.id} style={styles.resourceItem}>
                  <View style={styles.resourceIcon}>
                    {getResourceIcon(resource.type)}
                  </View>
                  <View style={styles.resourceContent}>
                    <Text style={styles.resourceTitle}>{resource.title}</Text>
                    {resource.description && (
                      <Text style={styles.resourceDescription}>{resource.description}</Text>
                    )}
                  </View>
                  <ExternalLink size={16} color="#6B7280" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {!lesson.isCompleted && (
            <TouchableOpacity style={styles.completeButton} onPress={markAsComplete}>
              <CheckCircle size={20} color="white" />
              <Text style={styles.completeButtonText}>Mark as Complete</Text>
            </TouchableOpacity>
          )}
          
          {lesson.isCompleted && (
            <View style={styles.completedBadge}>
              <CheckCircle size={20} color="#10B981" />
              <Text style={styles.completedText}>Lesson Completed</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.navigationFooter}>
        <TouchableOpacity 
          style={[styles.navButton, !hasPrevious && styles.navButtonDisabled]}
          onPress={() => navigateToLesson('prev')}
          disabled={!hasPrevious}
        >
          <ArrowLeft size={20} color={hasPrevious ? "#007AFF" : "#D1D5DB"} />
          <Text style={[styles.navButtonText, !hasPrevious && styles.navButtonTextDisabled]}>
            Previous
          </Text>
        </TouchableOpacity>
        
        <View style={styles.lessonCounter}>
          <Text style={styles.lessonCounterText}>
            {currentIndex + 1} of {allLessons.length}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.navButton, !hasNext && styles.navButtonDisabled]}
          onPress={() => navigateToLesson('next')}
          disabled={!hasNext}
        >
          <Text style={[styles.navButtonText, !hasNext && styles.navButtonTextDisabled]}>
            Next
          </Text>
          <ArrowLeft 
            size={20} 
            color={hasNext ? "#007AFF" : "#D1D5DB"} 
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>
      </View>
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
  lessonHeader: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lessonTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  lessonIconContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonTitleContent: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 26,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  lessonTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lessonTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonStatus: {
    alignItems: 'center',
  },
  lessonDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
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
  section: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  objectiveBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginTop: 6,
  },
  objectiveText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    flex: 1,
  },
  videoPlaceholder: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  videoPlaceholderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  videoPlaceholderSubtext: {
    color: '#D1D5DB',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  resourcesList: {
    gap: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 12,
  },
  resourceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  resourceDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  actionSection: {
    backgroundColor: 'white',
    marginTop: 8,
    padding: 20,
    marginBottom: 80, // Space for navigation footer
  },
  completeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#10B981',
    gap: 8,
  },
  completedText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
  },
  navigationFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: '#D1D5DB',
  },
  lessonCounter: {
    flex: 1,
    alignItems: 'center',
  },
  lessonCounterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});