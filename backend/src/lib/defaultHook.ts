import type { Hook } from "@hono/zod-openapi";
import { StatusCodes } from "@/lib/http";
import type { AppBindings } from "@/lib/types";

const defaultHook: Hook<unknown, AppBindings, string, unknown> = (
	result,
	c,
) => {
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
