import type { BetterAuthPlugin } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import env from "@/env";

const plugins: BetterAuthPlugin[] = [jwt()];

if (env.NODE_ENV !== "production") {
	plugins.push(
		openAPI({
			disableDefaultReference: true,
		}),
	);
}

export default plugins;
