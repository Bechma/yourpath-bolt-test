import { Link, Stack } from "expo-router";
import { StyleSheet, Text, type TextProps, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

	return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

function ThemedText({ style, lightColor, darkColor, type = "default", ...rest }: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

	return (
		<Text
			style={[
				{ color },
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.themeLink : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<ThemedView style={styles.container}>
				<ThemedText type="title">This screen does not exist.</ThemedText>
				<Link href="/" style={styles.link}>
					<ThemedText type="link">Go to home screen!</ThemedText>
				</Link>
			</ThemedView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	themeLink: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
});
