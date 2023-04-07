// get notifications for a user
import { sendError } from "h3";
import { getAllUserNotifications } from "~/server/db/user";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);

	return await getAllUserNotifications(Number(payload.user_id)).catch(
		(error) => {
			sendError(error);
		}
	);
});
