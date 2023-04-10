export const todoTransformer = (todo) => {
	return {
		id: todo.id,
		title: todo.title,
		completed: todo.completed,
	};
};
