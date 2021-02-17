import { Injectable } from "@angular/core";
import { FeedType } from "../models/feed/feed-type.enum";

@Injectable({ providedIn: 'root' })
export class FeedTypeMapperService {
  public mapToUrl(type: FeedType): string | null {
    switch (type) {
      case FeedType.new:
        return 'new';
      case FeedType.all:
        return 'all';
      case FeedType.good:
        return null;
      case FeedType.best:
        return 'best';
      default:
        throw new Error('Invalid feed type');
    }
  }
}