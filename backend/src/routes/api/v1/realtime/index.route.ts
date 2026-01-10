import { Hono } from "hono";
import { engine } from "@/io";

const realtime = new Hono();

realtime.all("/", (c) => {
	const request = c.req.raw;
	const server = c.env;
	return engine.handleRequest(request, server as any);
});

export default realtime;
