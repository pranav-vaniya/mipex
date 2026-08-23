import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
	variable: "--default-font-family",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
	variable: "--monospace-font-family",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Mipex",
	description: "Mipex",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
			<body>{children}</body>
		</html>
	);
}
