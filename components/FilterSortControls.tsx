import React from 'react';
import {
  HStack,
  VStack,
  Select,
  CheckIcon,
  Text,
  useColorModeValue,
  Box,
} from 'native-base';
import { SortOption, DifficultyFilter, CompletionFilter } from '@/types/learningPath';

interface FilterSortControlsProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  difficultyFilter: DifficultyFilter;
  onDifficultyFilterChange: (filter: DifficultyFilter) => void;
  completionFilter: CompletionFilter;
  onCompletionFilterChange: (filter: CompletionFilter) => void;
  subjectAreas: string[];
  selectedSubjectArea: string;
  onSubjectAreaChange: (area: string) => void;
}

export function FilterSortControls({
  sortBy,
  onSortChange,
  difficultyFilter,
  onDifficultyFilterChange,
  completionFilter,
  onCompletionFilterChange,
  subjectAreas,
  selectedSubjectArea,
  onSubjectAreaChange,
}: FilterSortControlsProps) {
  const labelColor = useColorModeValue('gray.700', 'gray.300');
  const selectBg = useColorModeValue('white', 'gray.800');

  return (
    <VStack space={4} w="100%">
      <HStack space={4} flexWrap="wrap" justifyContent="space-between">
        <Box flex={1} minW="200px">
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={2}>
            Sort By
          </Text>
          <Select
            selectedValue={sortBy}
            onValueChange={onSortChange}
            _selectedItem={{
              bg: 'blue.500',
              endIcon: <CheckIcon size="5" />,
            }}
            bg={selectBg}
            accessibilityLabel="Sort learning paths"
          >
            <Select.Item label="Name (A-Z)" value="name-asc" />
            <Select.Item label="Name (Z-A)" value="name-desc" />
            <Select.Item label="Recently Added" value="recently-added" />
          </Select>
        </Box>

        <Box flex={1} minW="200px">
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={2}>
            Difficulty Level
          </Text>
          <Select
            selectedValue={difficultyFilter}
            onValueChange={onDifficultyFilterChange}
            _selectedItem={{
              bg: 'blue.500',
              endIcon: <CheckIcon size="5" />,
            }}
            bg={selectBg}
            accessibilityLabel="Filter by difficulty level"
          >
            <Select.Item label="All Levels" value="all" />
            <Select.Item label="Beginner" value="beginner" />
            <Select.Item label="Intermediate" value="intermediate" />
            <Select.Item label="Advanced" value="advanced" />
          </Select>
        </Box>
      </HStack>

      <HStack space={4} flexWrap="wrap" justifyContent="space-between">
        <Box flex={1} minW="200px">
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={2}>
            Subject Area
          </Text>
          <Select
            selectedValue={selectedSubjectArea}
            onValueChange={onSubjectAreaChange}
            _selectedItem={{
              bg: 'blue.500',
              endIcon: <CheckIcon size="5" />,
            }}
            bg={selectBg}
            accessibilityLabel="Filter by subject area"
          >
            <Select.Item label="All Subjects" value="all" />
            {subjectAreas.map((area) => (
              <Select.Item key={area} label={area} value={area} />
            ))}
          </Select>
        </Box>

        <Box flex={1} minW="200px">
          <Text fontSize="sm" fontWeight="medium" color={labelColor} mb={2}>
            Completion Status
          </Text>
          <Select
            selectedValue={completionFilter}
            onValueChange={onCompletionFilterChange}
            _selectedItem={{
              bg: 'blue.500',
              endIcon: <CheckIcon size="5" />,
            }}
            bg={selectBg}
            accessibilityLabel="Filter by completion status"
          >
            <Select.Item label="All Status" value="all" />
            <Select.Item label="Not Started" value="not-started" />
            <Select.Item label="In Progress" value="in-progress" />
            <Select.Item label="Completed" value="completed" />
          </Select>
        </Box>
      </HStack>
    </VStack>
  );
}