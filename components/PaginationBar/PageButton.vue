<script setup lang="ts">
import { cva } from 'class-variance-authority';

interface Props {
  pageNumber: number;
  active?: boolean;
}
defineProps<Props>();

const pageButton = cva(
  [
    'relative',
    'inline-flex',
    'items-center',
    'px-4',
    'py-2',
    'text-sm',
    'font-semibold',
  ],
  {
    variants: {
      active: {
        false: [
          'text-gray-900',
          'ring-1',
          'ring-gray-300',
          'ring-inset',
          'hover:bg-gray-50',
          'focus:z-20',
          'focus:outline-offset-0',
        ],
        true: [
          'z-10',
          'bg-indigo-600',
          'text-white',
          'focus:z-20',
          'focus-visible:outline-2',
          'focus-visible:outline-offset-2',
          'focus-visible:outline-indigo-600',
        ],
      },
    },
  }
);
</script>

<template>
  <a
    href="#"
    :aria-current="active ? 'page' : undefined"
    :class="pageButton({ active: !!active })"
    >{{ pageNumber }}</a
  >
</template>

<style scoped></style>
