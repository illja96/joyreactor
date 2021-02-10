import { JRSortOrder } from "./sort-order.enum";

/**Allows ordering a list of records*/
export interface JROrderByClause {
  /**The column that is used for ordering*/
  column: string,
  
  /**The direction that is used for ordering*/
  order: JRSortOrder
}