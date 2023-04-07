export const useGetUser = () => {
	const user = useSupabaseUser();
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch("/api/v1/user/getUser", {
				method: "GET",
				query: {
					user: toRaw(user.value),
				},
			});
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};

export const useRefreshNotifications = async () => {
	console.log("useRefreshNotifications");
	const user = useSupabaseUser();
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await useFetch(
				"/api/v1/user/getAllNotifications",
				{
					method: "GET",
					query: {
						user_id: 1,
					},
				}
			);
			resolve(toRaw(data.value));
		} catch (error) {
			reject(error);
		}
	});
};
