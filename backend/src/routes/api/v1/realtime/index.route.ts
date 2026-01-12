import { Hono } from "hono";
import { engine } from "@/io";

const realtime = new Hono();

realtime.all("/*", (c) => {
	const request = c.req.raw;
	const server = c.env;
	console.log(server);
	// biome-ignore lint/suspicious/noExplicitAny: http://github.com/socketio/bun-engine/tree/main#with-hono
	return engine.handleRequest(request, server as any);
});

export default realtime;
