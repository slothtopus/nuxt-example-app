import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/vue-query';
import type { QueryFunctionContext } from '@tanstack/vue-query';

export type ProductListQueryKey = [string, number, number];
export type ProductDetailsQueryKey = [string, number];

// Minimal type with just the fields used
export type ProductDetails = {
  id: number;
  rating: number;
  title: string;
  description: string;
  stock: number;
  images: string[];
  thumbnail: string;
  price: number;
};

const PRODUCT_PLACEHOLDER: ProductDetails = {
  id: -1,
  rating: 0,
  title: '',
  description: '',
  stock: 0,
  images: [],
  thumbnail: '',
  price: 0,
};

export type ProductList = {
  total: number;
  products: ProductDetails[];
};

export const preloadImage = (src: string) =>
  new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(src);
    image.onerror = reject;
    image.src = src;
  });

export const useProductList = (
  page: Ref<number>,
  itemsPerPage: Ref<number>
) => {
  const queryClient = useQueryClient();

  const updateProductDetailsCache = (products: ProductList) => {
    for (const product of products.products) {
      queryClient.setQueryData(['product', product.id], product);
    }
  };

  const preloadProductThumbnails = (products: ProductList) =>
    Promise.all(products.products.map((p) => preloadImage(p.thumbnail)));

  const fetchProductList = async ({ queryKey }: QueryFunctionContext) => {
    console.log(queryKey, 'fetching product LIST');

    const [_, page, itemsPerPage] = queryKey as ProductListQueryKey;
    const response = (await $fetch(
      `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (page - 1) * itemsPerPage
      }`
    )) as ProductList;

    updateProductDetailsCache(response);
    if (import.meta.client) {
      console.log(queryKey, 'preloading thumbnails');
      preloadProductThumbnails(response).then(() =>
        console.log(queryKey, 'DONE preloading thumbnails')
      );
    }
    console.log(queryKey, 'DONE fetching product LIST');
    return response;
  };

  const { data, suspense, isLoading, isError } = useQuery({
    queryKey: ['products', page, itemsPerPage],
    queryFn: fetchProductList,
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const prefetchPage = async (page: number) => {
    await queryClient.prefetchQuery({
      queryKey: ['products', page, itemsPerPage.value],
      queryFn: fetchProductList,
      staleTime: Infinity,
    });
  };

  return { data, suspense, isLoading, isError, prefetchPage };
};

export const useProductDetails = (id: Ref<number>) => {
  const fetchProductDetails = async ({ queryKey }: QueryFunctionContext) => {
    console.log(queryKey, 'fetching product DETAILS');

    const [_, id] = queryKey as ProductDetailsQueryKey;
    const response = (await $fetch(
      `https://dummyjson.com/product/${id}`
    )) as ProductDetails;

    console.log(queryKey, 'DONE fetching product DETAILS');
    return response;
  };

  const { data, suspense, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProductDetails,
    placeholderData: keepPreviousData,
    initialData: PRODUCT_PLACEHOLDER,
    // set to 0 to ensure refetch on page load
    staleTime: 0,
  });

  return { data, suspense, isLoading, isError };
};
