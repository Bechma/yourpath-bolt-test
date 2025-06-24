import { Tabs } from "expo-router";
import { BookOpen, House as Home, Map as MapIcon, Search, TrendingUp, User } from "lucide-react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
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
				name="progress"
				options={{
					title: "Progress",
					tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color} />,
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
