import { createRoute } from "@hono/zod-openapi";
import { APP_NAME } from "@/env";
import { StatusCodes } from "@/lib/http";
import { jsonContent } from "@/lib/openapi/helpers";
import { createMessageObjectSchema } from "@/lib/openapi/schemas";
import authRouter from "@/routes/api/v1/auth.route";
import deviceRouter from "@/routes/api/v1/device.route";
import liveRouter from "@/routes/api/v1/live.route";
import { createRouter } from "@/utils/router";

// Starts at "/api/v1"
const v1 = createRouter();

// TODO: Setup devices interconnection
// Devices
v1.route("/device", deviceRouter);

// Live
v1.route("/live", liveRouter);

// Better Auth
v1.route("/auth", authRouter);

// Redirect /api/v1/docs => api/docs
v1.get("/docs", (c) => c.redirect("/api/docs"));

// GET '/'
const indexMessage = `Why are you here?? You shouldn't be here... But hey, welcome to ${APP_NAME} API!`;
v1.openapi(
	createRoute({
		tags: ["index"],
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

// GET "/health"
v1.openapi(
	createRoute({
		tags: ["health"],
		method: "get",
		path: "/health",
		responses: {
			[StatusCodes.OK]: jsonContent(
				createMessageObjectSchema("ok"),
				"Health Check",
			),
		},
	}),
	(c) => c.json({ message: "ok" }, StatusCodes.OK),
);

export default v1;
