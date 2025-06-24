import { router } from "expo-router";
import { ArrowRight, GraduationCap } from "lucide-react-native";
import { useEffect } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
	const { user, loading } = useAuth();

	useEffect(() => {
		if (user && !loading) {
			router.replace("/(tabs)");
		}
	}, [user, loading]);

	if (loading) {
		return (
			<Center className="flex-1 bg-background-0">
				<VStack space="md" className="items-center">
					<GraduationCap size={48} color="#6366f1" />
					<Spinner size="large" />
					<Text className="text-typography-600">Loading...</Text>
				</VStack>
			</Center>
		);
	}

	return (
		<Box className="flex-1 bg-background-0">
			<Center className="flex-1 px-8 py-16">
				<VStack space="xl" className="items-center max-w-md">
					<Box className="p-6 bg-background-50 rounded-3xl shadow-soft-2">
						<GraduationCap size={80} color="#6366f1" strokeWidth={1.5} />
					</Box>

					<VStack space="md" className="items-center">
						<Heading size="4xl" className="text-center text-typography-900 font-bold tracking-tight">
							YourPath
						</Heading>
						<Heading size="lg" className="text-center text-typography-600 font-medium">
							Unlock your potential with personalized learning experiences
						</Heading>
						<Text className="text-center text-typography-500 leading-6 max-w-sm">
							Join thousands of learners on their journey to mastery. Access expert-crafted courses, track your
							progress, and achieve your goals.
						</Text>
					</VStack>

					<Button size="lg" className="w-full shadow-hard-2" onPress={() => router.push("/auth/login")}>
						<ButtonText className="text-lg font-semibold">Get Started</ButtonText>
						<ButtonIcon as={ArrowRight} className="ml-2" />
					</Button>

					<HStack space="md" className="flex-wrap justify-center">
						<Box className="bg-background-100 px-4 py-2 rounded-full">
							<Text className="text-sm text-typography-600 font-medium">📚 Expert-crafted content</Text>
						</Box>
						<Box className="bg-background-100 px-4 py-2 rounded-full">
							<Text className="text-sm text-typography-600 font-medium">📊 Progress tracking</Text>
						</Box>
						<Box className="bg-background-100 px-4 py-2 rounded-full">
							<Text className="text-sm text-typography-600 font-medium">🎯 Personalized learning</Text>
						</Box>
					</HStack>
				</VStack>
			</Center>
		</Box>
	);
}
