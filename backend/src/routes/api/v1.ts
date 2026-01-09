import { Hono } from "hono";
import devices from "@/routes/api/devices";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { auth } from "@/utils/auth";

const v1 = new Hono();

v1.use(prettyJSON());
v1.use("*", cors());

v1.get("/", (c) => c.html("Why are you here??. You shouldn't be here..."));

v1.get("/health", (c) => c.body("ok"));

v1.route("/devices", devices);

v1.on(["POST", "GET"], "/auth/**", (c) => {
	return auth.handler(c.req.raw);
});

export default v1;
