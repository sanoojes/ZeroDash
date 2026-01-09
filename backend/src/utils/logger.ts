import pino from "pino";
import { pinoLogger } from "hono-pino";
import type { DebugLogOptions } from "hono-pino/debug-log";

export function createLogger(options?: DebugLogOptions) {
	return pinoLogger({
		pino: pino({
			base: null,
			level: "trace",
			transport: {
				target: "hono-pino/debug-log",
				options,
			},
			timestamp: pino.stdTimeFunctions.isoTime,
		}),
	});
}
