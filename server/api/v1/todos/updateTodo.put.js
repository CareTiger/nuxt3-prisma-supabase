import { sendError } from "h3";
import { updateTodo } from "~/server/db/todos";
import protectRoute from "~/server/protectRoute";

export default defineEventHandler(async (event) => {
	// protectRoute(event);

	const payload = await readBody(event);

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
