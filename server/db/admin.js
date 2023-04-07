import { prisma } from ".";

export const createNotification = async (data) => {
	data.updated_at = new Date().toISOString();
	return await prisma.notifications.create({
		data,
	});
};
