import { prisma } from ".";

export const getAllTodos = async (user_id) => {
	return await prisma.todos.findMany({
		where: {
			user_id,
		},
	});
};

export const updateTodo = async (data) => {
	return await prisma.todos.update({
		where: {
			id: data.id,
		},
		data,
	});
};

export const createTodo = async (data) => {
	return await prisma.todos.create({
		data,
	});
};

export const deleteTodo = async (id) => {
	return await prisma.todos.delete({
		where: {
			id,
		},
	});
};
