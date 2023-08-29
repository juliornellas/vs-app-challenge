export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  runtimeConfig: {
    public: {
      ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
      API_URL: process.env.API_URL,
      API_URL_STORAGE: process.env.API_URL_STORAGE,
    },
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  imports: {
    dirs: ["./stores"],
  },
});
