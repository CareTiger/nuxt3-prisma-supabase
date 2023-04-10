import { defineStore } from "pinia";

export const useSiteStore = defineStore({
	id: "site-store",
	state: () => ({
		isLoading: false,
	}),
	actions: {
		toggleLoading() {
			this.isLoading = !this.isLoading;
		},
	},
	getters: {},
});
