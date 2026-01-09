import { requireEnv } from "@/utils/env";

export const PORT = process.env.PORT ?? "3000";

export const BETTER_AUTH_URL = requireEnv("BETTER_AUTH_URL");
export const BETTER_AUTH_SECRET = requireEnv("BETTER_AUTH_SECRET");

export const DATABASE_URL = requireEnv("DATABASE_URL");

export const GITHUB_CLIENT_ID = requireEnv("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = requireEnv("GITHUB_CLIENT_SECRET");
export const DISCORD_CLIENT_ID = requireEnv("DISCORD_CLIENT_ID");
export const DISCORD_CLIENT_SECRET = requireEnv("DISCORD_CLIENT_SECRET");

export const ENV = process.env.NODE_ENV ?? "dev";
export const IS_PRODUCTION = ENV === "production";

export default {
	PORT,

	IS_PRODUCTION,

	DATABASE_URL,

	// Auth stuff
	BETTER_AUTH_URL,
	BETTER_AUTH_SECRET,

	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
};
