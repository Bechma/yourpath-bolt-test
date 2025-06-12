import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail } from "lucide-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const { resetPassword } = useAuth();
	const buttonScale = useSharedValue(1);

	const handleResetPassword = async () => {
		if (!email) {
			Alert.alert("Error", "Please enter your email address");
			return;
		}

		setLoading(true);
		const { error } = await resetPassword(email);

		if (error) {
			Alert.alert("Error", error.message);
		} else {
			Alert.alert("Success", "Password reset email sent! Please check your inbox.", [
				{ text: "OK", onPress: () => router.back() },
			]);
		}
		setLoading(false);
	};

	const buttonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: buttonScale.value }],
	}));

	const handlePressIn = () => {
		buttonScale.value = withTiming(0.95, { duration: 100 });
	};

	const handlePressOut = () => {
		buttonScale.value = withTiming(1, { duration: 100 });
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.header}>
				<Pressable onPress={() => router.back()} style={styles.backButton}>
					<ArrowLeft size={24} color="#374151" />
				</Pressable>
				<Text style={styles.headerTitle}>Reset Password</Text>
				<View style={styles.placeholder} />
			</View>

			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Forgot Password?</Text>
					<Text style={styles.subtitle}>
						Enter your email address and we'll send you a link to reset your password.
					</Text>
				</View>

				<View style={styles.form}>
					<View style={styles.inputContainer}>
						<Mail size={20} color="#9ca3af" style={styles.inputIcon} />
						<TextInput
							style={styles.input}
							placeholder="Email address"
							value={email}
							onChangeText={setEmail}
							keyboardType="email-address"
							autoCapitalize="none"
							autoComplete="email"
						/>
					</View>

					<AnimatedPressable
						style={[styles.resetButton, buttonAnimatedStyle]}
						onPress={handleResetPassword}
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
						disabled={loading}
					>
						<Text style={styles.resetButtonText}>{loading ? "Sending..." : "Send Reset Link"}</Text>
					</AnimatedPressable>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Remember your password? </Text>
					<Pressable onPress={() => router.push("/auth/login")}>
						<Text style={styles.loginLink}>Sign in</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 60,
		paddingBottom: 20,
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#374151",
	},
	placeholder: {
		width: 40,
	},
	content: {
		flex: 1,
		paddingHorizontal: 32,
		paddingTop: 32,
	},
	titleContainer: {
		marginBottom: 48,
	},
	title: {
		fontSize: 32,
		fontWeight: "800",
		color: "#1f2937",
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
		lineHeight: 24,
	},
	form: {
		marginBottom: 32,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f9fafb",
		borderRadius: 12,
		marginBottom: 24,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	inputIcon: {
		marginRight: 12,
	},
	input: {
		flex: 1,
		paddingVertical: 16,
		fontSize: 16,
		color: "#374151",
	},
	resetButton: {
		backgroundColor: "#6366f1",
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: "center",
		shadowColor: "#6366f1",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	resetButtonText: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "600",
	},
	footer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	footerText: {
		color: "#6b7280",
		fontSize: 14,
	},
	loginLink: {
		color: "#6366f1",
		fontSize: 14,
		fontWeight: "600",
	},
});
