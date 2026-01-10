import "dotenv/config";

import { serveStatic } from "hono/bun";
import createApp from "@/app";
import { ENV, PORT } from "@/env";
import { configureOpenAPI } from "@/lib/openapi";
import APIRouter from "@/routes/api/api.route";

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
app.route("/api", APIRouter);

export default {
	port: PORT,
	fetch: app.fetch,
};
