import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { mockLearningPaths } from "@/data/mockData";
import type { LearningPath } from "@/types/learning";
import { Image } from "expo-image";
import { BookOpen, Calendar, Clock, ListFilter as Filter, Plus, Search, Star, User, Users } from "lucide-react-native";
import React, { useState } from "react";

export default function PathsScreen() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedDifficulty, setSelectedDifficulty] = useState("All");
	const [learningPaths, setLearningPaths] = useState(mockLearningPaths);

	const difficulties = ["All", "Beginner", "Intermediate", "Advanced", "Expert", "Guru"];

	const filteredPaths = learningPaths.filter((path) => {
		const matchesSearch =
			path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			path.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesDifficulty = selectedDifficulty === "All" || path.difficulty === selectedDifficulty;
		return matchesSearch && matchesDifficulty;
	});

	const handlePathPress = (path: LearningPath) => {
		console.log("Navigate to learning path:", path.id);
	};

	const handleCreatePath = () => {
		console.log("Create new learning path");
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Beginner":
				return "success";
			case "Intermediate":
				return "warning";
			case "Advanced":
				return "error";
			case "Expert":
				return "info";
			case "Guru":
				return "muted";
			default:
				return "muted";
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<Box className="flex-1 bg-background-0">
			<VStack space="lg" className="flex-1">
				{/* Header */}
				<Box className="px-6 pt-16 pb-6">
					<HStack className="justify-between items-start">
						<VStack className="flex-1">
							<Heading size="2xl" className="text-typography-900 mb-1">
								Learning Paths
							</Heading>
							<Text className="text-sm text-typography-500 leading-5">
								Community-created learning journeys powered by AI
							</Text>
						</VStack>
						<HStack space="sm">
							<Button variant="outline" size="sm">
								<ButtonIcon as={Filter} />
							</Button>
							<Button size="sm" onPress={handleCreatePath}>
								<ButtonIcon as={Plus} />
							</Button>
						</HStack>
					</HStack>
				</Box>

				{/* Search */}
				<Box className="px-6">
					<Input variant="outline" size="md">
						<InputSlot className="pl-3">
							<InputIcon as={Search} className="text-typography-400" />
						</InputSlot>
						<InputField placeholder="Search learning paths..." value={searchQuery} onChangeText={setSearchQuery} />
					</Input>
				</Box>

				{/* Difficulty Filter */}
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
					<HStack space="sm">
						{difficulties.map((difficulty) => (
							<Button
								key={difficulty}
								variant={selectedDifficulty === difficulty ? "solid" : "outline"}
								size="sm"
								onPress={() => setSelectedDifficulty(difficulty)}
							>
								<ButtonText>{difficulty}</ButtonText>
							</Button>
						))}
					</HStack>
				</ScrollView>

				{/* Stats */}
				<Box className="px-6">
					<HStack space="sm">
						<Card className="flex-1 p-4 bg-background-50 border-0">
							<VStack className="items-center">
								<BookOpen size={20} color="#6366f1" />
								<Heading size="lg" className="text-typography-900 mt-1">
									{filteredPaths.length}
								</Heading>
								<Text className="text-xs text-typography-500 text-center">Available Paths</Text>
							</VStack>
						</Card>
						<Card className="flex-1 p-4 bg-background-50 border-0">
							<VStack className="items-center">
								<Heading size="lg" className="text-typography-900 mt-1">
									{filteredPaths.reduce((sum, path) => sum + path.totalCourses, 0)}
								</Heading>
								<Text className="text-xs text-typography-500 text-center">Total Courses</Text>
							</VStack>
						</Card>
						<Card className="flex-1 p-4 bg-background-50 border-0">
							<VStack className="items-center">
								<Heading size="lg" className="text-typography-900 mt-1">
									{Math.round(filteredPaths.reduce((sum, path) => sum + path.estimatedTime, 0))}h
								</Heading>
								<Text className="text-xs text-typography-500 text-center">Total Hours</Text>
							</VStack>
						</Card>
					</HStack>
				</Box>

				{/* Learning Paths */}
				<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
					<VStack space="lg" className="px-6 pb-24">
						{filteredPaths.map((path) => (
							<Card
								key={path.id}
								className="p-0 overflow-hidden shadow-soft-2"
								onTouchEnd={() => handlePathPress(path)}
								onPointerDown={() => handlePathPress(path)}
							>
								<Image source={{ uri: path.image }} style={{ width: "100%", height: 180 }} contentFit="cover" />

								<VStack space="md" className="p-5">
									{/* Title and Difficulty */}
									<HStack className="justify-between items-start">
										<Heading size="lg" className="text-typography-900 flex-1 mr-3 leading-6">
											{path.title}
										</Heading>
										<Badge action={getDifficultyColor(path.difficulty)} variant="solid">
											<BadgeText>{path.difficulty}</BadgeText>
										</Badge>
									</HStack>

									{/* Description */}
									<Text className="text-sm text-typography-600 leading-5">{path.description}</Text>

									{/* Creator and AI Tag */}
									<HStack className="justify-between items-center">
										<HStack space="xs" className="items-center">
											<User size={14} color="#6b7280" />
											<Text className="text-xs text-typography-500 font-medium">Created by community</Text>
										</HStack>
										<Badge action="info" variant="outline">
											<BadgeText>AI-Powered</BadgeText>
										</Badge>
									</HStack>

									{/* Objectives */}
									<VStack space="xs">
										<Text className="text-sm font-semibold text-typography-700">Learning Objectives:</Text>
										{path.objectives.slice(0, 2).map((objective) => (
											<Text key={objective} className="text-xs text-typography-600 pl-2">
												• {objective}
											</Text>
										))}
										{path.objectives.length > 2 && (
											<Text className="text-xs text-typography-400 italic pl-2 mt-1">
												+{path.objectives.length - 2} more objectives
											</Text>
										)}
									</VStack>

									{/* Stats */}
									<HStack space="lg">
										<HStack space="xs" className="items-center">
											<BookOpen size={16} color="#6b7280" />
											<Text className="text-xs text-typography-600 font-medium">{path.totalCourses} courses</Text>
										</HStack>
										<HStack space="xs" className="items-center">
											<Clock size={16} color="#6b7280" />
											<Text className="text-xs text-typography-600 font-medium">{path.estimatedTime}h</Text>
										</HStack>
										<HStack space="xs" className="items-center">
											<Users size={16} color="#6b7280" />
											<Text className="text-xs text-typography-600 font-medium">Community</Text>
										</HStack>
									</HStack>

									{/* Course Preview */}
									<VStack space="sm">
										<Text className="text-sm font-semibold text-typography-700">Featured Courses:</Text>
										<VStack space="xs">
											{path.courses.slice(0, 3).map((course, index) => (
												<HStack key={course.id} space="sm" className="items-center bg-background-50 p-3 rounded-lg">
													<Box className="w-6 h-6 bg-primary-600 rounded-full items-center justify-center">
														<Text className="text-xs text-typography-0 font-semibold">{index + 1}</Text>
													</Box>
													<VStack className="flex-1">
														<Text className="text-sm font-semibold text-typography-900">{course.title}</Text>
														<Text className="text-xs text-typography-600">
															{course.lessons.length} lessons • {Math.round(course.duration / 60)}h
														</Text>
													</VStack>
													<HStack space="xs" className="items-center">
														<Star size={12} color="#fbbf24" />
														<Text className="text-xs text-typography-600 font-medium">{course.rating}</Text>
													</HStack>
												</HStack>
											))}
											{path.courses.length > 3 && (
												<Text className="text-xs text-typography-400 italic text-center py-2">
													+{path.courses.length - 3} more courses
												</Text>
											)}
										</VStack>
									</VStack>

									{/* Footer */}
									<VStack space="sm" className="pt-4 border-t border-outline-100">
										<HStack space="xs" className="items-center">
											<Calendar size={12} color="#9ca3af" />
											<Text className="text-xs text-typography-400">Updated {formatDate(path.updatedAt)}</Text>
										</HStack>
										<VStack space="xs">
											<Text className="text-xs font-semibold text-typography-700">Progress: {path.progress}%</Text>
											<Progress value={path.progress} size="sm">
												<ProgressFilledTrack />
											</Progress>
										</VStack>
									</VStack>
								</VStack>
							</Card>
						))}

						{filteredPaths.length === 0 && (
							<VStack className="items-center py-12">
								<Search size={48} color="#d1d5db" />
								<Heading size="md" className="text-typography-600 text-center mt-4">
									No learning paths found
								</Heading>
								<Text className="text-sm text-typography-400 text-center mt-2">
									Try adjusting your search or difficulty filter
								</Text>
							</VStack>
						)}
					</VStack>
				</ScrollView>
			</VStack>
		</Box>
	);
}
