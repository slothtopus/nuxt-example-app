import type { Ref } from 'vue';

import type { PaginationModel } from '@lib/ultimate-pagination';
import { getPaginationModel } from '@lib/ultimate-pagination';

export const usePagination = (
  currentPage: Ref<number>,
  totalItems: Ref<number>,
  itemsPerPage: Ref<number>
) => {
  const totalPages = computed(() => {
    return Math.max(Math.ceil(totalItems.value / itemsPerPage.value), 1);
  });

  const paginationModel = computed<PaginationModel>(() => {
    console.log('paginationModel computed', currentPage.value);
    return getPaginationModel({
      currentPage: currentPage.value,
      totalPages: totalPages.value,
      boundaryPagesRange: 1,
      siblingPagesRange: 1,
      hideEllipsis: false,
      hidePreviousAndNextPageLinks: false,
      hideFirstAndLastPageLinks: false,
    });
  });

  return { paginationModel };
};
