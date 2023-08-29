import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePostsStore = defineStore("postStore", () => {
  const { $api } = useNuxtApp();

  const allPosts = ref([]);

  const showPosts = computed(() => {
    return allPosts;
  });

  const checkUpdate = ref(false);

  async function storePost({ title, body, image }) {
    try {
      let config = { headers: { "Content-Type": "application/json" } };
      await $api.post("/posts", { title, body, image }, config);
      checkUpdate.value = true;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return { storePost, showPosts, allPosts };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
