import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Search, ListFilter as Filter, Plus, TrendingUp } from 'lucide-react-native';
import { LearningPathCard } from '@/components/LearningPathCard';
import { mockLearningPaths } from '@/data/mockData';
import { LearningPath } from '@/types/learning';

export default function LearningPathsScreen() {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learning Paths</Text>
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
          <TrendingUp size={20} color="#10b981" />
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
            <LearningPathCard
              key={path.id}
              learningPath={path}
              onPress={() => handlePathPress(path)}
            />
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