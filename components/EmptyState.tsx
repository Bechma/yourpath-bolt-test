import React from 'react';
import { VStack, Text, useColorModeValue } from 'native-base';
import { BookOpen } from 'lucide-react-native';

interface EmptyStateProps {
  message: string;
  description?: string;
}

export function EmptyState({ message, description }: EmptyStateProps) {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('#9ca3af', '#6b7280');

  return (
    <VStack
      space={4}
      alignItems="center"
      justifyContent="center"
      p={8}
      minH="400px"
    >
      <BookOpen size={64} color={iconColor} />
      <VStack space={2} alignItems="center">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          {message}
        </Text>
        {description && (
          <Text fontSize="md" color={textColor} textAlign="center" maxW="300px">
            {description}
          </Text>
        )}
      </VStack>
    </VStack>
  );
}