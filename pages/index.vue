<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

definePageMeta({
  middleware: ["validate-session"],
});
const favoriteStore = useFavoritesStore();
const postStore = usePostsStore();
const { allPosts } = storeToRefs(postStore);
const { showPosts } = postStore;
const { getFavoritesUsers } = favoriteStore;
const { getFavoritesPosts } = favoriteStore;

const { $api } = useNuxtApp();
const user = useUser();

const newPosts = ref(false);

const { data: posts } = await $api.get("posts");
allPosts.value = posts;

async function checkNewPosts() {
  const { data: check } = await $api.get("posts");
  check.length > allPosts.value.length
    ? (newPosts.value = true)
    : (newPosts.value = false);
}
checkNewPosts();

async function updatePosts() {
  const { data } = await $api.get("posts");
  allPosts.value = data;
  newPosts.value = false;
}

getFavoritesUsers();
getFavoritesPosts();

onMounted(() => {
  window.setInterval(() => {
    getFavoritesUsers();
    getFavoritesPosts();
    checkNewPosts();
  }, 30000);
});
</script>

<template>
  <button
    v-if="newPosts"
    @click="updatePosts"
    class="my-4 px-4 py-2 bg-blue-500 rounded-md text-white shadow-md"
  >
    Load New Posts
  </button>
  <!-- <p>All {{ showPosts }}</p> -->
  <PostForm v-if="!user.isGuest" />
  <div class="grid gap-16">
    <PostItem v-for="post in showPosts" :key="post.id" v-bind="{ post }" />
  </div>
</template>
