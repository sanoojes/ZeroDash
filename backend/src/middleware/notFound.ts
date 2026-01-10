import type { NotFoundHandler } from "hono";

import { StatusCodes, StatusPhrases } from "@/lib/http";

const notFound: NotFoundHandler = (c) => {
	return c.json(
		{
			message: `${StatusPhrases.NOT_FOUND} - ${c.req.path}`,
		},
		StatusCodes.NOT_FOUND,
	);
};

export default notFound;
