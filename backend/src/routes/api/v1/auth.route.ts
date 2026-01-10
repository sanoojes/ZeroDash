import { auth as betterAuth } from "@/lib/auth";
import { createRouter } from "@/utils/router";

const auth = createRouter();

// Better Auth
auth.on(["POST", "GET"], "/**", (c) => {
	return betterAuth.handler(c.req.raw);
});

export default auth;
