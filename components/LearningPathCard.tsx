import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Clock, BookOpen, Users, Star, Lock, Globe } from 'lucide-react-native';
import { LearningPath } from '@/types/learning';

interface LearningPathCardProps {
  learningPath: LearningPath;
  onPress: () => void;
}

export function LearningPathCard({ learningPath, onPress }: LearningPathCardProps) {
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

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: learningPath.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {learningPath.title}
            </Text>
            <View style={styles.visibilityIcon}>
              {learningPath.visibility === 'private' ? (
                <Lock size={16} color="#6b7280" />
              ) : (
                <Globe size={16} color="#10b981" />
              )}
            </View>
          </View>
          
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(learningPath.difficulty) }]}>
            <Text style={styles.difficultyText}>{learningPath.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {learningPath.description}
        </Text>

        <View style={styles.objectives}>
          <Text style={styles.objectivesTitle}>Learning Objectives:</Text>
          {learningPath.objectives.slice(0, 2).map((objective, index) => (
            <Text key={index} style={styles.objective} numberOfLines={1}>
              • {objective}
            </Text>
          ))}
          {learningPath.objectives.length > 2 && (
            <Text style={styles.moreObjectives}>
              +{learningPath.objectives.length - 2} more objectives
            </Text>
          )}
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <BookOpen size={16} color="#6b7280" />
            <Text style={styles.statText}>{learningPath.totalCourses} courses</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={16} color="#6b7280" />
            <Text style={styles.statText}>{learningPath.estimatedTime}h</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>{learningPath.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${learningPath.progress}%` }]} 
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
    marginRight: 12,
    lineHeight: 26,
  },
  visibilityIcon: {
    padding: 4,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
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
  stats: {
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
  progressSection: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 3,
  },
});