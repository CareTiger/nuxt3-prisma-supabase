export const useGetUser = () => {
    console.log("useGetUser");
};

export const useRefreshNotifications = async () => {
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
