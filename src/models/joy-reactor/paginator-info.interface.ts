/**Pagination information about the corresponding list of items*/
export interface JRPaginatorInfo {
  /**Total count of available items in the page*/
  count: number,

  /**Current pagination page*/
  currentPage: number,

  /**Index of first item in the current page*/
  firstItem: number | undefined,

  /**If collection has more pages*/
  hasMorePages: boolean,

  /**Index of last item in the current page*/
  lastItem: number | undefined,

  /**Last page number of the collection*/
  lastPage: number,

  /**Number of items per page in the collection*/
  perPage: number,

  /**Total items available in the collection*/
  total: number
}