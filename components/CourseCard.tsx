import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Clock, Star, Users, ThumbsUp, ThumbsDown, Lock, Globe } from 'lucide-react-native';
import { Course } from '@/types/learning';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
  onVote?: (courseId: string, voteType: 'up' | 'down') => void;
  showVoting?: boolean;
}

export function CourseCard({ course, onPress, onVote, showVoting = true }: CourseCardProps) {
  const handleUpvote = () => {
    onVote?.(course.id, 'up');
  };

  const handleDownvote = () => {
    onVote?.(course.id, 'down');
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: course.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>
              {course.title}
            </Text>
            <View style={styles.statusIcon}>
              {course.status === 'private' ? (
                <Lock size={16} color="#6b7280" />
              ) : (
                <Globe size={16} color="#10b981" />
              )}
            </View>
          </View>
          <Text style={styles.instructor}>by {course.instructor}</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>

        {course.prerequisites.length > 0 && (
          <View style={styles.prerequisites}>
            <Text style={styles.prerequisitesTitle}>Prerequisites:</Text>
            <Text style={styles.prerequisitesText} numberOfLines={1}>
              {course.prerequisites.join(', ')}
            </Text>
          </View>
        )}

        <View style={styles.tags}>
          {course.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
          {course.tags.length > 3 && (
            <Text style={styles.moreTags}>+{course.tags.length - 3}</Text>
          )}
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Star size={14} color="#fbbf24" />
            <Text style={styles.statText}>{course.rating}</Text>
          </View>
          <View style={styles.statItem}>
            <Users size={14} color="#6b7280" />
            <Text style={styles.statText}>{course.votes}</Text>
          </View>
          <View style={styles.statItem}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.statText}>{Math.round(course.duration / 60)}h</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.lessonCount}>{course.lessons.length} lessons</Text>
          </View>
        </View>

        {showVoting && (
          <View style={styles.votingSection}>
            <View style={styles.votingButtons}>
              <Pressable style={styles.voteButton} onPress={handleUpvote}>
                <ThumbsUp size={16} color="#10b981" />
                <Text style={[styles.voteText, { color: '#10b981' }]}>{course.upvotes}</Text>
              </Pressable>
              <Pressable style={styles.voteButton} onPress={handleDownvote}>
                <ThumbsDown size={16} color="#ef4444" />
                <Text style={[styles.voteText, { color: '#ef4444' }]}>{course.downvotes}</Text>
              </Pressable>
            </View>
          </View>
        )}

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>{course.progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${course.progress}%` }]} 
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
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
    lineHeight: 24,
  },
  statusIcon: {
    padding: 2,
  },
  instructor: {
    fontSize: 14,
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  prerequisites: {
    marginBottom: 12,
  },
  prerequisitesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  prerequisitesText: {
    fontSize: 12,
    color: '#6b7280',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  moreTags: {
    fontSize: 11,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  lessonCount: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  votingSection: {
    marginBottom: 12,
  },
  votingButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  voteText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressSection: {
    marginTop: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
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
});