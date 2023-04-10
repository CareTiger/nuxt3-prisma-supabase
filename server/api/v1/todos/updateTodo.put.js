import { sendError } from "h3";
import { updateTodo } from "~/server/db/todos";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
	const payload = await readBody(event);

	// server auth guard
	// https://supabase.nuxtjs.org/usage/services/server-supabase-user
	// const user = await serverSupabaseUser(event);
	// if (!user) {
	// 	return sendError("Unauthorized");
	// }

	try {
		payload.updated_at = new Date();
		return await updateTodo(payload);
	} catch (error) {
		return sendError(
			event,
			createError({
				statusCode: error.statusCode || 500,
				statusMessage: error.statusMessage || "Internal Server Error",
				stack: error.stack,
			})
		);
	}
});
