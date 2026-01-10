import { Scalar } from "@scalar/hono-api-reference";
import { APP_NAME, VERSION } from "@/env";
import type { AppOpenAPI } from "@/lib/types";

export function configureOpenAPI(app: AppOpenAPI) {
	app.doc("/api/v1/doc", {
		openapi: "3.0.0",
		info: {
			version: VERSION,
			title: `${APP_NAME} API`,
		},
	});

	app.get(
		"/api/docs",
		Scalar({
			url: "/api/v1/doc",
			theme: "deepSpace",
			layout: "modern",
			pageTitle: "API Documentation",
			defaultHttpClient: {
				targetKey: "js",
				clientKey: "fetch",
			},
		}),
	);
}
