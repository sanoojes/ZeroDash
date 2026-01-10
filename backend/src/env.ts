import {
	version,
	//	name
} from "@root/package.json";
import { requireEnv } from "@/utils/env";

export const VERSION = version ?? "0.1.0";
// export const APP_NAME = name;
export const APP_NAME = "ZeroDash Backend";

export const PORT = process.env.PORT ?? "3000";
export const APP_URL = requireEnv("APP_URL");

export const AUTH_SECRET = requireEnv("AUTH_SECRET");

export const DATABASE_URL = requireEnv("DATABASE_URL");

export const GITHUB_CLIENT_ID = requireEnv("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = requireEnv("GITHUB_CLIENT_SECRET");
export const DISCORD_CLIENT_ID = requireEnv("DISCORD_CLIENT_ID");
export const DISCORD_CLIENT_SECRET = requireEnv("DISCORD_CLIENT_SECRET");

export const ENV = process.env.NODE_ENV ?? "dev";
export const IS_PRODUCTION = ENV === "production";
export const LOG_LEVEL = IS_PRODUCTION ? "info" : "debug";

export default {
	APP_NAME,
	VERSION,
	PORT,
	APP_URL,

	LOG_LEVEL,
	IS_PRODUCTION,

	DATABASE_URL,

	// Auth stuff
	AUTH_SECRET,

	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
};
