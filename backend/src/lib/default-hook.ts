import type { Hook } from "@hono/zod-openapi";
import type { Env } from "hono";
import { StatusCodes } from "@/lib/http";

const defaultHook: Hook<unknown, Env, string, unknown> = (result, c) => {
	if (!result.success) {
		return c.json(
			{
				success: result.success,
				error: {
					name: result.error.name,
					issues: result.error.issues,
				},
			},
			StatusCodes.UNPROCESSABLE_ENTITY,
		);
	}
};

export default defaultHook;
