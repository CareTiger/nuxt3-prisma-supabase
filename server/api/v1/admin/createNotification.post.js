import { sendError } from "h3";
import { createNotification } from "~/server/db/admin";
export default defineEventHandler(async (event) => {
	const payload = await readBody(event);
	return await createNotification(payload).catch((error) => {
		sendError(error);
	});
});
