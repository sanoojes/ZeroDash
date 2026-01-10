import { requestId } from "hono/request-id";
import { trimTrailingSlash } from "hono/trailing-slash";
import { pinoLogger } from "@/middleware/logger";
import notFound from "@/middleware/notFound";
import onError from "@/middleware/onError";
import { createRouter } from "@/utils/router";

export default function createApp() {
	const app = createRouter();

	app.use(requestId()).use(trimTrailingSlash()).use(pinoLogger());

	app.notFound(notFound);
	app.onError(onError);
	return app;
}
