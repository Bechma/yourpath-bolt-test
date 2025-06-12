import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Clock, TrendingUp, Award } from "lucide-react-native";
import { Image } from "expo-image";

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
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<View>
					<Text style={styles.greeting}>Welcome back,</Text>
					<Text style={styles.userName}>{user?.email?.split("@")[0] || "Learner"}!</Text>
				</View>
				<View style={styles.avatar}>
					<Text style={styles.avatarText}>{user?.email?.charAt(0).toUpperCase() || "L"}</Text>
				</View>
			</View>

			<View style={styles.statsContainer}>
				{stats.map((stat) => (
					<View key={stat.label} style={styles.statCard}>
						<stat.icon size={24} color="#6366f1" />
						<Text style={styles.statValue}>{stat.value}</Text>
						<Text style={styles.statLabel}>{stat.label}</Text>
					</View>
				))}
			</View>

			<View style={styles.section}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Continue Learning</Text>
					<Pressable>
						<Text style={styles.seeAll}>See all</Text>
					</Pressable>
				</View>

				{featuredCourses.map((course) => (
					<Pressable key={course.id} style={styles.courseCard}>
						<Image source={{ uri: course.image }} style={styles.courseImage} />
						<View style={styles.courseContent}>
							<Text style={styles.courseTitle}>{course.title}</Text>
							<Text style={styles.courseInstructor}>by {course.instructor}</Text>
							<View style={styles.courseFooter}>
								<View style={styles.progressContainer}>
									<View style={styles.progressBar}>
										<View style={[styles.progressFill, { width: `${course.progress}%` }]} />
									</View>
									<Text style={styles.progressText}>{course.progress}%</Text>
								</View>
								<Text style={styles.courseDuration}>{course.duration}</Text>
							</View>
						</View>
					</Pressable>
				))}
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Quick Actions</Text>
				<View style={styles.quickActions}>
					<Pressable style={styles.actionCard}>
						<BookOpen size={32} color="#6366f1" />
						<Text style={styles.actionTitle}>Browse Courses</Text>
						<Text style={styles.actionSubtitle}>Discover new topics</Text>
					</Pressable>
					<Pressable style={styles.actionCard}>
						<TrendingUp size={32} color="#10b981" />
						<Text style={styles.actionTitle}>View Progress</Text>
						<Text style={styles.actionSubtitle}>Track your learning</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
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
		paddingBottom: 24,
	},
	greeting: {
		fontSize: 16,
		color: "#6b7280",
	},
	userName: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1f2937",
		marginTop: 4,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#6366f1",
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		color: "#ffffff",
		fontSize: 18,
		fontWeight: "600",
	},
	statsContainer: {
		flexDirection: "row",
		paddingHorizontal: 24,
		marginBottom: 32,
		gap: 16,
	},
	statCard: {
		flex: 1,
		backgroundColor: "#f8fafc",
		padding: 20,
		borderRadius: 16,
		alignItems: "center",
	},
	statValue: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1f2937",
		marginTop: 8,
	},
	statLabel: {
		fontSize: 12,
		color: "#6b7280",
		marginTop: 4,
	},
	section: {
		paddingHorizontal: 24,
		marginBottom: 32,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1f2937",
	},
	seeAll: {
		fontSize: 14,
		color: "#6366f1",
		fontWeight: "500",
	},
	courseCard: {
		flexDirection: "row",
		backgroundColor: "#ffffff",
		borderRadius: 16,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
		overflow: "hidden",
	},
	courseImage: {
		width: 80,
		height: 80,
		borderRadius: 12,
		margin: 12,
	},
	courseContent: {
		flex: 1,
		padding: 12,
		justifyContent: "space-between",
	},
	courseTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1f2937",
		marginBottom: 4,
	},
	courseInstructor: {
		fontSize: 14,
		color: "#6b7280",
		marginBottom: 12,
	},
	courseFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressContainer: {
		flex: 1,
		marginRight: 16,
	},
	progressBar: {
		height: 4,
		backgroundColor: "#e5e7eb",
		borderRadius: 2,
		marginBottom: 4,
	},
	progressFill: {
		height: "100%",
		backgroundColor: "#6366f1",
		borderRadius: 2,
	},
	progressText: {
		fontSize: 12,
		color: "#6b7280",
	},
	courseDuration: {
		fontSize: 12,
		color: "#6b7280",
	},
	quickActions: {
		flexDirection: "row",
		gap: 16,
	},
	actionCard: {
		flex: 1,
		backgroundColor: "#f8fafc",
		padding: 20,
		borderRadius: 16,
		alignItems: "center",
	},
	actionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1f2937",
		marginTop: 12,
		textAlign: "center",
	},
	actionSubtitle: {
		fontSize: 12,
		color: "#6b7280",
		marginTop: 4,
		textAlign: "center",
	},
});
