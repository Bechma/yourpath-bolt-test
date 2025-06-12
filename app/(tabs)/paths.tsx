import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Search, Filter, Plus, Clock, BookOpen, Users, Star, Calendar, User } from 'lucide-react-native';
import { Image } from 'expo-image';
import { mockLearningPaths } from '@/data/mockData';
import { LearningPath } from '@/types/learning';

export default function PathsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [learningPaths, setLearningPaths] = useState(mockLearningPaths);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Guru'];

  const filteredPaths = learningPaths.filter((path) => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || path.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const handlePathPress = (path: LearningPath) => {
    console.log('Navigate to learning path:', path.id);
    // Navigation logic would go here
  };

  const handleCreatePath = () => {
    console.log('Create new learning path');
    // Navigation to create path screen
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      case 'Expert': return '#8b5cf6';
      case 'Guru': return '#1f2937';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Learning Paths</Text>
          <Text style={styles.headerSubtitle}>Community-created learning journeys powered by AI</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.filterButton}>
            <Filter size={20} color="#6366f1" />
          </Pressable>
          <Pressable style={styles.createButton} onPress={handleCreatePath}>
            <Plus size={20} color="#ffffff" />
          </Pressable>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#9ca3af" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search learning paths..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.difficultiesContainer}
        contentContainerStyle={styles.difficultiesContent}
      >
        {difficulties.map((difficulty) => (
          <Pressable
            key={difficulty}
            style={[
              styles.difficultyChip,
              selectedDifficulty === difficulty && styles.difficultyChipActive
            ]}
            onPress={() => setSelectedDifficulty(difficulty)}
          >
            <Text
              style={[
                styles.difficultyText,
                selectedDifficulty === difficulty && styles.difficultyTextActive
              ]}
            >
              {difficulty}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <BookOpen size={20} color="#6366f1" />
          <Text style={styles.statNumber}>{filteredPaths.length}</Text>
          <Text style={styles.statLabel}>Available Paths</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {filteredPaths.reduce((sum, path) => sum + path.totalCourses, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Courses</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {Math.round(filteredPaths.reduce((sum, path) => sum + path.estimatedTime, 0))}h
          </Text>
          <Text style={styles.statLabel}>Total Hours</Text>
        </View>
      </View>

      <ScrollView style={styles.pathsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.pathsGrid}>
          {filteredPaths.map((path) => (
            <Pressable key={path.id} style={styles.pathCard} onPress={() => handlePathPress(path)}>
              <Image source={{ uri: path.image }} style={styles.pathImage} />
              
              <View style={styles.pathContent}>
                <View style={styles.pathHeader}>
                  <View style={styles.titleRow}>
                    <Text style={styles.pathTitle} numberOfLines={2}>
                      {path.title}
                    </Text>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(path.difficulty) }]}>
                      <Text style={styles.difficultyBadgeText}>{path.difficulty}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.pathDescription} numberOfLines={3}>
                  {path.description}
                </Text>

                <View style={styles.creatorSection}>
                  <View style={styles.creatorInfo}>
                    <User size={14} color="#6b7280" />
                    <Text style={styles.creatorText}>Created by community</Text>
                  </View>
                  <View style={styles.aiTag}>
                    <Text style={styles.aiTagText}>AI-Powered</Text>
                  </View>
                </View>

                <View style={styles.objectives}>
                  <Text style={styles.objectivesTitle}>Learning Objectives:</Text>
                  {path.objectives.slice(0, 2).map((objective, index) => (
                    <Text key={index} style={styles.objective} numberOfLines={1}>
                      • {objective}
                    </Text>
                  ))}
                  {path.objectives.length > 2 && (
                    <Text style={styles.moreObjectives}>
                      +{path.objectives.length - 2} more objectives
                    </Text>
                  )}
                </View>

                <View style={styles.pathStats}>
                  <View style={styles.statItem}>
                    <BookOpen size={16} color="#6b7280" />
                    <Text style={styles.statText}>{path.totalCourses} courses</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.statText}>{path.estimatedTime}h</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Users size={16} color="#6b7280" />
                    <Text style={styles.statText}>Community</Text>
                  </View>
                </View>

                <View style={styles.coursePreview}>
                  <Text style={styles.coursePreviewTitle}>Featured Courses:</Text>
                  <View style={styles.courseList}>
                    {path.courses.slice(0, 3).map((course, index) => (
                      <View key={course.id} style={styles.courseItem}>
                        <View style={styles.courseNumber}>
                          <Text style={styles.courseNumberText}>{index + 1}</Text>
                        </View>
                        <View style={styles.courseInfo}>
                          <Text style={styles.courseTitle} numberOfLines={1}>
                            {course.title}
                          </Text>
                          <Text style={styles.courseDetails}>
                            {course.lessons.length} lessons • {Math.round(course.duration / 60)}h
                          </Text>
                        </View>
                        <View style={styles.courseRating}>
                          <Star size={12} color="#fbbf24" />
                          <Text style={styles.ratingText}>{course.rating}</Text>
                        </View>
                      </View>
                    ))}
                    {path.courses.length > 3 && (
                      <Text style={styles.moreCourses}>
                        +{path.courses.length - 3} more courses
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.pathFooter}>
                  <View style={styles.dateInfo}>
                    <Calendar size={12} color="#9ca3af" />
                    <Text style={styles.dateText}>Updated {formatDate(path.updatedAt)}</Text>
                  </View>
                  <View style={styles.progressSection}>
                    <Text style={styles.progressLabel}>Progress: {path.progress}%</Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[styles.progressFill, { width: `${path.progress}%` }]} 
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        
        {filteredPaths.length === 0 && (
          <View style={styles.emptyState}>
            <Search size={48} color="#d1d5db" />
            <Text style={styles.emptyStateText}>
              No learning paths found matching your criteria
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or difficulty filter
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
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  createButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#6366f1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  difficultiesContainer: {
    marginBottom: 20,
  },
  difficultiesContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  difficultyChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  difficultyChipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  difficultyTextActive: {
    color: '#ffffff',
  },
  statsSection: {
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
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
  pathsContainer: {
    flex: 1,
  },
  pathsGrid: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  pathCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  pathImage: {
    width: '100%',
    height: 180,
  },
  pathContent: {
    padding: 20,
  },
  pathHeader: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pathTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
    lineHeight: 26,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  pathDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  creatorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  creatorText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  aiTag: {
    backgroundColor: '#ddd6fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiTagText: {
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: '600',
  },
  objectives: {
    marginBottom: 16,
  },
  objectivesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  objective: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
    paddingLeft: 8,
  },
  moreObjectives: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    paddingLeft: 8,
    marginTop: 4,
  },
  pathStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  coursePreview: {
    marginBottom: 16,
  },
  coursePreviewTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  courseList: {
    gap: 8,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  courseNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseNumberText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  courseDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  moreCourses: {
    fontSize: 12,
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 8,
  },
  pathFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 16,
    gap: 12,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  progressSection: {
    gap: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 2,
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