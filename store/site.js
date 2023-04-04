import { defineStore } from "pinia";

export const useSiteStore = defineStore({
    id: "site-store",
    state: () => {
        return {
            showNavbar: false,
            isActiveLink: false,
            showNoteForm: false,
        };
    },
    actions: {
        // toggle navbar and other modals
        toggleNavbar() {
            this.showNavbar = !this.showNavbar;
            this.isActiveLink = !this.isActiveLink;
        },
        toggleNoteForm() {
            this.showNoteForm = !this.showNoteForm;
        },
    },
    getters: {},
});
