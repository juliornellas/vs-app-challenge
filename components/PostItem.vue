<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import { useFavoritesStore } from "@/stores/favorite";
import { storeToRefs } from "pinia";

const favoriteStore = useFavoritesStore();
const { favoriteUser } = favoriteStore;
const { removeFavorite } = favoriteStore;
const { favoritedUsers } = storeToRefs(favoriteStore);

defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const isFollowing = (id) => {
  return favoritedUsers.value.some((v) => v === id);
};

function checkFollow(id) {
  favoritedUsers.value.some((v) => v === id)
    ? removeFavorite(id)
    : followUser(id);
}

function followUser(id) {
  favoriteUser(id);
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
        @click="checkFollow(post.user.id)"
        class="font-medium bg-blue-200 text-sm px-2 rounded-full"
      >
        {{ isFollowing(post.user.id) ? "Unfollow" : "Follow" }}
      </button>
    </div>
    <p>
      {{ post.body }}
    </p>
    <button
      class="bg-red-200 text-red-500 flex items-center justify-center gap-2 p-4 rounded-lg"
    >
      <HeartIcon class="h-6 stroke-current" />
      <span class="font-bold"> Add to my favorites </span>
    </button>
  </div>
</template>
