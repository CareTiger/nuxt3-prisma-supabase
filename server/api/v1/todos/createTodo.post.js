import { sendError } from "h3";
import { createTodo } from "~/server/db/todos";

export default defineEventHandler(async (event) => {
	const payload = await readBody(event);

	try {
		payload.updated_at = new Date();
		return await createTodo(payload);
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
