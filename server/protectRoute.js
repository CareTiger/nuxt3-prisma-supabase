// If the user does not exist on the request, throw a 401 error
import { serverSupabaseUser } from "#supabase/server";
import { sendError } from "h3";

export default async (event) => {
	const user = await serverSupabaseUser(event);

	if (!user) {
		sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: "Unauthorized",
			})
		);
	}
};
