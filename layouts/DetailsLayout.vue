<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';

import { useRouter } from '#imports';
const router = useRouter();

interface Props {
  image: string;
}
defineProps<Props>();
</script>

<template>
  <main class="h-full flex flex-col justify-center p-12">
    <span
      @click="router.back()"
      class="flex items-center mr-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900"
      ><ChevronLeftIcon class="size-5" /> Back</span
    >
    <div
      class="flex h-full flex-col items-center gap-6 md:flex-row w-full max-w-[--max-width] mx-auto"
    >
      <div
        class="grow w-full md:w-1/2 md:aspect-square bg-contain bg-no-repeat bg-center"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="w-full md:w-1/2">
        <slot name="default"> </slot>
      </div>
    </div>
  </main>
</template>
