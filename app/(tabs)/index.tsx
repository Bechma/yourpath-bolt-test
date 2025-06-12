import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Clock, TrendingUp, Award } from "lucide-react-native";
import { Image } from "expo-image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";

export default function HomeScreen() {
	const { user } = useAuth();

	const featuredCourses = [
		{
			id: 1,
			title: "React Native Fundamentals",
			instructor: "Sarah Johnson",
			duration: "8 hours",
			progress: 65,
			image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 2,
			title: "Advanced JavaScript",
			instructor: "Mike Chen",
			duration: "12 hours",
			progress: 30,
			image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	];

	const stats = [
		{ icon: BookOpen, label: "Courses", value: "12" },
		{ icon: Clock, label: "Hours", value: "48" },
		{ icon: Award, label: "Certificates", value: "3" },
	];

	return (
		<Box className="flex-1 bg-background-0">
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack space="lg" className="pb-24">
					{/* Header */}
					<Box className="px-6 pt-16 pb-6">
						<HStack className="justify-between items-center">
							<VStack>
								<Text className="text-typography-500">Welcome back,</Text>
								<Heading size="xl" className="text-typography-900 mt-1">
									{user?.email?.split("@")[0] || "Learner"}!
								</Heading>
							</VStack>
							<Avatar size="lg" className="bg-primary-500">
								<AvatarFallbackText className="text-typography-0 font-semibold">
									{user?.email?.charAt(0).toUpperCase() || "L"}
								</AvatarFallbackText>
							</Avatar>
						</HStack>
					</Box>

					{/* Stats */}
					<Box className="px-6">
						<HStack space="md">
							{stats.map((stat) => (
								<Card key={stat.label} className="flex-1 p-5 bg-background-50 border-0">
									<VStack className="items-center">
										<stat.icon size={24} color="#6366f1" />
										<Heading size="xl" className="text-typography-900 mt-2">
											{stat.value}
										</Heading>
										<Text className="text-xs text-typography-500 mt-1">{stat.label}</Text>
									</VStack>
								</Card>
							))}
						</HStack>
					</Box>

					{/* Continue Learning */}
					<VStack space="md" className="px-6">
						<HStack className="justify-between items-center">
							<Heading size="lg" className="text-typography-900">Continue Learning</Heading>
							<Button variant="link" size="sm">
								<ButtonText className="text-primary-600">See all</ButtonText>
							</Button>
						</HStack>

						<VStack space="md">
							{featuredCourses.map((course) => (
								<Card key={course.id} className="p-0 overflow-hidden shadow-soft-1">
									<HStack>
										<Image 
											source={{ uri: course.image }} 
											style={{ width: 80, height: 80 }}
											contentFit="cover"
										/>
										<VStack className="flex-1 p-4 justify-between">
											<VStack space="xs">
												<Heading size="sm" className="text-typography-900">
													{course.title}
												</Heading>
												<Text className="text-sm text-typography-500">
													by {course.instructor}
												</Text>
											</VStack>
											<HStack className="justify-between items-center">
												<VStack className="flex-1 mr-4">
													<Progress value={course.progress} size="sm" className="mb-1">
														<ProgressFilledTrack />
													</Progress>
													<Text className="text-xs text-typography-500">
														{course.progress}%
													</Text>
												</VStack>
												<Text className="text-xs text-typography-500">
													{course.duration}
												</Text>
											</HStack>
										</VStack>
									</HStack>
								</Card>
							))}
						</VStack>
					</VStack>

					{/* Quick Actions */}
					<VStack space="md" className="px-6">
						<Heading size="lg" className="text-typography-900">Quick Actions</Heading>
						<HStack space="md">
							<Card className="flex-1 p-5 bg-background-50 border-0">
								<VStack className="items-center">
									<BookOpen size={32} color="#6366f1" />
									<Heading size="md" className="text-typography-900 mt-3 text-center">
										Browse Courses
									</Heading>
									<Text className="text-xs text-typography-500 mt-1 text-center">
										Discover new topics
									</Text>
								</VStack>
							</Card>
							<Card className="flex-1 p-5 bg-background-50 border-0">
								<VStack className="items-center">
									<TrendingUp size={32} color="#10b981" />
									<Heading size="md" className="text-typography-900 mt-3 text-center">
										View Progress
									</Heading>
									<Text className="text-xs text-typography-500 mt-1 text-center">
										Track your learning
									</Text>
								</VStack>
							</Card>
						</HStack>
					</VStack>
				</VStack>
			</ScrollView>
		</Box>
	);
}