// TODO: multiple device connection with socket.io

import { createRoute } from "@hono/zod-openapi";
import { APP_NAME } from "@/env";
import { StatusCodes } from "@/lib/http";
import { jsonContent } from "@/lib/openapi/helpers";
import { createMessageObjectSchema } from "@/lib/openapi/schemas";
import { createRouter } from "@/utils/router";

const device = createRouter();

// GET '/'
const indexMessage = `Why are you here?? You shouldn't be here... But hey, welcome to ${APP_NAME} API!`;
device.openapi(
	createRoute({
		tags: ["device"],
		method: "get",
		path: "/",
		responses: {
			[StatusCodes.OK]: jsonContent(
				createMessageObjectSchema(indexMessage),
				`${APP_NAME} API Index`,
			),
		},
	}),
	(c) => {
		return c.json(
			{
				message: indexMessage,
			},
			StatusCodes.OK,
		);
	},
);

export default device;
