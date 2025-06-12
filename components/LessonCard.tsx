import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Clock, Play, FileText, Monitor, CheckCircle, Circle, PlayCircle } from 'lucide-react-native';
import { Lesson } from '@/types/learning';

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
}

export function LessonCard({ lesson, onPress }: LessonCardProps) {
  const getStatusIcon = () => {
    switch (lesson.status) {
      case 'completed':
        return <CheckCircle size={20} color="#10b981" />;
      case 'in_progress':
        return <PlayCircle size={20} color="#f59e0b" />;
      default:
        return <Circle size={20} color="#d1d5db" />;
    }
  };

  const getContentIcon = () => {
    switch (lesson.contentType) {
      case 'video':
        return <Play size={16} color="#6366f1" />;
      case 'interactive':
        return <Monitor size={16} color="#8b5cf6" />;
      default:
        return <FileText size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = () => {
    switch (lesson.status) {
      case 'completed':
        return '#10b981';
      case 'in_progress':
        return '#f59e0b';
      default:
        return '#d1d5db';
    }
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.statusIndicator}>
        {getStatusIcon()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {lesson.title}
          </Text>
          <View style={styles.contentTypeIcon}>
            {getContentIcon()}
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {lesson.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <Clock size={14} color="#6b7280" />
            <Text style={styles.timeText}>{lesson.estimatedTime} min</Text>
          </View>
          
          {lesson.quiz && (
            <View style={styles.quizBadge}>
              <Text style={styles.quizText}>Quiz</Text>
            </View>
          )}
          
          {lesson.resources && lesson.resources.length > 0 && (
            <View style={styles.resourcesBadge}>
              <Text style={styles.resourcesText}>
                {lesson.resources.length} resource{lesson.resources.length > 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.statusBar, { backgroundColor: getStatusColor() }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  statusIndicator: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
  },
  contentTypeIcon: {
    padding: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  quizBadge: {
    backgroundColor: '#ddd6fe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  quizText: {
    fontSize: 10,
    color: '#7c3aed',
    fontWeight: '600',
  },
  resourcesBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  resourcesText: {
    fontSize: 10,
    color: '#16a34a',
    fontWeight: '600',
  },
  statusBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
});