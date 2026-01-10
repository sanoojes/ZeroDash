import "dotenv/config";

import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { createApp } from "@/app";
import { initDB } from "@/db";
import env from "@/env";
import { engine } from "@/io";
import { configureOpenAPI } from "@/lib/openapi";
import APIRouter from "@/routes/api/index.route";
import { pinoLogger } from "@/middleware/logger";

console.info(`Environment: ${env.NODE_ENV}`);

// initDB();

const app = createApp();

// Setup OpenAPI stuff
// Adds GET "/api/v1/doc" (spec) and GET '/api/docs'
configureOpenAPI(app);

app.use("/api/*", pinoLogger());

app.use(
	"/*",
	cors({
		origin: ["http://localhost:5173"],
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use(
	"/*",
	serveStatic({ root: "../dist", rewriteRequestPath: (path) => path }),
);

app.get("/", serveStatic({ path: "../dist/index.html" }));

// every api stuff SHOULD GO THERE
// idk, design choice ig
app.route("/api", APIRouter);

export default {
	port: env.PORT,
	...engine.handler(), // socket.io handler
	fetch: app.fetch,
};
