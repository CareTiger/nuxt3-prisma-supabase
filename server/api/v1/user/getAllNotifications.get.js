// get notifications for a user
import { sendError } from "h3";
import { getAllUserNotifications } from "~/server/db/notifications";

export default defineEventHandler(async (event) => {
    const payload = await getQuery(event);
    return await getAllUserNotifications(Number(payload.user_id)).catch(
        (err) => {
            sendError(err);
        }
    );
});
