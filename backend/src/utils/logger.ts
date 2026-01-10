import pino from "pino";
import pretty from "pino-pretty";

import env from "@/env";

export const logger = pino(
	{
		level: env.LOG_LEVEL,
		timestamp: pino.stdTimeFunctions.isoTime,
	},
	env.NODE_ENV === "production" ? undefined : pretty(),
);
