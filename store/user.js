import { defineStore } from "pinia";

export const useUserStore = defineStore({
	id: "user-store",
	state: () => ({
		profile: {},
	}),
	actions: {
		setProfile(profile) {
			this.profile = profile;
		},
		setNotifications(notifications) {
			this.profile.notifications = notifications;
		},
	},
	getters: {
		getNumberOfUnreadNotifications() {
			if (!this.profile?.notifications) return 0;
			return this.profile?.notifications.filter(
				(notification) => !notification.read
			).length;
		},
	},
});
