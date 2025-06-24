import { router } from "expo-router";
import {
	ArrowLeft,
	Award,
	ChartBar as BarChart3,
	BookOpen,
	Clock,
	ListFilter as Filter,
	Flame,
	Target,
	TrendingUp,
	Trophy,
} from "lucide-react-native";
import { useState } from "react";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function ProgressScreen() {
	const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [_loading, _setLoading] = useState(false);

	const timeRanges = ["This Week", "This Month", "Last 3 Months", "This Year"];
	const categories = ["All", "Programming", "Design", "Business", "Data Science"];

	// Mock progress data
	const overallStats = {
		totalWorkouts: 42,
		hoursCompleted: 156,
		coursesFinished: 8,
		currentStreak: 12,
		weeklyGoal: 10,
		weeklyProgress: 7,
	};

	const weeklyData = [
		{ day: "Mon", hours: 2.5, completed: true },
		{ day: "Tue", hours: 1.8, completed: true },
		{ day: "Wed", hours: 3.2, completed: true },
		{ day: "Thu", hours: 0, completed: false },
		{ day: "Fri", hours: 2.1, completed: true },
		{ day: "Sat", hours: 1.5, completed: true },
		{ day: "Sun", hours: 2.8, completed: true },
	];

	const personalBests = [
		{ title: "Longest Study Session", value: "4.5 hours", date: "Dec 15, 2024" },
		{ title: "Most Courses in a Week", value: "3 courses", date: "Dec 10, 2024" },
		{ title: "Current Learning Streak", value: "12 days", date: "Ongoing" },
		{ title: "Fastest Course Completion", value: "2 days", date: "Dec 8, 2024" },
	];

	const recentAchievements = [
		{ title: "Week Warrior", description: "Completed 7 days of learning", icon: Trophy, color: "#fbbf24" },
		{ title: "Course Crusher", description: "Finished 5 courses this month", icon: Award, color: "#10b981" },
		{ title: "Time Master", description: "Studied for 20+ hours", icon: Clock, color: "#6366f1" },
		{ title: "Streak Keeper", description: "10-day learning streak", icon: Flame, color: "#ef4444" },
	];

	const categoryProgress = [
		{ name: "Programming", completed: 12, total: 15, progress: 80 },
		{ name: "Design", completed: 8, total: 10, progress: 80 },
		{ name: "Business", completed: 5, total: 8, progress: 62 },
		{ name: "Data Science", completed: 3, total: 6, progress: 50 },
	];

	const monthlyProgress = [
		{ month: "Sep", hours: 32, courses: 2 },
		{ month: "Oct", hours: 45, courses: 3 },
		{ month: "Nov", hours: 38, courses: 2 },
		{ month: "Dec", hours: 41, courses: 1 },
	];

	return (
		<Box className="flex-1 bg-background-0">
			<VStack space="lg" className="flex-1">
				{/* Header */}
				<Box className="px-6 pt-16 pb-6">
					<HStack className="justify-between items-center">
						<HStack space="md" className="items-center">
							<Button variant="link" size="sm" onPress={() => router.back()}>
								<ButtonIcon as={ArrowLeft} className="text-typography-700" />
							</Button>
							<Heading size="2xl" className="text-typography-900">
								Your Progress
							</Heading>
						</HStack>
						<Button variant="outline" size="sm">
							<ButtonIcon as={Filter} />
						</Button>
					</HStack>
				</Box>

				{/* Filter Controls */}
				<VStack space="md" className="px-6">
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						<HStack space="sm">
							{timeRanges.map((range) => (
								<Button
									key={range}
									variant={selectedTimeRange === range ? "solid" : "outline"}
									size="sm"
									onPress={() => setSelectedTimeRange(range)}
								>
									<ButtonText>{range}</ButtonText>
								</Button>
							))}
						</HStack>
					</ScrollView>

					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
				</VStack>

				<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
					<VStack space="lg" className="px-6 pb-24">
						{/* Overall Stats */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Overall Statistics
								</Heading>
								<VStack space="sm">
									<HStack space="md">
										<Card className="flex-1 p-4 bg-primary-50 border-0">
											<VStack className="items-center">
												<BookOpen size={24} color="#6366f1" />
												<Heading size="xl" className="text-typography-900 mt-2">
													{overallStats.totalWorkouts}
												</Heading>
												<Text className="text-xs text-typography-600 text-center">Total Sessions</Text>
											</VStack>
										</Card>
										<Card className="flex-1 p-4 bg-success-50 border-0">
											<VStack className="items-center">
												<Clock size={24} color="#10b981" />
												<Heading size="xl" className="text-typography-900 mt-2">
													{overallStats.hoursCompleted}
												</Heading>
												<Text className="text-xs text-typography-600 text-center">Hours Learned</Text>
											</VStack>
										</Card>
									</HStack>
									<HStack space="md">
										<Card className="flex-1 p-4 bg-warning-50 border-0">
											<VStack className="items-center">
												<Award size={24} color="#f59e0b" />
												<Heading size="xl" className="text-typography-900 mt-2">
													{overallStats.coursesFinished}
												</Heading>
												<Text className="text-xs text-typography-600 text-center">Courses Done</Text>
											</VStack>
										</Card>
										<Card className="flex-1 p-4 bg-error-50 border-0">
											<VStack className="items-center">
												<Flame size={24} color="#ef4444" />
												<Heading size="xl" className="text-typography-900 mt-2">
													{overallStats.currentStreak}
												</Heading>
												<Text className="text-xs text-typography-600 text-center">Day Streak</Text>
											</VStack>
										</Card>
									</HStack>
								</VStack>
							</VStack>
						</Card>

						{/* Weekly Goal Progress */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<HStack className="justify-between items-center">
									<Heading size="lg" className="text-typography-900">
										Weekly Goal
									</Heading>
									<Badge action="info" variant="solid">
										<BadgeText>
											{overallStats.weeklyProgress}/{overallStats.weeklyGoal} sessions
										</BadgeText>
									</Badge>
								</HStack>
								<VStack space="sm">
									<Progress value={(overallStats.weeklyProgress / overallStats.weeklyGoal) * 100} size="md">
										<ProgressFilledTrack />
									</Progress>
									<Text className="text-sm text-typography-600">
										{overallStats.weeklyGoal - overallStats.weeklyProgress} more sessions to reach your weekly goal
									</Text>
								</VStack>
							</VStack>
						</Card>

						{/* Weekly Activity Chart */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									This Week's Activity
								</Heading>
								<HStack space="sm" className="justify-between">
									{weeklyData.map((day) => (
										<VStack key={day.day} className="items-center flex-1">
											<Box
												className={`w-8 h-16 rounded-lg ${
													day.completed ? "bg-primary-500" : "bg-background-200"
												} mb-2 justify-end items-center pb-1`}
												style={{
													height: Math.max(16, (day.hours / 4) * 64),
												}}
											>
												{day.hours > 0 && <Text className="text-xs text-typography-0 font-semibold">{day.hours}h</Text>}
											</Box>
											<Text className="text-xs text-typography-600">{day.day}</Text>
										</VStack>
									))}
								</HStack>
							</VStack>
						</Card>

						{/* Personal Bests */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Personal Bests
								</Heading>
								<VStack space="sm">
									{personalBests.map((best, index) => (
										<HStack key={index} className="justify-between items-center p-3 bg-background-50 rounded-lg">
											<VStack className="flex-1">
												<Text className="text-sm font-semibold text-typography-900">{best.title}</Text>
												<Text className="text-xs text-typography-500">{best.date}</Text>
											</VStack>
											<Badge action="success" variant="solid">
												<BadgeText>{best.value}</BadgeText>
											</Badge>
										</HStack>
									))}
								</VStack>
							</VStack>
						</Card>

						{/* Recent Achievements */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Recent Achievements
								</Heading>
								<VStack space="sm">
									{recentAchievements.map((achievement, index) => (
										<HStack key={index} space="md" className="items-center p-3 bg-background-50 rounded-lg">
											<Box
												className="w-10 h-10 rounded-full items-center justify-center"
												style={{ backgroundColor: `${achievement.color}20` }}
											>
												<achievement.icon size={20} color={achievement.color} />
											</Box>
											<VStack className="flex-1">
												<Text className="text-sm font-semibold text-typography-900">{achievement.title}</Text>
												<Text className="text-xs text-typography-600">{achievement.description}</Text>
											</VStack>
										</HStack>
									))}
								</VStack>
							</VStack>
						</Card>

						{/* Category Progress */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Progress by Category
								</Heading>
								<VStack space="sm">
									{categoryProgress.map((category) => (
										<VStack key={category.name} space="xs">
											<HStack className="justify-between items-center">
												<Text className="text-sm font-semibold text-typography-900">{category.name}</Text>
												<Text className="text-xs text-typography-600">
													{category.completed}/{category.total} courses
												</Text>
											</HStack>
											<Progress value={category.progress} size="sm">
												<ProgressFilledTrack />
											</Progress>
										</VStack>
									))}
								</VStack>
							</VStack>
						</Card>

						{/* Monthly Trends */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Monthly Trends
								</Heading>
								<VStack space="sm">
									{monthlyProgress.map((month) => (
										<HStack key={month.month} className="justify-between items-center p-3 bg-background-50 rounded-lg">
											<Text className="text-sm font-semibold text-typography-900">{month.month}</Text>
											<HStack space="lg">
												<VStack className="items-center">
													<Text className="text-xs text-typography-500">Hours</Text>
													<Text className="text-sm font-semibold text-typography-900">{month.hours}</Text>
												</VStack>
												<VStack className="items-center">
													<Text className="text-xs text-typography-500">Courses</Text>
													<Text className="text-sm font-semibold text-typography-900">{month.courses}</Text>
												</VStack>
											</HStack>
										</HStack>
									))}
								</VStack>
							</VStack>
						</Card>

						{/* Learning Insights */}
						<Card className="p-5 shadow-soft-2">
							<VStack space="md">
								<Heading size="lg" className="text-typography-900">
									Learning Insights
								</Heading>
								<VStack space="sm">
									<HStack space="md" className="items-center p-3 bg-info-50 rounded-lg">
										<TrendingUp size={20} color="#0ea5e9" />
										<VStack className="flex-1">
											<Text className="text-sm font-semibold text-typography-900">Peak Learning Time</Text>
											<Text className="text-xs text-typography-600">You're most productive between 2-4 PM</Text>
										</VStack>
									</HStack>
									<HStack space="md" className="items-center p-3 bg-success-50 rounded-lg">
										<Target size={20} color="#10b981" />
										<VStack className="flex-1">
											<Text className="text-sm font-semibold text-typography-900">Consistency Score</Text>
											<Text className="text-xs text-typography-600">
												85% - You're doing great at maintaining regular study habits
											</Text>
										</VStack>
									</HStack>
									<HStack space="md" className="items-center p-3 bg-warning-50 rounded-lg">
										<BarChart3 size={20} color="#f59e0b" />
										<VStack className="flex-1">
											<Text className="text-sm font-semibold text-typography-900">Improvement Area</Text>
											<Text className="text-xs text-typography-600">
												Consider adding more Data Science courses to your routine
											</Text>
										</VStack>
									</HStack>
								</VStack>
							</VStack>
						</Card>
					</VStack>
				</ScrollView>
			</VStack>
		</Box>
	);
}
