import { Scalar } from "@scalar/hono-api-reference";
import env from "@/env";
import type { AppOpenAPI } from "@/lib/types";

export function configureOpenAPI(app: AppOpenAPI) {
	app.doc("/api/v1/doc", {
		openapi: "3.0.0",
		info: {
			version: env.VERSION,
			title: `${env.APP_NAME} API`,
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
			sources: [
				{ url: "/api/v1/doc", title: "API", default: true },
				{ url: "/api/v1/auth/open-api/generate-schema", title: "Auth" },
			],
		}),
	);
}
