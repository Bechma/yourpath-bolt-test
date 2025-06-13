import React from 'react';
import { Platform } from 'react-native';
import {
  Card,
  XStack,
  YStack,
  Text,
  Button,
  Progress,
  Image,
  useTheme,
} from 'tamagui';
import { BookOpen, Clock, TrendingUp } from 'lucide-react-native';
import { LearningPath } from '@/types/learningPath';

interface LearningPathCardProps {
  learningPath: LearningPath;
  onPress: (id: string) => void;
}

export function LearningPathCard({ learningPath, onPress }: LearningPathCardProps) {
  const theme = useTheme();

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return '$green10';
      case 'intermediate':
        return '$orange10';
      case 'advanced':
        return '$red10';
      default:
        return '$blue10';
    }
  };

  const getCompletionStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '$green10';
      case 'in-progress':
        return '$blue10';
      case 'not-started':
        return '$gray10';
      default:
        return '$gray10';
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
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      onPress={() => onPress(learningPath.id)}
      cursor="pointer"
      overflow="hidden"
      backgroundColor="$background"
      borderColor="$borderColor"
      shadowColor="$shadowColor"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      maxWidth={400}
      width="100%"
    >
      <Card.Header padding={0}>
        <Image
          source={{ uri: learningPath.imageUrl }}
          width="100%"
          height={200}
          resizeMode="cover"
        />
      </Card.Header>
      
      <YStack padding="$4" space="$3">
        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="flex-start">
            <Text
              fontSize="$6"
              fontWeight="bold"
              color="$color"
              flex={1}
              numberOfLines={2}
            >
              {learningPath.title}
            </Text>
            <Button
              size="$2"
              variant="outlined"
              backgroundColor={getCompletionStatusColor(learningPath.completionStatus)}
              borderColor={getCompletionStatusColor(learningPath.completionStatus)}
              color="white"
              marginLeft="$2"
              disabled
            >
              {getCompletionStatusText(learningPath.completionStatus)}
            </Button>
          </XStack>
          
          <Text
            fontSize="$3"
            color="$color11"
            numberOfLines={3}
            lineHeight="$1"
          >
            {learningPath.description}
          </Text>
        </YStack>

        <XStack justifyContent="space-between" alignItems="center">
          <XStack space="$1" alignItems="center">
            <BookOpen size={16} color={theme.color11.val} />
            <Text fontSize="$3" color="$color11">
              {learningPath.totalCourses} courses
            </Text>
          </XStack>
          
          <Button
            size="$2"
            variant="outlined"
            backgroundColor="$blue2"
            borderColor="$blue8"
            color="$blue11"
            disabled
          >
            {learningPath.subjectArea}
          </Button>
        </XStack>

        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$2" color="$color11" fontWeight="500">
              Difficulty Distribution
            </Text>
            <XStack space="$1">
              {learningPath.difficultyDistribution.beginner > 0 && (
                <Button
                  size="$1"
                  backgroundColor={getDifficultyColor('beginner')}
                  color="white"
                  disabled
                >
                  B: {learningPath.difficultyDistribution.beginner}
                </Button>
              )}
              {learningPath.difficultyDistribution.intermediate > 0 && (
                <Button
                  size="$1"
                  backgroundColor={getDifficultyColor('intermediate')}
                  color="white"
                  disabled
                >
                  I: {learningPath.difficultyDistribution.intermediate}
                </Button>
              )}
              {learningPath.difficultyDistribution.advanced > 0 && (
                <Button
                  size="$1"
                  backgroundColor={getDifficultyColor('advanced')}
                  color="white"
                  disabled
                >
                  A: {learningPath.difficultyDistribution.advanced}
                </Button>
              )}
            </XStack>
          </XStack>

          {learningPath.progress !== undefined && (
            <YStack space="$1">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack space="$1" alignItems="center">
                  <TrendingUp size={14} color={theme.color11.val} />
                  <Text fontSize="$2" color="$color11">
                    Progress
                  </Text>
                </XStack>
                <Text fontSize="$2" color="$color11" fontWeight="500">
                  {learningPath.progress}%
                </Text>
              </XStack>
              <Progress
                value={learningPath.progress}
                backgroundColor="$gray5"
                size="$2"
              >
                <Progress.Indicator
                  animation="bouncy"
                  backgroundColor="$blue10"
                />
              </Progress>
            </YStack>
          )}
        </YStack>
      </YStack>
    </Card>
  );
}