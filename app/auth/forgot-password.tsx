import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Mail } from "lucide-react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const { resetPassword } = useAuth();

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

	return (
		<KeyboardAvoidingView 
			style={{ flex: 1 }} 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<Box className="flex-1 bg-background-0">
				{/* Header */}
				<HStack className="justify-between items-center px-5 pt-16 pb-5">
					<Button variant="link" size="sm" onPress={() => router.back()}>
						<ButtonIcon as={ArrowLeft} className="text-typography-700" />
					</Button>
					<Heading size="md" className="text-typography-700">Reset Password</Heading>
					<Box className="w-10" />
				</HStack>

				{/* Content */}
				<VStack space="xl" className="flex-1 px-8 pt-8">
					<VStack space="md">
						<Heading size="3xl" className="text-typography-900 font-bold">
							Forgot Password?
						</Heading>
						<Text className="text-typography-600 leading-6">
							Enter your email address and we'll send you a link to reset your password.
						</Text>
					</VStack>

					<VStack space="lg">
						<Input variant="outline" size="lg">
							<InputSlot className="pl-4">
								<InputIcon as={Mail} className="text-typography-400" />
							</InputSlot>
							<InputField
								placeholder="Email address"
								value={email}
								onChangeText={setEmail}
								keyboardType="email-address"
								autoCapitalize="none"
								autoComplete="email"
							/>
						</Input>

						<Button 
							size="lg" 
							className="shadow-soft-2"
							onPress={handleResetPassword}
							disabled={loading}
						>
							<ButtonText className="font-semibold">
								{loading ? "Sending..." : "Send Reset Link"}
							</ButtonText>
						</Button>
					</VStack>

					<HStack className="justify-center items-center">
						<Text className="text-typography-600">Remember your password? </Text>
						<Button variant="link" size="sm" onPress={() => router.push("/auth/login")}>
							<ButtonText className="text-primary-600 font-semibold">Sign in</ButtonText>
						</Button>
					</HStack>
				</VStack>
			</Box>
		</KeyboardAvoidingView>
	);
}