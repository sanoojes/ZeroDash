import { account, jwks, session, users, verification } from "@/db/schema/auth";

const authSchema = {
	account,
	jwks,
	session,
	users,
	verification,
};

export { authSchema };
export * from "@/db/schema/auth";
