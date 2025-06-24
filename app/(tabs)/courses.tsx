import { Image } from "expo-image";
import { Clock, ListFilter as Filter, Search, Star, Users } from "lucide-react-native";
import { useState } from "react";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function CoursesScreen() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	const categories = ["All", "Programming", "Design", "Business", "Marketing"];

	const courses = [
		{
			id: 1,
			title: "Complete React Native Course",
			instructor: "Sarah Johnson",
			rating: 4.8,
			students: 1234,
			duration: "12 hours",
			price: "$49",
			category: "Programming",
			image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 2,
			title: "UI/UX Design Fundamentals",
			instructor: "Mike Chen",
			rating: 4.9,
			students: 856,
			duration: "8 hours",
			price: "$39",
			category: "Design",
			image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 3,
			title: "Digital Marketing Strategy",
			instructor: "Emma Davis",
			rating: 4.7,
			students: 2341,
			duration: "10 hours",
			price: "$59",
			category: "Marketing",
			image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
		{
			id: 4,
			title: "JavaScript Advanced Concepts",
			instructor: "Alex Rodriguez",
			rating: 4.6,
			students: 987,
			duration: "15 hours",
			price: "$69",
			category: "Programming",
			image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400",
		},
	];

	const filteredCourses = courses.filter((course) => {
		const matchesSearch =
			course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<Box className="flex-1 bg-background-0">
			<VStack space="lg" className="flex-1">
				{/* Header */}
				<Box className="px-6 pt-16 pb-6">
					<HStack className="justify-between items-center">
						<Heading size="2xl" className="text-typography-900">
							Courses
						</Heading>
						<Button variant="outline" size="sm">
							<ButtonIcon as={Filter} />
						</Button>
					</HStack>
				</Box>

				{/* Search */}
				<Box className="px-6">
					<Input variant="outline" size="md">
						<InputSlot className="pl-3">
							<InputIcon as={Search} className="text-typography-400" />
						</InputSlot>
						<InputField placeholder="Search courses..." value={searchQuery} onChangeText={setSearchQuery} />
					</Input>
				</Box>

				{/* Categories */}
				<ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6">
					<HStack space="sm">
						{categories.map((category) => (
							<Button
								key={category}
								variant={selectedCategory === category ? "solid" : "outline"}
								size="sm"
								onPress={() => setSelectedCategory(category)}
							>
								<ButtonText>{category}</ButtonText>
							</Button>
						))}
					</HStack>
				</ScrollView>

				{/* Courses */}
				<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
					<VStack space="lg" className="px-6 pb-24">
						{filteredCourses.map((course) => (
							<Card key={course.id} className="p-0 overflow-hidden shadow-soft-2">
								<Image source={{ uri: course.image }} style={{ width: "100%", height: 160 }} contentFit="cover" />
								<VStack space="md" className="p-4">
									<VStack space="xs">
										<Heading size="md" className="text-typography-900 leading-6">
											{course.title}
										</Heading>
										<Text className="text-sm text-typography-600">by {course.instructor}</Text>
									</VStack>

									<HStack space="lg">
										<HStack space="xs" className="items-center">
											<Star size={14} color="#fbbf24" />
											<Text className="text-xs text-typography-600">{course.rating}</Text>
										</HStack>
										<HStack space="xs" className="items-center">
											<Users size={14} color="#6b7280" />
											<Text className="text-xs text-typography-600">{course.students}</Text>
										</HStack>
										<HStack space="xs" className="items-center">
											<Clock size={14} color="#6b7280" />
											<Text className="text-xs text-typography-600">{course.duration}</Text>
										</HStack>
									</HStack>

									<HStack className="justify-between items-center">
										<Heading size="lg" className="text-typography-900">
											{course.price}
										</Heading>
										<Button size="sm">
											<ButtonText>Enroll</ButtonText>
										</Button>
									</HStack>
								</VStack>
							</Card>
						))}
					</VStack>
				</ScrollView>
			</VStack>
		</Box>
	);
}
