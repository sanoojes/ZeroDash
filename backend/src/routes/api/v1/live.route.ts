import { protect } from "@root/src/middleware/auth";
import { Hono } from "hono";
import { upgradeWebSocket } from "hono/bun";

const app = new Hono();

app.get(
	"/api/v1/live",
	protect,
	// only upgrade after auth passes
	upgradeWebSocket((c) => {
		const session = c.get("session");

		return {
			onOpen(_, ws) {
				ws.send(`connected as ${session.user.email}`);
			},

			onMessage(evt, ws) {
				ws.send(`echo: ${evt.data}`);
			},

			onClose() {
				// optional cleanup
			},
		};
	}),
);

export default app;
