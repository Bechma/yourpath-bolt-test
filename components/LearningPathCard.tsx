import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Progress,
  Pressable,
  Image,
  useColorModeValue,
} from 'native-base';
import { BookOpen, Clock, TrendingUp } from 'lucide-react-native';
import { LearningPath } from '@/types/learningPath';

interface LearningPathCardProps {
  learningPath: LearningPath;
  onPress: (id: string) => void;
}

export function LearningPathCard({ learningPath, onPress }: LearningPathCardProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const titleColor = useColorModeValue('gray.900', 'white');

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'info';
    }
  };

  const getCompletionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'not-started':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getCompletionStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  return (
    <Pressable
      onPress={() => onPress(learningPath.id)}
      _pressed={{ opacity: 0.8 }}
      _hover={{ transform: [{ scale: 1.02 }] }}
      accessibilityRole="button"
      accessibilityLabel={`Learning path: ${learningPath.title}`}
      accessibilityHint="Tap to view details"
    >
      <Box
        bg={cardBg}
        borderWidth={1}
        borderColor={borderColor}
        borderRadius="xl"
        overflow="hidden"
        shadow={2}
        _hover={{ shadow: 4 }}
        transition={{ duration: 200 }}
      >
        <Image
          source={{ uri: learningPath.imageUrl }}
          alt={learningPath.title}
          height="200px"
          width="100%"
          resizeMode="cover"
        />
        
        <VStack p={4} space={3}>
          <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="flex-start">
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={titleColor}
                flex={1}
                numberOfLines={2}
              >
                {learningPath.title}
              </Text>
              <Badge
                colorScheme={getCompletionStatusColor(learningPath.completionStatus)}
                variant="subtle"
                ml={2}
              >
                {getCompletionStatusText(learningPath.completionStatus)}
              </Badge>
            </HStack>
            
            <Text
              fontSize="sm"
              color={textColor}
              numberOfLines={3}
              lineHeight="sm"
            >
              {learningPath.description}
            </Text>
          </VStack>

          <HStack justifyContent="space-between" alignItems="center">
            <HStack space={1} alignItems="center">
              <BookOpen size={16} color={textColor} />
              <Text fontSize="sm" color={textColor}>
                {learningPath.totalCourses} courses
              </Text>
            </HStack>
            
            <Badge colorScheme="blue" variant="outline">
              {learningPath.subjectArea}
            </Badge>
          </HStack>

          <VStack space={2}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xs" color={textColor} fontWeight="medium">
                Difficulty Distribution
              </Text>
              <HStack space={1}>
                {learningPath.difficultyDistribution.beginner > 0 && (
                  <Badge size="xs" colorScheme={getDifficultyColor('beginner')}>
                    B: {learningPath.difficultyDistribution.beginner}
                  </Badge>
                )}
                {learningPath.difficultyDistribution.intermediate > 0 && (
                  <Badge size="xs" colorScheme={getDifficultyColor('intermediate')}>
                    I: {learningPath.difficultyDistribution.intermediate}
                  </Badge>
                )}
                {learningPath.difficultyDistribution.advanced > 0 && (
                  <Badge size="xs" colorScheme={getDifficultyColor('advanced')}>
                    A: {learningPath.difficultyDistribution.advanced}
                  </Badge>
                )}
              </HStack>
            </HStack>

            {learningPath.progress !== undefined && (
              <VStack space={1}>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space={1} alignItems="center">
                    <TrendingUp size={14} color={textColor} />
                    <Text fontSize="xs" color={textColor}>
                      Progress
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color={textColor} fontWeight="medium">
                    {learningPath.progress}%
                  </Text>
                </HStack>
                <Progress
                  value={learningPath.progress}
                  colorScheme="blue"
                  size="sm"
                  borderRadius="full"
                />
              </VStack>
            )}
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
}