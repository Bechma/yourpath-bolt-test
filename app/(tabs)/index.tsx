import React, { useState } from 'react';
import {
  YStack,
  XStack,
  Text,
  Button,
  ScrollView,
  useTheme,
  H1,
  Separator,
} from 'tamagui';
import { Toast, useToastController } from '@tamagui/toast';
import { Platform } from 'react-native';
import { Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { LearningPathCard } from '@/components/LearningPathCard';
import { FilterSortControls } from '@/components/FilterSortControls';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { useLearningPaths } from '@/hooks/useLearningPaths';
import { SortOption, DifficultyFilter, CompletionFilter } from '@/types/learningPath';

export default function LearningPathsScreen() {
  const [sortBy, setSortBy] = useState<SortOption>('recently-added');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('all');
  const [subjectAreaFilter, setSubjectAreaFilter] = useState<string>('all');

  const toast = useToastController();
  const theme = useTheme();
  const router = useRouter();

  const {
    learningPaths,
    loading,
    error,
    subjectAreas,
    refetch,
  } = useLearningPaths({
    sortBy,
    difficultyFilter,
    completionFilter,
    subjectAreaFilter,
  });

  const handleCreateLearningPath = () => {
    toast.show('Create Learning Path', {
      message: 'This feature will be implemented soon!',
      duration: 3000,
    });
  };

  const handleCardPress = (id: string) => {
    // Navigate to the learning path detail page
    router.push(`/(tabs)/learning-path/${id}`);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }} edges={['top']}>
      <ScrollView
        flex={1}
        backgroundColor="$background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <YStack backgroundColor="$backgroundHover" padding="$4" paddingVertical="$6" shadowColor="$shadowColor" shadowOffset={{ width: 0, height: 1 }} shadowOpacity={0.1} shadowRadius={4}>
          <YStack space="$4">
            <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <YStack space="$1" flex={1}>
                <H1 size="$10" color="$color">
                  Learning Paths
                </H1>
                <Text fontSize="$4" color="$color11">
                  Discover structured learning journeys
                </Text>
              </YStack>
              <Button
                onPress={handleCreateLearningPath}
                backgroundColor="$blue10"
                color="white"
                icon={Plus}
                size="$5"
                borderRadius="$4"
                pressStyle={{ opacity: 0.8 }}
                marginTop={Platform.select({ default: '$4', md: 0 })}
              >
                Create Path
              </Button>
            </XStack>

            <Separator />

            <FilterSortControls
              sortBy={sortBy}
              onSortChange={setSortBy}
              difficultyFilter={difficultyFilter}
              onDifficultyFilterChange={setDifficultyFilter}
              completionFilter={completionFilter}
              onCompletionFilterChange={setCompletionFilter}
              subjectAreas={subjectAreas}
              selectedSubjectArea={subjectAreaFilter}
              onSubjectAreaChange={setSubjectAreaFilter}
            />
          </YStack>
        </YStack>

        {/* Content */}
        <YStack flex={1} padding="$4">
          {learningPaths.length === 0 ? (
            <EmptyState
              message="No learning paths found"
              description="Try adjusting your filters or create a new learning path to get started."
            />
          ) : (
            <YStack space="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$3" color="$color11">
                  {learningPaths.length} learning path{learningPaths.length !== 1 ? 's' : ''} found
                </Text>
              </XStack>

              <YStack space="$6">
                {learningPaths.map((path) => (
                  <LearningPathCard
                    key={path.id}
                    learningPath={path}
                    onPress={handleCardPress}
                  />
                ))}
              </YStack>
            </YStack>
          )}
        </YStack>
      </ScrollView>
      
      <Toast />
    </SafeAreaView>
  );
}