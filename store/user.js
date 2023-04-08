import { defineStore } from "pinia";

export const useUserStore = defineStore({
	id: "user-store",
	state: () => ({
		profile: {},
		notifications: [],
	}),
	actions: {
		setProfile(profile) {
			this.profile = profile;
		},
		setNotifications(notifications) {
			this.notifications = notifications;
		},
	},
	getters: {
		getNumberOfUnreadNotifications() {
			return this.notifications.filter(
				(notification) => !notification.read
			).length;
		},
	},
});
