// server auth guard
// this method requires the user logged in for all our API endpoints
// import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
	// console.log("auth middleware");
	// const user = await serverSupabaseUser(event);
	// if (!user) {
	// 	throw createError({
	// 		statusCode: 401,
	// 		message: "Unauthorized",
	// 	});
	// }
});

// MOVED TO  ~/server/protectRoute.js
