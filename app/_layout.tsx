import { useEffect } from "react";
import "@/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";

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
		<GluestackUIProvider mode="dark">
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
		</GluestackUIProvider>
	);
}
