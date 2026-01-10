import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Schema } from "hono";
import type { PinoLogger } from "hono-pino";
import type { AuthType } from "@/lib/auth";

export interface AppBindings {
	Variables: {
		logger: PinoLogger;
		auth: AuthType;
	};
}

export type AppOpenAPI<S extends Schema = Record<string, never>> = OpenAPIHono<
	AppBindings,
	S
>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	AppBindings
>;
