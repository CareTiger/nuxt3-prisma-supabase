import { prisma } from ".";

export const getUser = async (auth_id) => {
	return await prisma.user.findUnique({
		where: {
			auth_id,
		},
		include: {
			notifications: {
				orderBy: {
					created_at: "desc",
				},
			},
		},
	});
};

export const createUser = async (user) => {
	return await prisma.user.create({
		data: user,
	});
};

export const getNotifications = async (auth_id) => {
	return await prisma.notifications.findMany({
		where: {
			auth_id,
		},
		orderBy: {
			created_at: "desc",
		},
		take: 10,
	});
};

export const getUserRole = async (auth_id) => {
	return await prisma.user.findUnique({
		where: {
			auth_id,
		},
		select: {
			role: true,
		},
	});
};
