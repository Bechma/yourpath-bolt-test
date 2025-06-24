import { BookOpen, Clock, Search, TrendingUp } from "lucide-react-native";
import { useState } from "react";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function SearchScreen() {
	const [searchQuery, setSearchQuery] = useState("");
	const [recentSearches] = useState(["React Native", "JavaScript", "UI Design", "Machine Learning"]);

	const trendingTopics = [
		{ title: "Web Development", courses: 45 },
		{ title: "Data Science", courses: 32 },
		{ title: "Mobile Development", courses: 28 },
		{ title: "Digital Marketing", courses: 23 },
		{ title: "Graphic Design", courses: 19 },
	];

	const popularInstructors = [
		{ name: "Sarah Johnson", courses: 12, students: "15K" },
		{ name: "Mike Chen", courses: 8, students: "12K" },
		{ name: "Emma Davis", courses: 15, students: "20K" },
		{ name: "Alex Rodriguez", courses: 6, students: "8K" },
	];

	return (
		<Box className="flex-1 bg-background-0">
			<VStack space="lg" className="flex-1">
				{/* Header */}
				<Box className="px-6 pt-16 pb-6">
					<Heading size="2xl" className="text-typography-900">
						Search
					</Heading>
				</Box>

				{/* Search */}
				<Box className="px-6">
					<Input variant="outline" size="md">
						<InputSlot className="pl-3">
							<InputIcon as={Search} className="text-typography-400" />
						</InputSlot>
						<InputField
							placeholder="Search courses, instructors, topics..."
							value={searchQuery}
							onChangeText={setSearchQuery}
						/>
					</Input>
				</Box>

				<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
					<VStack space="lg" className="px-6 pb-24">
						{searchQuery === "" && (
							<>
								{/* Recent Searches */}
								<VStack space="md">
									<Heading size="lg" className="text-typography-900">
										Recent Searches
									</Heading>
									<VStack space="sm">
										{recentSearches.map((search) => (
											<Button key={search} variant="link" className="justify-start">
												<HStack space="sm" className="items-center">
													<Clock size={16} color="#6b7280" />
													<ButtonText className="text-typography-700">{search}</ButtonText>
												</HStack>
											</Button>
										))}
									</VStack>
								</VStack>

								{/* Trending Topics */}
								<VStack space="md">
									<HStack space="sm" className="items-center">
										<TrendingUp size={20} color="#6366f1" />
										<Heading size="lg" className="text-typography-900">
											Trending Topics
										</Heading>
									</HStack>
									<VStack space="sm">
										{trendingTopics.map((topic) => (
											<Card key={topic.title} className="p-4 bg-background-50 border-l-4 border-l-primary-500">
												<VStack space="xs">
													<Heading size="md" className="text-typography-900">
														{topic.title}
													</Heading>
													<Text className="text-sm text-typography-600">{topic.courses} courses</Text>
												</VStack>
											</Card>
										))}
									</VStack>
								</VStack>

								{/* Popular Instructors */}
								<VStack space="md">
									<Heading size="lg" className="text-typography-900">
										Popular Instructors
									</Heading>
									<VStack space="sm">
										{popularInstructors.map((instructor) => (
											<Card key={instructor.name} className="p-4 bg-background-50 border-0">
												<HStack space="md" className="items-center">
													<Avatar size="md" className="bg-primary-500">
														<AvatarFallbackText className="text-typography-0 font-semibold">
															{instructor.name.charAt(0)}
														</AvatarFallbackText>
													</Avatar>
													<VStack className="flex-1">
														<Heading size="sm" className="text-typography-900">
															{instructor.name}
														</Heading>
														<HStack space="lg">
															<HStack space="xs" className="items-center">
																<BookOpen size={12} color="#6b7280" />
																<Text className="text-xs text-typography-600">{instructor.courses} courses</Text>
															</HStack>
															<Text className="text-xs text-typography-600">{instructor.students} students</Text>
														</HStack>
													</VStack>
												</HStack>
											</Card>
										))}
									</VStack>
								</VStack>
							</>
						)}

						{searchQuery !== "" && (
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Search Results
								</Heading>
								<VStack className="items-center py-12">
									<Search size={48} color="#d1d5db" />
									<Text className="text-center text-typography-600 mt-4 leading-6">
										Start typing to search for courses, instructors, and topics
									</Text>
								</VStack>
							</VStack>
						)}
					</VStack>
				</ScrollView>
			</VStack>
		</Box>
	);
}
