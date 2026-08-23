import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	devIndicators: false,
	output: "export",
	basePath: process.env.GITHUB_PAGES === "true" ? "/mipex" : "",
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
