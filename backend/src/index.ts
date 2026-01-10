import "dotenv/config";

import { serveStatic } from "hono/bun";
import createApp from "@/app";
import { ENV, PORT } from "@/env";
import { configureOpenAPI } from "@/lib/openapi";
import v1_router from "@/routes/api/v1.route";

console.log("Environment:", ENV);

const app = createApp();

// Setup OpenAPI stuff
configureOpenAPI(app);

app.use(
	"/*",
	serveStatic({ root: "../dist", rewriteRequestPath: (path) => path }),
);

app.get("/", serveStatic({ path: "../dist/index.html" }));

// every api stuff SHOULD GO THERE
// idk, design choice ig
app.route("/api/v1", v1_router);

export default {
	port: PORT,
	fetch: app.fetch,
};
