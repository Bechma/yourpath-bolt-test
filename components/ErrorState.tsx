import React from 'react';
import { VStack, Text, Button, useColorModeValue } from 'native-base';
import { AlertCircle, RefreshCw } from 'lucide-react-native';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('#ef4444', '#f87171');

  return (
    <VStack
      space={4}
      alignItems="center"
      justifyContent="center"
      p={8}
      minH="400px"
    >
      <AlertCircle size={64} color={iconColor} />
      <VStack space={2} alignItems="center">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          Something went wrong
        </Text>
        <Text fontSize="md" color={textColor} textAlign="center" maxW="300px">
          {message}
        </Text>
      </VStack>
      <Button
        onPress={onRetry}
        colorScheme="blue"
        leftIcon={<RefreshCw size={16} color="white" />}
        accessibilityLabel="Retry loading learning paths"
      >
        Try Again
      </Button>
    </VStack>
  );
}