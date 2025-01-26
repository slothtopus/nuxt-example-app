<script setup lang="ts">
import { useProductDetails } from '#imports';

const route = useRoute();
const { data, isError, suspense } = useProductDetails(
  computed(() =>
    parseInt(
      Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
    )
  )
);

if (import.meta.server) {
  await suspense();
}
</script>

<template>
  <NuxtLayout name="details-layout" :image="data.images[0]">
    <template v-if="!isError">
      <h1
        class="mb-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
      >
        {{ data.title }}
      </h1>
      <ProductRating class="mb-4" :rating="data.rating" />
      <p class="mb-6 text-3xl tracking-tight text-gray-900">
        £{{ data.price.toFixed(2) }}
      </p>

      <p class="text-base text-gray-900">{{ data.description }}</p>
      <BlockButton v-if="data.stock > 0">Add to cart</BlockButton>
    </template>
    <template v-else>
      <p class="text-base text-gray-900">Error loading product</p>
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
