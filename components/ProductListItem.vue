<script setup lang="ts">
interface Props {
  to: string;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
}
defineProps<Props>();
</script>

<template>
  <NuxtLink :to="to" custom v-slot="{ navigate }">
    <li
      @click="navigate"
      class="flex justify-between gap-x-6 py-5 px-5 cursor-pointer hover:bg-gray-100 transition-all"
    >
      <div class="flex grow min-w-0 gap-x-4">
        <div
          v-if="thumbnail === null"
          class="size-16 aspect-square bg-gray-200 rounded-md"
        ></div>
        <img
          v-else
          class="size-16 flex-none bg-gray-50"
          :src="thumbnail"
          alt=""
        />
        <div class="min-w-0 flex-auto">
          <p class="text-sm/6 font-semibold text-gray-900">{{ title }}</p>
          <p class="mt-1 text-xs/5 text-gray-500">
            {{ description }}
          </p>
        </div>
      </div>
    </li>
  </NuxtLink>
</template>

<style scoped></style>
