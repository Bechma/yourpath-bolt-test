import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { User, Settings, BookOpen, Award, Bell, HelpCircle, LogOut, ChevronRight, Edit } from "lucide-react-native";

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
					router.replace("/");
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
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Profile</Text>
			</View>

			<View style={styles.profileSection}>
				<View style={styles.avatarContainer}>
					<View style={styles.avatar}>
						<Text style={styles.avatarText}>{user?.email?.charAt(0).toUpperCase() || "U"}</Text>
					</View>
					<Pressable style={styles.editAvatarButton}>
						<Edit size={16} color="#6366f1" />
					</Pressable>
				</View>

				<Text style={styles.userName}>{user?.email?.split("@")[0] || "User"}</Text>
				<Text style={styles.userEmail}>{user?.email}</Text>

				<View style={styles.statsContainer}>
					{profileStats.map((stat) => (
						<View key={stat.label} style={styles.statItem}>
							<stat.icon size={20} color="#6366f1" />
							<Text style={styles.statValue}>{stat.value}</Text>
							<Text style={styles.statLabel}>{stat.label}</Text>
						</View>
					))}
				</View>
			</View>

			<View style={styles.menuSection}>
				{menuItems.map((item) => (
					<Pressable key={item.title} style={styles.menuItem} onPress={item.onPress}>
						<View style={styles.menuItemLeft}>
							<View style={styles.menuIconContainer}>
								<item.icon size={20} color="#6366f1" />
							</View>
							<Text style={styles.menuItemText}>{item.title}</Text>
						</View>
						<ChevronRight size={20} color="#9ca3af" />
					</Pressable>
				))}
			</View>

			<View style={styles.signOutSection}>
				<Pressable style={styles.signOutButton} onPress={handleSignOut}>
					<LogOut size={20} color="#ef4444" />
					<Text style={styles.signOutText}>Sign Out</Text>
				</Pressable>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>YourPath Learning Platform</Text>
				<Text style={styles.versionText}>Version 1.0.0</Text>
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
		paddingHorizontal: 24,
		paddingTop: 60,
		paddingBottom: 20,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: "700",
		color: "#1f2937",
	},
	profileSection: {
		alignItems: "center",
		paddingHorizontal: 24,
		paddingBottom: 32,
	},
	avatarContainer: {
		position: "relative",
		marginBottom: 16,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#6366f1",
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		color: "#ffffff",
		fontSize: 32,
		fontWeight: "600",
	},
	editAvatarButton: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#e5e7eb",
	},
	userName: {
		fontSize: 24,
		fontWeight: "700",
		color: "#1f2937",
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 24,
	},
	statsContainer: {
		flexDirection: "row",
		gap: 24,
	},
	statItem: {
		alignItems: "center",
		flex: 1,
	},
	statValue: {
		fontSize: 20,
		fontWeight: "700",
		color: "#1f2937",
		marginTop: 8,
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 12,
		color: "#6b7280",
		textAlign: "center",
	},
	menuSection: {
		paddingHorizontal: 24,
		marginBottom: 32,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f3f4f6",
	},
	menuItemLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#f3f4f6",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 16,
	},
	menuItemText: {
		fontSize: 16,
		fontWeight: "500",
		color: "#1f2937",
	},
	signOutSection: {
		paddingHorizontal: 24,
		marginBottom: 32,
	},
	signOutButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fef2f2",
		paddingVertical: 16,
		borderRadius: 12,
		gap: 8,
	},
	signOutText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#ef4444",
	},
	footer: {
		alignItems: "center",
		paddingHorizontal: 24,
		paddingBottom: 100,
	},
	footerText: {
		fontSize: 14,
		color: "#6b7280",
		marginBottom: 4,
	},
	versionText: {
		fontSize: 12,
		color: "#9ca3af",
	},
});
