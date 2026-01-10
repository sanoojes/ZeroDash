import type { BetterAuthPlugin } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";
import { IS_PRODUCTION } from "@/env";

const plugins: BetterAuthPlugin[] = [jwt()];

if (!IS_PRODUCTION) {
	plugins.push(
		openAPI({
			disableDefaultReference: true,
		}),
	);
}

export default plugins;
