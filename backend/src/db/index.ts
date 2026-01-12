import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { authSchema } from "@/db/schema";
import env from "@/env";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

const db = drizzle({
	client: pool,
	schema: { ...authSchema },
});

export const initDB = async () => {
	try {
		const client = await pool.connect();
		client.release();
		console.info("Database Connected");

		return { db };
	} catch (err) {
		console.error(`Database Connection Error: \n`, err);
		process.exit(1);
	}
};

export default db;
