export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser();
    console.log(user.value);
    if (!user.value) {
        return navigateTo("/auth/login");
    }
});
