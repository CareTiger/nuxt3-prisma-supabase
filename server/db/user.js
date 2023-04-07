import { prisma } from ".";

export const getUser = async (auth_id) => {
	return await prisma.user.findUnique({
		where: {
			auth_id,
		},
	});
};

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

export const createUser = async (user) => {
	return await prisma.user.create({
		data: user,
	});
};
