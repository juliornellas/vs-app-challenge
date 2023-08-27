import { forEach } from "lodash-es";
import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favoriteStore", () => {
  const { $api } = useNuxtApp();

  //USERS
  const favoritedUsers = ref([]);

  async function favoriteUser(payload) {
    try {
      await $api.post(`/users/${payload}/favorite`);
      favoritedUsers.value.push(payload);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function removeFavoriteUser(id) {
    let index = favoritedUsers.value.findIndex((v) => v === id);
    if (index) {
      favoritedUsers.value.splice(index, 1);
      try {
        await $api.post(`/users/${id}/favorite`);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }

  async function getFavoritesUsers() {
    const payload = await $api.get("/favorites");
    favoritedUsers.value.length = 0;
    payload.data[0].users.forEach((fav) => favoritedUsers.value.push(fav.id));
  }

  //POSTS
  const favoritedPosts = ref([]);

  async function favoritePost(payload) {
    try {
      await $api.post(`/posts/${payload}/favorite`);
      favoritedPosts.value.push(payload);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function removeFavoritePost(id) {
    let index = favoritedPosts.value.findIndex((v) => v === id);
    if (index) {
      favoritedPosts.value.splice(index, 1);
      try {
        await $api.post(`/posts/${id}/favorite`);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  }

  //Tlvz nao seja necessario vem junto dos USERS???
  async function getFavoritesPosts() {
    const payload = await $api.get("/favorites");
    favoritedPosts.value.length = 0;
    payload.data[0].posts.forEach((fav) => favoritedPosts.value.push(fav.id));
  }

  return {
    //Users
    favoriteUser,
    removeFavoriteUser,
    getFavoritesUsers,
    favoritedUsers,
    //Posts
    getFavoritesPosts,
    removeFavoritePost,
    favoritePost,
    favoritedPosts,
  };
});
