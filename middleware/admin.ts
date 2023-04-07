export default defineNuxtRouteMiddleware(async (to) => {
	const userRole = await useGetUserRole();
	if (userRole.role !== "ADMIN") {
		return "/dashboard";
	}
});
