export const notificationTransformer = (notification) => {
	return {
		id: notification.id,
		type: notification.type,
		message: notification.message,
		read: notification.read,
	};
};
