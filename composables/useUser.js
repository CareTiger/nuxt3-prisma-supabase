import { useUserStore } from "~/store/user";
import { useSiteStore } from "~/store/site";

export const useGetUser = () => {
	const user = useSupabaseUser();
	const userStore = useUserStore();
	const siteStore = useSiteStore();

	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch("/api/v1/user/getUser", {
				method: "GET",
				query: {
					user: toRaw(user.value),
				},
			});
			userStore.setProfile(toRaw(data.value));
			if (siteStore.isLoading) siteStore.toggleLoading();
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};

export const useRefreshNotifications = async () => {
	console.log("Realtime Refresh Notifications");
	const userStore = useUserStore();
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch(
				"/api/v1/user/getAllNotifications",
				{
					method: "GET",
					query: {
						user_id: userStore.profile.id,
					},
				}
			);
			userStore.setNotifications(toRaw(data.value));
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};

export const useGetUserRole = () => {
	const user = useSupabaseUser();
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch("/api/v1/user/getRole", {
				method: "GET",
				query: {
					user_id: user.value.id,
				},
			});
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};
