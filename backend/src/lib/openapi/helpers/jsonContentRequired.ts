import jsonContent from "@/lib/openapi/helpers/jsonContent";
import type { ZodSchema } from "@/lib/openapi/helpers/types.ts";

const jsonContentRequired = <T extends ZodSchema>(
	schema: T,
	description: string,
) => {
	return {
		...jsonContent(schema, description),
		required: true,
	};
};

export default jsonContentRequired;
