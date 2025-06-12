import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Search, Filter, Clock, Star, Users } from "lucide-react-native";
import { Image } from "expo-image";

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
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Courses</Text>
				<Pressable style={styles.filterButton}>
					<Filter size={20} color="#6366f1" />
				</Pressable>
			</View>

			<View style={styles.searchContainer}>
				<Search size={20} color="#9ca3af" style={styles.searchIcon} />
				<TextInput
					style={styles.searchInput}
					placeholder="Search courses..."
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoriesContainer}
				contentContainerStyle={styles.categoriesContent}
			>
				{categories.map((category) => (
					<Pressable
						key={category}
						style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}
						onPress={() => setSelectedCategory(category)}
					>
						<Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>
							{category}
						</Text>
					</Pressable>
				))}
			</ScrollView>

			<ScrollView style={styles.coursesContainer} showsVerticalScrollIndicator={false}>
				<View style={styles.coursesGrid}>
					{filteredCourses.map((course) => (
						<Pressable key={course.id} style={styles.courseCard}>
							<Image source={{ uri: course.image }} style={styles.courseImage} />
							<View style={styles.courseContent}>
								<Text style={styles.courseTitle} numberOfLines={2}>
									{course.title}
								</Text>
								<Text style={styles.courseInstructor}>by {course.instructor}</Text>

								<View style={styles.courseStats}>
									<View style={styles.statItem}>
										<Star size={14} color="#fbbf24" />
										<Text style={styles.statText}>{course.rating}</Text>
									</View>
									<View style={styles.statItem}>
										<Users size={14} color="#6b7280" />
										<Text style={styles.statText}>{course.students}</Text>
									</View>
									<View style={styles.statItem}>
										<Clock size={14} color="#6b7280" />
										<Text style={styles.statText}>{course.duration}</Text>
									</View>
								</View>

								<View style={styles.courseFooter}>
									<Text style={styles.coursePrice}>{course.price}</Text>
									<Pressable style={styles.enrollButton}>
										<Text style={styles.enrollButtonText}>Enroll</Text>
									</Pressable>
								</View>
							</View>
						</Pressable>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 60,
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "700",
		color: "#1f2937",
	},
	filterButton: {
		padding: 8,
		borderRadius: 8,
		backgroundColor: "#f3f4f6",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f9fafb",
		borderRadius: 12,
		marginHorizontal: 24,
		marginBottom: 20,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	searchIcon: {
		marginRight: 12,
	},
	searchInput: {
		flex: 1,
		paddingVertical: 12,
		fontSize: 16,
		color: "#374151",
	},
	categoriesContainer: {
		marginBottom: 20,
	},
	categoriesContent: {
		paddingHorizontal: 24,
		gap: 12,
	},
	categoryChip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#f3f4f6",
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	categoryChipActive: {
		backgroundColor: "#6366f1",
		borderColor: "#6366f1",
	},
	categoryText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#6b7280",
	},
	categoryTextActive: {
		color: "#ffffff",
	},
	coursesContainer: {
		flex: 1,
	},
	coursesGrid: {
		paddingHorizontal: 24,
		paddingBottom: 100,
	},
	courseCard: {
		backgroundColor: "#ffffff",
		borderRadius: 16,
		marginBottom: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		overflow: "hidden",
	},
	courseImage: {
		width: "100%",
		height: 160,
	},
	courseContent: {
		padding: 16,
	},
	courseTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1f2937",
		marginBottom: 4,
		lineHeight: 24,
	},
	courseInstructor: {
		fontSize: 14,
		color: "#6b7280",
		marginBottom: 12,
	},
	courseStats: {
		flexDirection: "row",
		gap: 16,
		marginBottom: 16,
	},
	statItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	statText: {
		fontSize: 12,
		color: "#6b7280",
	},
	courseFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	coursePrice: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1f2937",
	},
	enrollButton: {
		backgroundColor: "#6366f1",
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderRadius: 8,
	},
	enrollButtonText: {
		color: "#ffffff",
		fontSize: 14,
		fontWeight: "600",
	},
});
