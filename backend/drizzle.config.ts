import { join } from "node:path";
import { defineConfig } from "drizzle-kit";
import env from "@/env";

const SCHEMA_FOLDER = "./src/db/schema/";
const schema = [
	join(SCHEMA_FOLDER, "auth.ts"),
	join(SCHEMA_FOLDER, "device.ts"),
];

export default defineConfig({
	out: "drizzle",
	schema: schema,
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
