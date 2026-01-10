import { cors } from "hono/cors";
import { auth as betterAuth } from "@/lib/auth";
import { createRouter } from "@/utils/router";

const auth = createRouter();

// Better Auth
auth.use(
	"/*",
	cors({
		origin: "http://localhost:5173",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

auth.on(["POST", "GET"], "/**", (c) => {
	return betterAuth.handler(c.req.raw);
});

export default auth;
