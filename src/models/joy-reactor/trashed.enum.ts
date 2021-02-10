/**Specify if you want to include or exclude trashed results from a query*/
export enum JRTrashed {
  /**Only return trashed results*/
  ONLY,

  /**Return both trashed and non-trashed results*/
  WITH,

  /**Only return non-trashed results*/
  WITHOUT
}