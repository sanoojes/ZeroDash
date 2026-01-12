import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { getMetrics } from "@/utils/metrics";

// Binds to /api/v1/realtime
// gotta check more about this, it's kinda confusing
export const io = new Server();
export const engine = new Engine({
	cors: {
		origin: ["http://localhost:5173"],
	},
});

io.bind(engine);

// TODO: Improve Data management
// IDEAS:
// [ ] Cache metrics to prevent so much metrics calls
// [ ] use 2 namespaces for /admin and /user ??
// [ ] Check auth every 10-10s (less is better) to verify that the user is legit
// [ ] Live User Count
io.on("connection", (socket) => {
	console.info(`Client connected: ${socket.id}`);

	// Metrics
	const interval = setInterval(async () => {
		const data = await getMetrics();

		socket.emit("device:metrics", data);
	}, 1200);

	socket.on("disconnect", () => {
		clearInterval(interval);
	});
});
