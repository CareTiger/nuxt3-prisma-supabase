export const userTransformer = (user) => {
	return {
		id: user.auth_id,
		email: user.email,
		username: user.username,
		avatar_url: user.avatar_url,
	};
};
