<script setup>
import { storeToRefs } from "pinia";
import { ref, toRaw } from "vue";

const postsStore = usePostsStore();
const { storePost } = postsStore;

const file = ref("");

const post = reactive({
  title: "",
  body: "",
  image: "",
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
    post.image = JSON.stringify(file.value);
    storePost(post);
  }

  post.title = "";
  post.body = "";
  post.image = "";
  file.value = "";
}

function uploadImage(e) {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  files[0].size > 2000000
    ? alert("Your image is over to 2mb! Choose another!")
    : (file.value = files[0]);
}

function clearImage() {
  file.value = "";
  post.image = "";
}
</script>

<template>
  <form
    class="grid gap-4 mb-16"
    @submit.prevent="submit"
    enctype="multipart/form-data"
  >
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
    <div class="flex justify-between inline-block align-middle">
      <div>
        <label
          for="image-upload"
          class="bg-blue-200 px-4 py-2 border rounded-md shadow-sm"
          >Upload an image</label
        >
        <input type="file" id="image-upload" @change="uploadImage" hidden />
      </div>
      <div>
        <p>{{ file.name }}</p>
      </div>
      <div v-if="file">
        <button
          @click="clearImage"
          class="px-2 rounded-full bg-red-600 text-white shadow-md"
        >
          Clear
        </button>
      </div>
    </div>
    <button
      class="bg-blue-600 text-white px-8 py-4 rounded-lg"
      @click.prevent="submit"
    >
      Post
    </button>
  </form>
</template>
