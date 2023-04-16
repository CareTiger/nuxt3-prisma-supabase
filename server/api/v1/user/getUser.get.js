import { sendError } from "h3";
import { getUser } from "~/server/db/user";
import { createUser } from "~/server/db/user";
import { userTransformer } from "~/server/transformer/user";

export default defineEventHandler(async (event) => {
	const payload = await getQuery(event);
	const user = JSON.parse(payload.userData);

	// check if user exists in app db and return user else create new user
	const userExists = await getUser(user.id);
	if (userExists) {
		return userTransformer(userExists);
	} else {
		const newUser = {
			user_id: user.id,
			email: user.email,
			full_name: user?.user_metadata?.full_name,
			avatar_url: user?.user_metadata?.avatar_url,
			username: user?.user_metadata?.user_name,
			created_at: new Date(),
			updated_at: new Date(),
		};
		try {
			const createdUser = await createUser(newUser);
			return userTransformer(createdUser);
		} catch (error) {
			sendError(error);
		}
	}
});
