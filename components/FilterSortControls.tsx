import React from 'react';
import {
  XStack,
  YStack,
  Select,
  Text,
  useTheme,
  Adapt,
  Sheet,
} from 'tamagui';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
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
  const theme = useTheme();

  return (
    <YStack space="$4" width="100%">
      <XStack space="$4" flexWrap="wrap" justifyContent="space-between">
        <YStack flex={1} minWidth={200}>
          <Text fontSize="$3" fontWeight="500" color="$color11" marginBottom="$2">
            Sort By
          </Text>
          <Select value={sortBy} onValueChange={onSortChange}>
            <Select.Trigger width="100%" iconAfter={ChevronDown}>
              <Select.Value placeholder="Select sort option" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Item index={0} value="name-asc">
                    <Select.ItemText>Name (A-Z)</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={1} value="name-desc">
                    <Select.ItemText>Name (Z-A)</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={2} value="recently-added">
                    <Select.ItemText>Recently Added</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </YStack>

        <YStack flex={1} minWidth={200}>
          <Text fontSize="$3" fontWeight="500" color="$color11" marginBottom="$2">
            Difficulty Level
          </Text>
          <Select value={difficultyFilter} onValueChange={onDifficultyFilterChange}>
            <Select.Trigger width="100%" iconAfter={ChevronDown}>
              <Select.Value placeholder="Select difficulty" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Item index={0} value="all">
                    <Select.ItemText>All Levels</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={1} value="beginner">
                    <Select.ItemText>Beginner</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={2} value="intermediate">
                    <Select.ItemText>Intermediate</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={3} value="advanced">
                    <Select.ItemText>Advanced</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </YStack>
      </XStack>

      <XStack space="$4" flexWrap="wrap" justifyContent="space-between">
        <YStack flex={1} minWidth={200}>
          <Text fontSize="$3" fontWeight="500" color="$color11" marginBottom="$2">
            Subject Area
          </Text>
          <Select value={selectedSubjectArea} onValueChange={onSubjectAreaChange}>
            <Select.Trigger width="100%" iconAfter={ChevronDown}>
              <Select.Value placeholder="Select subject" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Item index={0} value="all">
                    <Select.ItemText>All Subjects</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  {subjectAreas.map((area, index) => (
                    <Select.Item key={area} index={index + 1} value={area}>
                      <Select.ItemText>{area}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </YStack>

        <YStack flex={1} minWidth={200}>
          <Text fontSize="$3" fontWeight="500" color="$color11" marginBottom="$2">
            Completion Status
          </Text>
          <Select value={completionFilter} onValueChange={onCompletionFilterChange}>
            <Select.Trigger width="100%" iconAfter={ChevronDown}>
              <Select.Value placeholder="Select status" />
            </Select.Trigger>

            <Adapt when="sm" platform="touch">
              <Sheet modal dismissOnSnapToBottom>
                <Sheet.Frame>
                  <Sheet.ScrollView>
                    <Adapt.Contents />
                  </Sheet.ScrollView>
                </Sheet.Frame>
                <Sheet.Overlay />
              </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
              <Select.ScrollUpButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronUp size={20} />
                </YStack>
              </Select.ScrollUpButton>

              <Select.Viewport minWidth={200}>
                <Select.Group>
                  <Select.Item index={0} value="all">
                    <Select.ItemText>All Status</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={1} value="not-started">
                    <Select.ItemText>Not Started</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={2} value="in-progress">
                    <Select.ItemText>In Progress</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                  <Select.Item index={3} value="completed">
                    <Select.ItemText>Completed</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton
                alignItems="center"
                justifyContent="center"
                position="relative"
                width="100%"
                height="$3"
              >
                <YStack zIndex={10}>
                  <ChevronDown size={20} />
                </YStack>
              </Select.ScrollDownButton>
            </Select.Content>
          </Select>
        </YStack>
      </XStack>
    </YStack>
  );
}