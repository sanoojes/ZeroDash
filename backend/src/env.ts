import { z } from "zod";
import pkg from "@root/package.json";

const EnvSchema = z.object({
	PORT: z.string().default("3000"),
	APP_URL: z.url(),
	AUTH_SECRET: z.string().min(1),
	DATABASE_URL: z.string().min(1),

	GITHUB_CLIENT_ID: z.string().min(1),
	GITHUB_CLIENT_SECRET: z.string().min(1),
	DISCORD_CLIENT_ID: z.string().min(1),
	DISCORD_CLIENT_SECRET: z.string().min(1),

	NODE_ENV: z
		.enum(["production", "development", "test"])
		.default("development"),

	LOG_LEVEL: z.enum([
		"fatal",
		"error",
		"warn",
		"info",
		"debug",
		"trace",
		"silent",
	]),
});

const { success, error, data } = EnvSchema.safeParse(process.env);
if (!success) {
	console.error("Invalid env:\n", z.prettifyError(error));
	process.exit(1);
}

export type env = z.infer<typeof EnvSchema> & {
	APP_NAME: string;
	VERSION: string;
};

export const env: env = {
	APP_NAME: "ZeroDash Backend",
	VERSION: pkg.version ?? "0.1.0",
	...data,
};

export default env;
