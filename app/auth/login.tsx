import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signIn } = useAuth();
	const buttonScale = useSharedValue(1);

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert("Error", "Please fill in all fields");
			return;
		}

		setLoading(true);
		const { error } = await signIn(email, password);

		if (error) {
			Alert.alert("Login Failed", error.message);
		} else {
			router.replace("/(tabs)");
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
				<Text style={styles.headerTitle}>Welcome Back</Text>
				<View style={styles.placeholder} />
			</View>

			<View style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Sign In</Text>
					<Text style={styles.subtitle}>Continue your learning journey</Text>
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
							autoComplete="password"
						/>
						<Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
							{showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
						</Pressable>
					</View>

					<Pressable onPress={() => router.push("/auth/forgot-password")} style={styles.forgotPassword}>
						<Text style={styles.forgotPasswordText}>Forgot password?</Text>
					</Pressable>

					<AnimatedPressable
						style={[styles.loginButton, buttonAnimatedStyle]}
						onPress={handleLogin}
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
						disabled={loading}
					>
						<Text style={styles.loginButtonText}>{loading ? "Signing In..." : "Sign In"}</Text>
					</AnimatedPressable>
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>Don't have an account? </Text>
					<Pressable onPress={() => router.push("/auth/signup")}>
						<Text style={styles.signupLink}>Sign up</Text>
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
	forgotPassword: {
		alignSelf: "flex-end",
		marginBottom: 32,
	},
	forgotPasswordText: {
		color: "#6366f1",
		fontSize: 14,
		fontWeight: "500",
	},
	loginButton: {
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
	loginButtonText: {
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
	signupLink: {
		color: "#6366f1",
		fontSize: 14,
		fontWeight: "600",
	},
});
