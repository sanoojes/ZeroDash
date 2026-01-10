import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";
import { protect } from "@/middleware/auth";

const realtime = new Hono();

realtime.get(
	"/",
	protect,
	upgradeWebSocket((c) => {
		const session = c.get("session");

		return {
			onOpen(_, ws) {
				ws.send(`connected as ${session.user.email}`);
			},

			onMessage(evt, ws) {
				ws.send(`echo: ${evt.data}`);
			},

			onClose() {},
		};
	}),
);

export default realtime;
