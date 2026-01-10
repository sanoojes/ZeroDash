import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { getDeviceMetrics } from "@/utils/metrics";
import env from "@/env";

// Binds to /api/v1/realtime
// gotta check more about this, it's kinda confusing
export const io = new Server();
export const engine = new Engine({
	cors: {
		// origin: [env.APP_URL, "http://localhost:5173"],
	},
});

io.bind(engine);

io.on("connection", (socket) => {
	console.info(`Client connected: ${socket.id}`);

	// TODO: add auth
	const interval = setInterval(() => {
		const data = getDeviceMetrics();

		socket.emit("device:metrics", data);
	}, 1000);

	socket.on("disconnect", () => {
		clearInterval(interval);
	});
});
