import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
	return c.json({ hello: true });
});

app.post("/", (c) => {
	return c.json({ hello: true });
});

export default app;
