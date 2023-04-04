// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: "Supabase",
            meta: [
                {
                    charset: "utf-8",
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
            ],
            link: [
                {
                    href: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
                    rel: "stylesheet",
                },
                {
                    href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
                    rel: "stylesheet",
                },
            ],
        },
        pageTransition: { name: "page", mode: "out-in" },
    },
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/supabase"],
    runtimeConfig: {
        public: {
            SUPABASE_STORAGE_BASE_URL: process.env.SUPABASE_STORAGE_BASE_URL,
        },
    },
});
