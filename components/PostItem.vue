<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import { useFavoritesStore } from "@/stores/favorite";
import { storeToRefs } from "pinia";

const favoriteStore = useFavoritesStore();
const { favoriteUser } = favoriteStore;
const { favoritePost } = favoriteStore;
const { removeFavoriteUser } = favoriteStore;
const { removeFavoritePost } = favoriteStore;
const { favoritedUsers } = storeToRefs(favoriteStore);
const { favoritedPosts } = storeToRefs(favoriteStore);

defineProps({
  post: {
    type: Object,
    required: true,
  },
});

//USER
const isFollowingUser = (id) => {
  return favoritedUsers.value.some((v) => v === id);
};

function checkFollowUser(id) {
  favoritedUsers.value.some((v) => v === id)
    ? removeFavoriteUser(id)
    : favoriteUser(id);
}

//POST
const isFollowingPost = (id) => {
  return favoritedPosts.value.some((v) => v === id);
};

function checkFollowPost(id) {
  favoritedPosts.value.some((v) => v === id)
    ? removeFavoritePost(id)
    : favoritePost(id);
}
</script>

<template>
  <div class="grid gap-3">
    <h4 class="font-bold text-lg">
      {{ post.title }}
    </h4>
    <div class="flex justify-between bg-gray-100 p-4 rounded-lg">
      <div>
        by <strong>{{ post.user.name }}</strong>
      </div>
      <button
        @click="checkFollowUser(post.user.id)"
        class="font-medium bg-blue-200 text-sm px-2 rounded-full"
      >
        {{ isFollowingUser(post.user.id) ? "Unfollow" : "Follow" }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button
      @click="checkFollowPost(post.id)"
      class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg"
    >
      <HeartIcon
        class="h-6 stroke-current"
        :class="{
          'fill-current': isFollowingPost(post.id),
        }"
      />
      <span class="font-bold">
        {{ isFollowingPost(post.id) ? "Added" : "Add" }}
        to my favorites
      </span>
    </button>
  </div>
</template>
