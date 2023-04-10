import { useUserStore } from "~/store/user";

export const useGetUser = () => {
	const user = useSupabaseUser();
	const userStore = useUserStore();
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch("/api/v1/user/getUser", {
				method: "GET",
				query: {
					user: toRaw(user.value),
				},
			});
			userStore.setProfile(toRaw(data.value));
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};

export const useRefreshNotifications = async () => {
	const userStore = useUserStore();
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch(
				"/api/v1/user/getAllNotifications",
				{
					method: "GET",
					query: {
						auth_id: userStore.profile.id,
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
					auth_id: user.value.id,
				},
			});
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};
