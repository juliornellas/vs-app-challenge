import { forEach } from "lodash-es";
import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favoriteStore", () => {
  const { $api } = useNuxtApp();

  //No login buscar usuarios favoritados
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

  async function removeFavorite(id) {
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

  async function getFavorites() {
    const payload = await $api.get("/favorites");
    favoritedUsers.value.length = 0;
    payload.data[0].users.forEach((fav) => favoritedUsers.value.push(fav.id));
  }

  return { favoriteUser, removeFavorite, getFavorites, favoritedUsers };
});
