import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import db from "@/db";
import env, { IS_PRODUCTION } from "@/env";
import { authSchema } from "@/db/schema/auth";

const plugins = [];

if (!IS_PRODUCTION) {
	plugins.push(openAPI());
}

export const auth = betterAuth({
	plugins,
	basePath: "/api/v1/auth",

	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
	}),

	trustedOrigins: ["http://localhost:5173"],
	emailAndPassword: {
		enabled: true,
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
});

export type AuthType = {
	user: typeof auth.$Infer.Session.user | null;
	session: typeof auth.$Infer.Session.session | null;
};
