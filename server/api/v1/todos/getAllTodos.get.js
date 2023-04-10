import { sendError } from "h3";
import { getAllTodos } from "~/server/db/todos";
import { serverSupabaseUser } from "#supabase/server";
import { todoTransformer } from "~/server/transformer/todo";

export default defineEventHandler(async (event) => {
	const payload = getQuery(event);

	// server auth guard
	// https://supabase.nuxtjs.org/usage/services/server-supabase-user
	// const user = await serverSupabaseUser(event);
	// if (!user) {
	// 	return sendError("Unauthorized");
	// }

	try {
		const todos = await getAllTodos(payload.user_id);
		return todos.map(todoTransformer);
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
