import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/contexts/AuthContext";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const isReady = useFrameworkReady();

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="auth/login" />
				<Stack.Screen name="auth/signup" />
				<Stack.Screen name="auth/forgot-password" />
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="auto" />
		</AuthProvider>
	);
}
