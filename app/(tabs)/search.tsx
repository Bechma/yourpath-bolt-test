import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Search, TrendingUp, Clock, BookOpen } from 'lucide-react-native';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState([
    'React Native',
    'JavaScript',
    'UI Design',
    'Machine Learning',
  ]);

  const trendingTopics = [
    { title: 'Web Development', courses: 45 },
    { title: 'Data Science', courses: 32 },
    { title: 'Mobile Development', courses: 28 },
    { title: 'Digital Marketing', courses: 23 },
    { title: 'Graphic Design', courses: 19 },
  ];

  const popularInstructors = [
    { name: 'Sarah Johnson', courses: 12, students: '15K' },
    { name: 'Mike Chen', courses: 8, students: '12K' },
    { name: 'Emma Davis', courses: 15, students: '20K' },
    { name: 'Alex Rodriguez', courses: 6, students: '8K' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#9ca3af" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search courses, instructors, topics..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery === '' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <View style={styles.recentSearches}>
                {recentSearches.map((search, index) => (
                  <Pressable key={index} style={styles.recentSearchItem}>
                    <Clock size={16} color="#6b7280" />
                    <Text style={styles.recentSearchText}>{search}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={20} color="#6366f1" />
                <Text style={styles.sectionTitle}>Trending Topics</Text>
              </View>
              <View style={styles.trendingTopics}>
                {trendingTopics.map((topic, index) => (
                  <Pressable key={index} style={styles.topicCard}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicCourses}>{topic.courses} courses</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Instructors</Text>
              <View style={styles.instructors}>
                {popularInstructors.map((instructor, index) => (
                  <Pressable key={index} style={styles.instructorCard}>
                    <View style={styles.instructorAvatar}>
                      <Text style={styles.instructorInitial}>
                        {instructor.name.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.instructorInfo}>
                      <Text style={styles.instructorName}>{instructor.name}</Text>
                      <View style={styles.instructorStats}>
                        <View style={styles.instructorStat}>
                          <BookOpen size={12} color="#6b7280" />
                          <Text style={styles.instructorStatText}>
                            {instructor.courses} courses
                          </Text>
                        </View>
                        <Text style={styles.instructorStudents}>
                          {instructor.students} students
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          </>
        )}

        {searchQuery !== '' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <View style={styles.noResults}>
              <Search size={48} color="#d1d5db" />
              <Text style={styles.noResultsText}>
                Start typing to search for courses, instructors, and topics
              </Text>
            </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 24,
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  recentSearches: {
    gap: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  recentSearchText: {
    fontSize: 16,
    color: '#374151',
  },
  trendingTopics: {
    gap: 12,
  },
  topicCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  topicCourses: {
    fontSize: 14,
    color: '#6b7280',
  },
  instructors: {
    gap: 16,
  },
  instructorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructorInitial: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  instructorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  instructorStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instructorStatText: {
    fontSize: 12,
    color: '#6b7280',
  },
  instructorStudents: {
    fontSize: 12,
    color: '#6b7280',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  noResultsText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
});