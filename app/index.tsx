import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { ArrowRight, GraduationCap } from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LandingPage() {
	const { user, loading } = useAuth();
	const fadeAnim = useSharedValue(0);
	const slideAnim = useSharedValue(50);
	const scaleAnim = useSharedValue(0.8);

	const containerStyle = useAnimatedStyle(() => ({
		opacity: fadeAnim.value,
		transform: [{ translateY: slideAnim.value }],
	}));

	const buttonStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scaleAnim.value }],
	}));

	useEffect(() => {
		if (user && !loading) {
			router.replace("/(tabs)");
		}
	}, [user, loading]);

	useEffect(() => {
		// Animate elements on mount
		fadeAnim.value = withTiming(1, { duration: 800 });
		slideAnim.value = withTiming(0, { duration: 800 });
		scaleAnim.value = withDelay(300, withSpring(1, { damping: 15 }));
	}, [fadeAnim, slideAnim, scaleAnim]);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<GraduationCap size={48} color="#6366f1" />
				<Text style={styles.loadingText}>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.content, containerStyle]}>
				<View style={styles.iconContainer}>
					<GraduationCap size={80} color="#6366f1" strokeWidth={1.5} />
				</View>

				<Text style={styles.title}>YourPath</Text>
				<Text style={styles.subtitle}>Unlock your potential with personalized learning experiences</Text>
				<Text style={styles.description}>
					Join thousands of learners on their journey to mastery. Access expert-crafted courses, track your progress,
					and achieve your goals.
				</Text>

				<AnimatedPressable style={[styles.getStartedButton, buttonStyle]} onPress={() => router.push("/auth/login")}>
					<Text style={styles.buttonText}>Get Started</Text>
					<ArrowRight size={20} color="#ffffff" strokeWidth={2} />
				</AnimatedPressable>

				<View style={styles.features}>
					<View style={styles.feature}>
						<Text style={styles.featureText}>📚 Expert-crafted content</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureText}>📊 Progress tracking</Text>
					</View>
					<View style={styles.feature}>
						<Text style={styles.featureText}>🎯 Personalized learning</Text>
					</View>
				</View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ffffff",
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: "#6b7280",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
		paddingVertical: 64,
	},
	iconContainer: {
		marginBottom: 32,
		padding: 24,
		backgroundColor: "#f8fafc",
		borderRadius: 24,
		shadowColor: "#6366f1",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.1,
		shadowRadius: 24,
		elevation: 8,
	},
	title: {
		fontSize: 48,
		fontWeight: "800",
		color: "#1f2937",
		marginBottom: 16,
		textAlign: "center",
		letterSpacing: -1,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "600",
		color: "#4b5563",
		textAlign: "center",
		marginBottom: 16,
		lineHeight: 28,
	},
	description: {
		fontSize: 16,
		color: "#6b7280",
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 48,
		maxWidth: 400,
	},
	getStartedButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#6366f1",
		paddingHorizontal: 32,
		paddingVertical: 16,
		borderRadius: 16,
		shadowColor: "#6366f1",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.3,
		shadowRadius: 16,
		elevation: 8,
		marginBottom: 48,
		gap: 8,
	},
	buttonText: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "600",
	},
	features: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 16,
	},
	feature: {
		backgroundColor: "#f1f5f9",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	featureText: {
		fontSize: 14,
		color: "#475569",
		fontWeight: "500",
	},
});
