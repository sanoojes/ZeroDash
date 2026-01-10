import { pinoLogger as pLogger } from "hono-pino";
import { logger } from "@/utils/logger";

export function pinoLogger() {
	return pLogger({
		pino: logger,
	});
}
