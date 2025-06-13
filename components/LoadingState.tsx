import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export function LoadingState() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>Loading learning paths...</Text>
      
      {/* Loading skeleton cards */}
      <View style={styles.skeletonContainer}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonContent}>
              <View style={styles.skeletonTitle} />
              <View style={styles.skeletonDescription} />
              <View style={styles.skeletonDescriptionShort} />
              <View style={styles.skeletonRow}>
                <View style={styles.skeletonSmall} />
                <View style={styles.skeletonSmall} />
              </View>
              <View style={styles.skeletonRow}>
                <View style={styles.skeletonTiny} />
                <View style={styles.skeletonTiny} />
                <View style={styles.skeletonTiny} />
              </View>
              <View style={styles.skeletonProgress} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    fontSize: 16,
    color: '#666',
  },
  skeletonContainer: {
    gap: 16,
  },
  skeletonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  skeletonImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
  },
  skeletonContent: {
    gap: 8,
  },
  skeletonTitle: {
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '80%',
  },
  skeletonDescription: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '100%',
  },
  skeletonDescriptionShort: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '90%',
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonSmall: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: 100,
  },
  skeletonTiny: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: 40,
  },
  skeletonProgress: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    width: '100%',
  },
});