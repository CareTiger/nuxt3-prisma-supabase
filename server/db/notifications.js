import { prisma } from ".";

export const getAllUserNotifications = async (user_id) => {
    return await prisma.notifications.findMany({
        where: {
            user_id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 10,
    });
};
