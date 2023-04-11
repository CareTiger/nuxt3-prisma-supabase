import { sendError } from "h3";
import { getUserRole } from "~/server/db/user";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);
	const { user_id } = payload;
	return await getUserRole(user_id).catch((error) => {
		sendError(error);
	});
});
