import { sendError } from "h3";
import { getUser } from "~/server/db/user";
import { createUser } from "~/server/db/user";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);
	const user = await getUser(payload.auth_id);
	if (user) {
		return user;
	} else {
		return await createUser(payload).catch((error) => {
			sendError(error);
		});
	}
});
