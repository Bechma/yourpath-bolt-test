import { router } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { signUp } = useAuth();

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

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<Box className="flex-1 bg-background-0">
				{/* Header */}
				<HStack className="justify-between items-center px-5 pt-16 pb-5">
					<Button variant="link" size="sm" onPress={() => router.back()}>
						<ButtonIcon as={ArrowLeft} className="text-typography-700" />
					</Button>
					<Heading size="md" className="text-typography-700">
						Create Account
					</Heading>
					<Box className="w-10" />
				</HStack>

				{/* Content */}
				<VStack space="xl" className="flex-1 px-8 pt-8">
					<VStack space="md">
						<Heading size="3xl" className="text-typography-900 font-bold">
							Sign Up
						</Heading>
						<Text className="text-typography-600">Start your learning journey today</Text>
					</VStack>

					<VStack space="lg">
						<VStack space="md">
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

							<Input variant="outline" size="lg">
								<InputSlot className="pl-4">
									<InputIcon as={Lock} className="text-typography-400" />
								</InputSlot>
								<InputField
									placeholder="Password"
									value={password}
									onChangeText={setPassword}
									secureTextEntry={!showPassword}
									autoComplete="new-password"
									className="pr-12"
								/>
								<InputSlot className="pr-4">
									<Button variant="link" size="sm" onPress={() => setShowPassword(!showPassword)}>
										<ButtonIcon as={showPassword ? EyeOff : Eye} className="text-typography-400" />
									</Button>
								</InputSlot>
							</Input>

							<Input variant="outline" size="lg">
								<InputSlot className="pl-4">
									<InputIcon as={Lock} className="text-typography-400" />
								</InputSlot>
								<InputField
									placeholder="Confirm password"
									value={confirmPassword}
									onChangeText={setConfirmPassword}
									secureTextEntry={!showConfirmPassword}
									autoComplete="new-password"
									className="pr-12"
								/>
								<InputSlot className="pr-4">
									<Button variant="link" size="sm" onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
										<ButtonIcon as={showConfirmPassword ? EyeOff : Eye} className="text-typography-400" />
									</Button>
								</InputSlot>
							</Input>
						</VStack>

						<Button size="lg" className="shadow-soft-2 mt-4" onPress={handleSignup} disabled={loading}>
							<ButtonText className="font-semibold">{loading ? "Creating Account..." : "Create Account"}</ButtonText>
						</Button>
					</VStack>

					<HStack className="justify-center items-center">
						<Text className="text-typography-600">Already have an account? </Text>
						<Button variant="link" size="sm" onPress={() => router.push("/auth/login")}>
							<ButtonText className="text-primary-600 font-semibold">Sign in</ButtonText>
						</Button>
					</HStack>
				</VStack>
			</Box>
		</KeyboardAvoidingView>
	);
}
