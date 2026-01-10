import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "@/db";
import { authSchema } from "@/db/schema";
import env from "@/env";
import { USER_ROLES } from "@/lib/auth/constants";
import plugins from "@/lib/auth/plugins";

export const auth = betterAuth({
	plugins,
	baseURL: env.APP_URL,
	basePath: "/api/v1/auth",
	secret: env.AUTH_SECRET,
	appName: env.APP_NAME,

	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { ...authSchema },
	}),

	user: {
		modelName: "users",
		additionalFields: {
			role: {
				type: USER_ROLES,
				defaultValue: "user",
				required: false,
				input: false,
			},
		},
	},

	trustedOrigins: ["http://localhost:5173", env.APP_URL],
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 256,
	},
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
		},
	},

	telemetry: {
		enabled: false,
	},
});

export type AuthType = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
};
