export const userTransformer = (user) => {
	return {
		email: user.email,
		username: user.username,
		avatar_url: user.avatar_url,
	};
};
