import type { Ref } from 'vue';

//import { getPaginationModel, type PaginationModel } from 'ultimate-pagination';

//import { useBreakpoints } from './useBreakpoints';
import type { PaginationModel } from 'ultimate-pagination/src/ultimate-pagination';
import { getPaginationModel } from 'ultimate-pagination/src/ultimate-pagination';
//const ultimatePagination = await import('ultimate-pagination');

import {
  breakpointsTailwind,
  useBreakpoints as useBreakpointsVueUse,
} from '@vueuse/core';

export const usePagination = (
  currentPage: Ref<number>,
  totalItems: Ref<number>,
  itemsPerPage: Ref<number>
) => {
  //const bp = useBreakpoints();

  /*const settings = computed(() => {
    //console.log('settings recomputed');
    if (bp.greaterOrEqual('md').value) {
      return {
        boundaryPagesRange: 1,
        siblingPagesRange: 1,
        hideEllipsis: false,
        hidePreviousAndNextPageLinks: false,
        hideFirstAndLastPageLinks: false,
      };
    } else {
      return {
        boundaryPagesRange: 1,
        siblingPagesRange: 0,
        hideEllipsis: false,
        hidePreviousAndNextPageLinks: false,
        hideFirstAndLastPageLinks: false,
      };
    }
  });*/

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
