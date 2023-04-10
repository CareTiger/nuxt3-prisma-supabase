// get notifications for a user
import { sendError } from "h3";
import { getNotifications } from "~/server/db/user";
import { notificationTransformer } from "~/server/transformer/notification";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);
	let notifications = [];

	try {
		notifications = await getNotifications(payload.auth_id);
		return notifications.map((notification) =>
			notificationTransformer(notification)
		);
	} catch (error) {
		sendError(error);
	}
});
