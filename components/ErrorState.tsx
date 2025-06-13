import React from 'react';
import { YStack, Text, Button, useTheme } from 'tamagui';
import { CircleAlert as AlertCircle, RefreshCw } from 'lucide-react-native';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const theme = useTheme();

  return (
    <YStack
      space="$4"
      alignItems="center"
      justifyContent="center"
      padding="$8"
      minHeight={400}
    >
      <AlertCircle size={64} color={theme.red10.val} />
      <YStack space="$2" alignItems="center">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          Something went wrong
        </Text>
        <Text fontSize="$4" color="$color11" textAlign="center" maxWidth={300}>
          {message}
        </Text>
      </YStack>
      <Button
        onPress={onRetry}
        backgroundColor="$blue10"
        color="white"
        icon={RefreshCw}
        size="$4"
      >
        Try Again
      </Button>
    </YStack>
  );
}