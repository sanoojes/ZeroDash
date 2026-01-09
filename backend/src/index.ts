import "dotenv/config";

import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { trimTrailingSlash } from "hono/trailing-slash";

import v1 from "@/routes/api/v1";
import { ENV, PORT } from "@/env";
import { createLogger } from "@/utils/logger";

console.log("Environment:", ENV);

const app = new Hono({
	strict: true,
});

app.use(trimTrailingSlash());

app.use(createLogger());

app.use(
	"/*",
	serveStatic({ root: "../dist", rewriteRequestPath: (path) => path }),
);

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.get("/", serveStatic({ path: "../dist/index.html" }));

// every api stuff SHOULD GO THERE
// idk, design choice ig
app.route("/api/v1", v1);

export default {
	port: PORT,
	fetch: app.fetch,
};
