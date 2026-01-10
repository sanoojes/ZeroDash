import { OpenAPIHono } from "@hono/zod-openapi";
import defaultHook from "@/lib/defaultHook";
import type { AppBindings } from "@/lib/types";

export function createRouter() {
	return new OpenAPIHono<AppBindings>({
		strict: true,
		defaultHook,
	});
}
