import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SignupScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signUp } = useAuth();
	const buttonScale = useSharedValue(1);

	const handleSignup = async () => {
		if (!email || !password || !confirmPassword) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return;
		}

		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters");
			return;
		}

		setLoading(true);
		const { error } = await signUp(email, password);

		if (error) {
			Alert.alert("Signup Failed", error.message);
		} else {
			Alert.alert("Success", "Account created successfully! Please check your email to verify your account.", [
				{ text: "OK", onPress: () => router.push("/auth/login") },
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
				<Text style={styles.headerTitle}>Create Account</Text>
				<View style={styles.placeholder} />
			</View>

			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Sign Up</Text>
					<Text style={styles.subtitle}>Start your learning journey today</Text>
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

					<View style={styles.inputContainer}>
						<Lock size={20} color="#9ca3af" style={styles.inputIcon} />
						<TextInput
							style={[styles.input, styles.passwordInput]}
							placeholder="Password"
							value={password}
							onChangeText={setPassword}
							secureTextEntry={!showPassword}
							autoComplete="new-password"
						/>
						<Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
							{showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
						</Pressable>
					</View>

					<View style={styles.inputContainer}>
						<Lock size={20} color="#9ca3af" style={styles.inputIcon} />
						<TextInput
							style={[styles.input, styles.passwordInput]}
							placeholder="Confirm password"
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							secureTextEntry={!showConfirmPassword}
							autoComplete="new-password"
						/>
						<Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
							{showConfirmPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
						</Pressable>
					</View>

					<AnimatedPressable
						style={[styles.signupButton, buttonAnimatedStyle]}
						onPress={handleSignup}
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
						disabled={loading}
					>
						<Text style={styles.signupButtonText}>{loading ? "Creating Account..." : "Create Account"}</Text>
					</AnimatedPressable>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Already have an account? </Text>
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
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
	},
	form: {
		marginBottom: 32,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f9fafb",
		borderRadius: 12,
		marginBottom: 16,
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
	passwordInput: {
		paddingRight: 40,
	},
	eyeIcon: {
		position: "absolute",
		right: 16,
		padding: 4,
	},
	signupButton: {
		backgroundColor: "#6366f1",
		borderRadius: 12,
		paddingVertical: 16,
		alignItems: "center",
		marginTop: 16,
		shadowColor: "#6366f1",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 4,
	},
	signupButtonText: {
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
