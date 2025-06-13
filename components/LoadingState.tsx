import React from 'react';
import { VStack, HStack, Skeleton, Box } from 'native-base';

export function LoadingState() {
  return (
    <VStack space={6} p={4}>
      {/* Header skeleton */}
      <VStack space={4}>
        <Skeleton h="10" w="200px" rounded="md" />
        <HStack space={4} flexWrap="wrap">
          <Skeleton h="10" w="150px" rounded="md" />
          <Skeleton h="10" w="150px" rounded="md" />
          <Skeleton h="10" w="150px" rounded="md" />
          <Skeleton h="10" w="150px" rounded="md" />
        </HStack>
      </VStack>

      {/* Cards skeleton */}
      <VStack space={4}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Box key={item} borderWidth={1} borderColor="gray.200" borderRadius="xl" p={4}>
            <VStack space={3}>
              <Skeleton h="200px" w="100%" rounded="lg" />
              <VStack space={2}>
                <Skeleton h="6" w="80%" rounded="md" />
                <Skeleton h="4" w="100%" rounded="md" />
                <Skeleton h="4" w="90%" rounded="md" />
                <HStack space={2} justifyContent="space-between">
                  <Skeleton h="6" w="100px" rounded="md" />
                  <Skeleton h="6" w="80px" rounded="md" />
                </HStack>
                <HStack space={2}>
                  <Skeleton h="4" w="40px" rounded="md" />
                  <Skeleton h="4" w="40px" rounded="md" />
                  <Skeleton h="4" w="40px" rounded="md" />
                </HStack>
                <Skeleton h="2" w="100%" rounded="full" />
              </VStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}