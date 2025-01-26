<script setup lang="ts">
import { toRef } from 'vue';

import PageButton from './PaginationBar/PageButton.vue';
import EllipsisSeparator from './PaginationBar/EllipsisSeparator.vue';
import NextButton from './PaginationBar/NextButton.vue';
import PrevButton from './PaginationBar/PrevButton.vue';

import { ITEM_TYPES } from '@lib/ultimate-pagination';

interface Props {
  modelValue: number;
  totalItems: number;
  itemsPerPage: number;
}
const props = defineProps<Props>();
const { paginationModel } = usePagination(
  toRef(props, 'modelValue'),
  toRef(props, 'totalItems'),
  toRef(props, 'itemsPerPage')
);

defineEmits<{
  'update:modelValue': [currentPage: number];
  hoverPage: [page: number];
}>();

const handleHover = (page: number) => {
  console.log('hovering page', page);
};
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <template v-for="control in paginationModel" :key="control.key">
        <PrevButton
          v-if="control.type == ITEM_TYPES.PREVIOUS_PAGE_LINK"
          size="large"
          @click="$emit('update:modelValue', control.value)"
          @mouseover="$emit('hoverPage', control.value)"
        />
        <NextButton
          v-else-if="control.type == ITEM_TYPES.NEXT_PAGE_LINK"
          size="large"
          @click="$emit('update:modelValue', control.value)"
          @mouseover="$emit('hoverPage', control.value)"
        />
      </template>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ ' ' }}
          <span class="font-medium">{{
            (modelValue - 1) * itemsPerPage + 1
          }}</span>
          {{ ' ' }}
          to
          {{ ' ' }}
          <span class="font-medium"
            >{{ Math.min(modelValue * itemsPerPage, totalItems) }}
          </span>
          {{ ' ' }}
          of
          {{ ' ' }}
          <span class="font-medium">{{ totalItems }}</span>
          {{ ' ' }}
          results
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-xs"
          aria-label="Pagination"
        >
          <template v-for="control in paginationModel" :key="control.key">
            <PrevButton
              v-if="control.type == ITEM_TYPES.PREVIOUS_PAGE_LINK"
              size="small"
              @click="$emit('update:modelValue', control.value)"
              @mouseover="$emit('hoverPage', control.value)"
            />
            <PageButton
              v-else-if="control.type == ITEM_TYPES.PAGE"
              :pageNumber="control.value"
              :active="control.isActive"
              @click="$emit('update:modelValue', control.value)"
              @mouseover="$emit('hoverPage', control.value)"
            />
            <EllipsisSeparator
              v-else-if="control.type == ITEM_TYPES.ELLIPSIS"
            />
            <NextButton
              v-else-if="control.type == ITEM_TYPES.NEXT_PAGE_LINK"
              size="small"
              @click="$emit('update:modelValue', control.value)"
              @mouseover="$emit('hoverPage', control.value)"
            />
          </template>
        </nav>
      </div>
    </div>
  </div>
</template>
