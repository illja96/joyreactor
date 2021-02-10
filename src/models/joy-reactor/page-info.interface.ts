/**Pagination information about the corresponding list of items*/
export interface JRPageInfo {
  /**When paginating forwards, are there more items?*/
  hasNextPage: boolean,

  /**When paginating backwards, are there more items?*/
  hasPreviousPage: Boolean,

  /**When paginating backwards, the cursor to continue*/
  startCursor: string | undefined,

  /**When paginating forwards, the cursor to continue*/
  endCursor: string | undefined,

  /**Total number of node in connection*/
  total: number | undefined,

  /**Count of nodes in current request*/
  count: number | undefined,

  /**Current page of request*/
  currentPage: number | undefined,

  /**Last page in connection*/
  lastPage: number | undefined
}