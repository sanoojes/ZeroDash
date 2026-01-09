import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "@/env";
import { authSchema } from "@/db/schema/auth";

const pool = new Pool({
	connectionString: DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const db = drizzle({
	client: pool,
	schema: { ...authSchema },
});

export const initDB = async () => {
	try {
		const client = await pool.connect();
		client.release();
		console.log("Database Connected");

		return { db };
	} catch (err) {
		console.error(
			`Database Connection Error: ${err instanceof Error ? err.message : err}`,
		);
		process.exit(1);
	}
};

export default db;
