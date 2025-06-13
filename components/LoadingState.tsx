import React from 'react';
import { YStack, XStack, Skeleton, Card } from 'tamagui';

export function LoadingState() {
  return (
    <YStack space="$6" padding="$4">
      {/* Header skeleton */}
      <YStack space="$4">
        <Skeleton height="$4" width={200} />
        <XStack space="$4" flexWrap="wrap">
          <Skeleton height="$4" width={150} />
          <Skeleton height="$4" width={150} />
          <Skeleton height="$4" width={150} />
          <Skeleton height="$4" width={150} />
        </XStack>
      </YStack>

      {/* Cards skeleton */}
      <YStack space="$4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} bordered padding="$4">
            <YStack space="$3">
              <Skeleton height={200} width="100%" />
              <YStack space="$2">
                <Skeleton height="$3" width="80%" />
                <Skeleton height="$2" width="100%" />
                <Skeleton height="$2" width="90%" />
                <XStack space="$2" justifyContent="space-between">
                  <Skeleton height="$3" width={100} />
                  <Skeleton height="$3" width={80} />
                </XStack>
                <XStack space="$2">
                  <Skeleton height="$2" width={40} />
                  <Skeleton height="$2" width={40} />
                  <Skeleton height="$2" width={40} />
                </XStack>
                <Skeleton height="$1" width="100%" />
              </YStack>
            </YStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}