import { IS_PRODUCTION } from "@root/src/env";
import type { BetterAuthPlugin } from "better-auth";
import { jwt, openAPI } from "better-auth/plugins";

const plugins: BetterAuthPlugin[] = [jwt()];

if (!IS_PRODUCTION) {
	plugins.push(openAPI());
}

export default plugins;
