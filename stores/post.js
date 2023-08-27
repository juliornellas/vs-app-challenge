import { defineStore } from "pinia";

export const usePostsStore = defineStore("postStore", () => {
  const { $api } = useNuxtApp();

  async function storePost({ title, body }) {
    try {
      await $api.post("/posts", { title, body });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return { storePost };
});
