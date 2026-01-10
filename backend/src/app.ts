import { requestId } from "hono/request-id";
import { trimTrailingSlash } from "hono/trailing-slash";
import notFound from "@/middleware/notFound";
import onError from "@/middleware/onError";
import { createRouter } from "@/utils/router";

export function createApp() {
	const app = createRouter();

	app.use(requestId()).use(trimTrailingSlash());

	app.notFound(notFound);
	app.onError(onError);
	return app;
}
