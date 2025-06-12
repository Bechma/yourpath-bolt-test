import { Tabs } from "expo-router";
import { BookOpen, House as Home, Map as MapIcon, Search, User } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#6366f1",
				tabBarInactiveTintColor: "#9ca3af",
				tabBarStyle: {
					backgroundColor: "#ffffff",
					borderTopWidth: 1,
					borderTopColor: "#e5e7eb",
					paddingBottom: Platform.OS === "ios" ? 20 : 10,
					paddingTop: 10,
					height: Platform.OS === "ios" ? 90 : 70,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "500",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="paths"
				options={{
					title: "Paths",
					tabBarIcon: ({ color, size }) => <MapIcon size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="courses"
				options={{
					title: "Courses",
					tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
				}}
			/>
		</Tabs>
	);
}
