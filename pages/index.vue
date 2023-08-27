<script setup>
import { useFavoritesStore } from "@/stores/favorite";
definePageMeta({
  middleware: ["validate-session"],
});
const favoriteStore = useFavoritesStore();
const { getFavorites } = favoriteStore;

const { $api } = useNuxtApp();
const user = useUser();

const { data: posts } = await $api.get("posts");
getFavorites();
</script>

<template>
  <PostForm v-if="!user.isGuest" />
  <div class="grid gap-16">
    <PostItem v-for="post in posts" :key="post.id" v-bind="{ post }" />
  </div>
</template>
