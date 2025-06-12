import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import {
	Award,
	Bell,
	BookOpen,
	ChevronRight,
	LocationEdit as Edit,
	CircleHelp as HelpCircle,
	LogOut,
	Settings,
	User,
} from "lucide-react-native";
import React from "react";
import { Alert } from "react-native";

export default function ProfileScreen() {
	const { user, signOut } = useAuth();

	const handleSignOut = () => {
		Alert.alert("Sign Out", "Are you sure you want to sign out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Sign Out",
				style: "destructive",
				onPress: async () => {
					await signOut();
					router.replace("/auth/login");
				},
			},
		]);
	};

	const profileStats = [
		{ label: "Courses Completed", value: "8", icon: BookOpen },
		{ label: "Certificates Earned", value: "3", icon: Award },
		{ label: "Hours Learned", value: "42", icon: BookOpen },
	];

	const menuItems = [
		{ title: "Edit Profile", icon: Edit, onPress: () => {} },
		{ title: "My Progress", icon: User, onPress: () => {} },
		{ title: "My Courses", icon: BookOpen, onPress: () => {} },
		{ title: "Certificates", icon: Award, onPress: () => {} },
		{ title: "Settings", icon: Settings, onPress: () => {} },
		{ title: "Notifications", icon: Bell, onPress: () => {} },
		{ title: "Help & Support", icon: HelpCircle, onPress: () => {} },
	];

	return (
		<Box className="flex-1 bg-background-0">
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack space="lg" className="pb-24">
					{/* Header */}
					<Box className="px-6 pt-16 pb-6">
						<Heading size="2xl" className="text-typography-900">
							Profile
						</Heading>
					</Box>

					{/* Profile Section */}
					<VStack space="lg" className="px-6 items-center">
						<Box className="relative">
							<Avatar size="2xl" className="bg-primary-500">
								<AvatarFallbackText className="text-typography-0 font-semibold text-2xl">
									{user?.email?.charAt(0).toUpperCase() || "U"}
								</AvatarFallbackText>
							</Avatar>
							<Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0">
								<ButtonIcon as={Edit} size="md" />
							</Button>
						</Box>

						<VStack className="items-center">
							<Heading size="xl" className="text-typography-900">
								{user?.email?.split("@")[0] || "User"}
							</Heading>
							<Text className="text-typography-600">{user?.email}</Text>
						</VStack>

						<HStack space="lg">
							{profileStats.map((stat) => (
								<VStack key={stat.label} className="items-center flex-1">
									<stat.icon size={20} color="#6366f1" />
									<Heading size="lg" className="text-typography-900 mt-2">
										{stat.value}
									</Heading>
									<Text className="text-xs text-typography-600 text-center">{stat.label}</Text>
								</VStack>
							))}
						</HStack>
					</VStack>

					{/* Menu Section */}
					<VStack space="xs" className="px-6">
						{menuItems.map((item) => (
							<Button
								key={item.title}
								variant="link"
								className="justify-start border-b border-outline-100"
								onPress={item.onPress}
							>
								<HStack className="justify-between items-center flex-1">
									<HStack space="md" className="items-center">
										<Box className="w-10 h-10 bg-background-100 rounded-full items-center justify-center">
											<item.icon size={20} color="#6366f1" />
										</Box>
										<ButtonText className="text-typography-900 font-medium">{item.title}</ButtonText>
									</HStack>
									<ChevronRight size={20} color="#9ca3af" />
								</HStack>
							</Button>
						))}
					</VStack>

					{/* Sign Out */}
					<Box className="px-6">
						<Button
							variant="outline"
							action="negative"
							className="bg-error-50 border-error-300"
							onPress={handleSignOut}
						>
							<ButtonIcon as={LogOut} className="text-error-600" />
							<ButtonText className="text-error-600 font-semibold">Sign Out</ButtonText>
						</Button>
					</Box>

					{/* Footer */}
					<VStack className="items-center px-6">
						<Text className="text-sm text-typography-600">YourPath Learning Platform</Text>
						<Text className="text-xs text-typography-400">Version 1.0.0</Text>
					</VStack>
				</VStack>
			</ScrollView>
		</Box>
	);
}
