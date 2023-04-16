import { useUserStore } from "~/store/user";

export const useGetUser = () => {
	const user = useSupabaseUser();
	const userStore = useUserStore();

	console.log("Getting User profile", user.value);
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch("/api/v1/user/getUser", {
				method: "GET",
				query: {
					user: user.value,
				},
			});
			userStore.setProfile(data.value);
			resolve(data.value);
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
			userStore.setNotifications(data.value);
			resolve(data.value);
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
			resolve(data.value);
		} catch (error) {
			reject(error);
		}
	});
};
