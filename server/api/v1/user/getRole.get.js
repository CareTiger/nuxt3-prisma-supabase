import { sendError } from "h3";
import { getUserRole } from "~/server/db/user";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);
	const { auth_id } = payload;
	return await getUserRole(auth_id).catch((error) => {
		sendError(error);
	});
});
