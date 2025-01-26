<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid';

interface Props {
  size: 'small' | 'large';
}
defineProps<Props>();
</script>

<template>
  <a
    v-if="size == 'small'"
    href="#"
    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
  >
    <span class="sr-only">Next</span>
    <ChevronRightIcon class="size-5" aria-hidden="true" />
  </a>
  <a
    v-else
    href="#"
    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >Next</a
  >
</template>
