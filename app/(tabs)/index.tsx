import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ScrollView,
  useColorModeValue,
  Heading,
  Divider,
  useToast,
} from 'native-base';
import { Platform } from 'react-native';
import { Plus } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const toast = useToast();
  const bg = useColorModeValue('gray.50', 'gray.900');
  const headerBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.900', 'white');

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
    toast.show({
      title: "Create Learning Path",
      description: "This feature will be implemented soon!",
      status: "info",
      duration: 3000,
    });
  };

  const handleCardPress = (id: string) => {
    toast.show({
      title: "Learning Path Details",
      description: `Opening details for learning path ${id}`,
      status: "info",
      duration: 2000,
    });
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
      <ScrollView
        flex={1}
        bg={bg}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <Box bg={headerBg} px={4} py={6} shadow={1}>
          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <VStack space={1} flex={1}>
                <Heading size="xl" color={textColor}>
                  Learning Paths
                </Heading>
                <Text fontSize="md" color="gray.500">
                  Discover structured learning journeys
                </Text>
              </VStack>
              <Button
                onPress={handleCreateLearningPath}
                colorScheme="blue"
                leftIcon={<Plus size={20} color="white" />}
                size="lg"
                borderRadius="xl"
                _pressed={{ opacity: 0.8 }}
                accessibilityLabel="Create new learning path"
                mt={Platform.select({ base: 4, md: 0 })}
              >
                Create Path
              </Button>
            </HStack>

            <Divider />

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
          </VStack>
        </Box>

        {/* Content */}
        <Box flex={1} p={4}>
          {learningPaths.length === 0 ? (
            <EmptyState
              message="No learning paths found"
              description="Try adjusting your filters or create a new learning path to get started."
            />
          ) : (
            <VStack space={4}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="sm" color="gray.500">
                  {learningPaths.length} learning path{learningPaths.length !== 1 ? 's' : ''} found
                </Text>
              </HStack>

              <VStack space={6}>
                {learningPaths.map((path) => (
                  <LearningPathCard
                    key={path.id}
                    learningPath={path}
                    onPress={handleCardPress}
                  />
                ))}
              </VStack>
            </VStack>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}