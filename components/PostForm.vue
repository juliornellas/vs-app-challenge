<script setup>
import { usePostsStore } from "@/stores/post";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";

const postsStore = usePostsStore();
const { storePost } = postsStore;

const post = reactive({
  title: "",
  body: "",
});

const errors = reactive({
  title: false,
  body: false,
});

function checkPost() {
  post.title.length == 0 ? (errors.title = true) : (errors.title = false);
  post.body.length == 0 ? (errors.body = true) : (errors.body = false);
}

function submit() {
  checkPost();
  if (errors.title == false && errors.body == false) {
    storePost(toRaw(post));
  }
  post.title = "";
  post.body = "";
}
</script>

<template>
  <form class="grid gap-4 mb-16" @submit.prevent="submit">
    <input
      v-model.trim="post.title"
      placeholder="Post title"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"
      :class="{
        'border-2 border-rose-600': errors.title,
      }"
    />
    <small
      v-if="errors.title"
      :class="{
        'text-rose-600': errors.title,
      }"
      >Title required</small
    >
    <textarea
      v-model.trim="post.body"
      placeholder="What is happening?!"
      class="block w-full rounded-lg border border-gray-400 px-5 py-4 text-sm focus:border-blue-500 focus:outline-none md:text-base"
      :class="{
        'border-2 border-rose-600': errors.body,
      }"
    ></textarea>
    <small
      v-if="errors.body"
      :class="{
        'text-rose-600': errors.body,
      }"
    >
      Body required</small
    >
    <button
      class="bg-blue-600 text-white px-8 py-4 rounded-lg"
      @click.prevent="submit"
    >
      Post
    </button>
  </form>
</template>
