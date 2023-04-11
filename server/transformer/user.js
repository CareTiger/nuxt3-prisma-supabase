import { todoTransformer } from "./todo.js";
import { notificationTransformer } from "./notification.js";

export const userTransformer = (user) => {
	return {
		id: user.user_id,
		email: user.email,
		username: user.username,
		avatar_url: user.avatar_url,
		notifications: user.notifications.map((notification) => {
			return notificationTransformer(notification);
		}),
		todos: user.todos.map((todo) => {
			return todoTransformer(todo);
		}),
	};
};
