import { useState, useEffect, useMemo } from 'react';
import { LearningPath, SortOption, DifficultyFilter, CompletionFilter } from '@/types/learningPath';
import { mockLearningPaths } from '@/data/mockLearningPaths';

interface UseLearningPathsProps {
  sortBy: SortOption;
  difficultyFilter: DifficultyFilter;
  completionFilter: CompletionFilter;
  subjectAreaFilter: string;
}

export function useLearningPaths({
  sortBy,
  difficultyFilter,
  completionFilter,
  subjectAreaFilter,
}: UseLearningPathsProps) {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call
  const fetchLearningPaths = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate occasional error for demonstration
      if (Math.random() < 0.1) {
        throw new Error('Failed to load learning paths. Please check your connection.');
      }
      
      setLearningPaths(mockLearningPaths);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  // Get unique subject areas
  const subjectAreas = useMemo(() => {
    const areas = [...new Set(learningPaths.map(path => path.subjectArea))];
    return areas.sort();
  }, [learningPaths]);

  // Filter and sort learning paths
  const filteredAndSortedPaths = useMemo(() => {
    let filtered = [...learningPaths];

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(path => {
        const distribution = path.difficultyDistribution;
        switch (difficultyFilter) {
          case 'beginner':
            return distribution.beginner > 0;
          case 'intermediate':
            return distribution.intermediate > 0;
          case 'advanced':
            return distribution.advanced > 0;
          default:
            return true;
        }
      });
    }

    // Apply completion status filter
    if (completionFilter !== 'all') {
      filtered = filtered.filter(path => path.completionStatus === completionFilter);
    }

    // Apply subject area filter
    if (subjectAreaFilter !== 'all') {
      filtered = filtered.filter(path => path.subjectArea === subjectAreaFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'recently-added':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [learningPaths, sortBy, difficultyFilter, completionFilter, subjectAreaFilter]);

  return {
    learningPaths: filteredAndSortedPaths,
    loading,
    error,
    subjectAreas,
    refetch: fetchLearningPaths,
  };
}