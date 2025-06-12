import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { BookOpen, Clock, Star, Settings, Eye, EyeOff } from 'lucide-react-native';
import { CourseCard } from '@/components/CourseCard';
import { mockLearningPaths } from '@/data/mockData';
import { Course } from '@/types/learning';

export default function MyCoursesScreen() {
  const [courses, setCourses] = useState(() => {
    // Flatten all courses from learning paths for this demo
    return mockLearningPaths.flatMap(path => path.courses);
  });
  const [selectedTab, setSelectedTab] = useState<'all' | 'in_progress' | 'completed'>('all');

  const handleVote = (courseId: string, voteType: 'up' | 'down') => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const newCourse = { ...course };
          if (voteType === 'up') {
            newCourse.upvotes += 1;
            newCourse.votes += 1;
          } else {
            newCourse.downvotes += 1;
            newCourse.votes += 1;
          }
          return newCourse;
        }
        return course;
      })
    );
    
    Alert.alert(
      'Vote Recorded',
      `Your ${voteType === 'up' ? 'upvote' : 'downvote'} has been recorded!`,
      [{ text: 'OK' }]
    );
  };

  const handleToggleVisibility = (courseId: string) => {
    setCourses(prevCourses => 
      prevCourses.map(course => {
        if (course.id === courseId) {
          const newStatus = course.status === 'public' ? 'private' : 'public';
          Alert.alert(
            'Visibility Changed',
            `Course is now ${newStatus}`,
            [{ text: 'OK' }]
          );
          return { ...course, status: newStatus };
        }
        return course;
      })
    );
  };

  const handleCoursePress = (course: Course) => {
    console.log('Navigate to course:', course.id);
    // Navigation logic would go here
  };

  const getFilteredCourses = () => {
    switch (selectedTab) {
      case 'in_progress':
        return courses.filter(course => course.progress > 0 && course.progress < 100);
      case 'completed':
        return courses.filter(course => course.progress === 100);
      default:
        return courses;
    }
  };

  const filteredCourses = getFilteredCourses();

  const tabs = [
    { key: 'all', label: 'All Courses', count: courses.length },
    { key: 'in_progress', label: 'In Progress', count: courses.filter(c => c.progress > 0 && c.progress < 100).length },
    { key: 'completed', label: 'Completed', count: courses.filter(c => c.progress === 100).length },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Courses</Text>
        <Pressable style={styles.settingsButton}>
          <Settings size={20} color="#6366f1" />
        </Pressable>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <BookOpen size={24} color="#6366f1" />
          <Text style={styles.statValue}>{courses.length}</Text>
          <Text style={styles.statLabel}>Total Courses</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#10b981" />
          <Text style={styles.statValue}>
            {Math.round(courses.reduce((sum, course) => sum + course.duration, 0) / 60)}h
          </Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Star size={24} color="#f59e0b" />
          <Text style={styles.statValue}>
            {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
          </Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={[
              styles.tab,
              selectedTab === tab.key && styles.tabActive
            ]}
            onPress={() => setSelectedTab(tab.key as any)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab.key && styles.tabTextActive
              ]}
            >
              {tab.label}
            </Text>
            <View style={[
              styles.tabBadge,
              selectedTab === tab.key && styles.tabBadgeActive
            ]}>
              <Text style={[
                styles.tabBadgeText,
                selectedTab === tab.key && styles.tabBadgeTextActive
              ]}>
                {tab.count}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>

      <ScrollView style={styles.coursesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.coursesGrid}>
          {filteredCourses.map((course) => (
            <View key={course.id} style={styles.courseWrapper}>
              <CourseCard
                course={course}
                onPress={() => handleCoursePress(course)}
                onVote={handleVote}
                showVoting={true}
              />
              <View style={styles.courseActions}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => handleToggleVisibility(course.id)}
                >
                  {course.status === 'public' ? (
                    <Eye size={16} color="#6366f1" />
                  ) : (
                    <EyeOff size={16} color="#6b7280" />
                  )}
                  <Text style={styles.actionButtonText}>
                    {course.status === 'public' ? 'Public' : 'Private'}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
        
        {filteredCourses.length === 0 && (
          <View style={styles.emptyState}>
            <BookOpen size={48} color="#d1d5db" />
            <Text style={styles.emptyStateText}>
              No courses found in this category
            </Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedTab === 'in_progress' && 'Start a course to see it here'}
              {selectedTab === 'completed' && 'Complete a course to see it here'}
              {selectedTab === 'all' && 'Enroll in courses to get started'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    gap: 8,
  },
  tabActive: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  tabBadge: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  tabBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  tabBadgeTextActive: {
    color: '#ffffff',
  },
  coursesContainer: {
    flex: 1,
  },
  coursesGrid: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  courseWrapper: {
    marginBottom: 8,
  },
  courseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
  },
});