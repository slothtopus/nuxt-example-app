<script setup lang="ts">
import { ref } from 'vue';

import { useProductList, preloadImage } from '#imports';

const itemsPerPage = ref(20);
const currentPage = ref(1);

const { isLoading, isError, data, suspense, prefetchPage } = useProductList(
  currentPage,
  itemsPerPage
);

const route = useRoute();
const nuxtApp = useNuxtApp();
if (
  // prerender on server
  route.query.serverPrefetch == 'true' ||
  // delay routing until data is loaded (and show nuxt loading bar)
  (import.meta.client && !nuxtApp.isHydrating)
) {
  await suspense();
}

const preloadProductImage = (id: number, src: string) => {
  console.log('preloading main image for product', id);
  preloadImage(src).then(() => {
    console.log('DONE preloading main image for product', id);
  });
};
</script>

<template>
  <NuxtLayout name="list-layout">
    <template #header>
      <h1 class="text-3xl text-center">All Products</h1>
    </template>
    <template #default>
      <template v-if="isLoading">
        <ProductListItemSkeleton v-for="i in itemsPerPage" :key="i" />
      </template>
      <template v-else-if="isError">
        <p>Error loading data</p>
      </template>
      <template v-else>
        <ProductListItem
          v-for="(product, i) in data?.products || []"
          :key="product.id"
          :to="`/detail/${product.id}`"
          :title="product.title"
          :description="product.description"
          :thumbnail="product.thumbnail"
          @mouseover="preloadProductImage(product.id, product.images[0])"
        />
      </template>
    </template>
    <template #footer>
      <PaginationBar
        v-model="currentPage"
        :totalItems="data?.total || 0"
        :itemsPerPage="itemsPerPage"
        @hoverPage="prefetchPage"
      />
    </template>
  </NuxtLayout>
</template>

<style scoped></style>
