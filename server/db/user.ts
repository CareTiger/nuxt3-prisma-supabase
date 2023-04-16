import { prisma } from ".";
interface IUser {
	user_id: string;
	email: string;
}
export const getUser = async (user_id: string) => {
	return await prisma.user.findUnique({
		where: {
			user_id,
		},
		include: {
			notifications: {
				orderBy: {
					created_at: "desc",
				},
			},
			todos: {
				orderBy: {
					created_at: "desc",
				},
			},
		},
	});
};

export const createUser = async (user: IUser) => {
	return await prisma.user.create({
		data: user,
	});
};

export const getNotifications = async (user_id: string) => {
	return await prisma.notifications.findMany({
		where: {
			user_id,
		},
		orderBy: {
			created_at: "desc",
		},
	});
};

export const getUserRole = async (user_id: string) => {
	return await prisma.user.findUnique({
		where: {
			user_id,
		},
		select: {
			role: true,
		},
	});
};
