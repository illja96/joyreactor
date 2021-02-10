export interface JRRateLimitInfo {
  remainingWeight: number,
  weight: number,
  queryCount: number,
  cacheHitCount: number,
  cacheMissCount: number,
  cacheBatchCount: number
}