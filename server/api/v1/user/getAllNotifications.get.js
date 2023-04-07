// get notifications for a user
import { sendError } from "h3";
import { getNotifications } from "~/server/db/user";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);

	return await getNotifications(payload.auth_id).catch((error) => {
		sendError(error);
	});
});
