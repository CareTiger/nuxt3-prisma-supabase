import { sendError } from "h3";
import { getAllTodos } from "~/server/db/todos";
import { todoTransformer } from "~/server/transformer/todo";

export default defineEventHandler(async (event) => {
	const payload = getQuery(event);

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
