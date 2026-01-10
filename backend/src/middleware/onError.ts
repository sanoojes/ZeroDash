import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { IS_PRODUCTION } from "@/env";
import { StatusCodes } from "@/lib/http";

const onError: ErrorHandler = (err, c) => {
	const currentStatus =
		"status" in err ? err.status : c.newResponse(null).status;
	const statusCode =
		currentStatus !== StatusCodes.OK
			? (currentStatus as ContentfulStatusCode)
			: StatusCodes.INTERNAL_SERVER_ERROR;

	return c.json(
		{
			message: err.message,

			stack: IS_PRODUCTION ? undefined : err.stack,
		},
		statusCode,
	);
};

export default onError;
