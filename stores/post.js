import { defineStore } from "pinia";

export const usePostsStore = defineStore("postStore", () => {
  const { $api } = useNuxtApp();

  async function storePost({ title, body }) {
    console.log("Payload bruto", title, body);
    try {
      const data = await $api.post("/posts", { title, body });
      console.log("Payload back", data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return { storePost };
});
