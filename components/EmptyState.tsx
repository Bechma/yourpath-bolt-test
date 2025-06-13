import React from 'react';
import { YStack, Text, useTheme } from 'tamagui';
import { BookOpen } from 'lucide-react-native';

interface EmptyStateProps {
  message: string;
  description?: string;
}

export function EmptyState({ message, description }: EmptyStateProps) {
  const theme = useTheme();

  return (
    <YStack
      space="$4"
      alignItems="center"
      justifyContent="center"
      padding="$8"
      minHeight={400}
    >
      <BookOpen size={64} color={theme.color11.val} />
      <YStack space="$2" alignItems="center">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          {message}
        </Text>
        {description && (
          <Text fontSize="$4" color="$color11" textAlign="center" maxWidth={300}>
            {description}
          </Text>
        )}
      </YStack>
    </YStack>
  );
}