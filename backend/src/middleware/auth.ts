import type { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { auth } from "@/lib/auth";
import type { UserRole } from "@/lib/auth/constants";
import { StatusCodes, StatusPhrases } from "@/lib/http";

export const protect = async (c: Context, next: Next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });

	if (!session || !session.user) {
		return c.json(
			{
				success: false,
				message: StatusPhrases.UNAUTHORIZED,
				error: "No valid session found",
			},
			StatusCodes.UNAUTHORIZED,
		);
	}

	c.set("user", session.user);
	c.set("session", session.session);

	await next();
};

export const isRole = (role: UserRole) =>
	createMiddleware(async (c: Context, next: Next) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });

		if (!session?.user) {
			return c.json(
				{
					success: false,
					message: StatusPhrases.UNAUTHORIZED,
					error: "No valid session found",
				},
				StatusCodes.UNAUTHORIZED,
			);
		}

		if (session.user.role !== role) {
			return c.json(
				{
					success: false,
					message: StatusPhrases.FORBIDDEN,
					error: `User does not have required role: ${role}`,
				},
				StatusCodes.FORBIDDEN,
			);
		}

		c.set("user", session.user);
		c.set("session", session.session);

		await next();
	});

export const isAdmin = isRole("admin");
