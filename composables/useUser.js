export const useGetUser = () => {
    console.log("useGetUser");
};

export const useRefreshNotifications = () => {
    const user = useSupabaseUser();
    // console.log("useRefreshNotifications", user.value.id);
    return new Promise(async (resolve, reject) => {
        try {
            const data = await useFetch("/api/v1/user/getAllNotifications", {
                method: "GET",
                query: {
                    user_id: 1,
                },
            });
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};
