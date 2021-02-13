import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { indexedDbConstants } from "../../constants/indexedDb.constants";
import { version } from "../../../package.json";
import { JRPost } from "../../models/joy-reactor/post.interface";

@Injectable({ providedIn: 'root' })
export class PostCacheService {
  private database: IDBDatabase;

  constructor() {
    this.database = undefined!;

    const rawVersion = version.split('.')[2];
    const databaseVersion = Number.parseInt(rawVersion);
    const request = indexedDB.open(indexedDbConstants.databaseName, databaseVersion);
    request.onsuccess = () => {
      this.database = request.result;

      this.database.onversionchange = () => {
        switch (this.database.version) {
          case 0:
            this.createDatabase();
            return;
          default:
            this.database.close();
            // TODO: Close application
            // TODO: Drop database
            return;
        }
      };
    };
  }

  public any(id: number): Observable<boolean> {
    const subject = new Subject<boolean>();
    const store = this.database
      .transaction(indexedDbConstants.storeNames.posts, 'readonly')
      .objectStore(indexedDbConstants.storeNames.posts);

    const request = store.count(id);
    request.onsuccess = () => {
      subject.next(request.result === 1);
      subject.complete();
    };
    request.onerror = () => subject.error(request.error);

    return subject;
  }

  public get(id: number): Observable<JRPost> {
    const subject = new Subject<JRPost>();
    const store = this.database
      .transaction(indexedDbConstants.storeNames.posts, 'readonly')
      .objectStore(indexedDbConstants.storeNames.posts);

    const request = store.get(id);
    request.onsuccess = () => {
      const post = request.result as JRPost;
      subject.next(post);
      subject.complete();
    };
    request.onerror = () => subject.error(request.error);

    return subject;
  }

  public set(post: JRPost): Observable<void> {
    const subject = new Subject<void>();
    const store = this.database
      .transaction(indexedDbConstants.storeNames.posts, 'readwrite')
      .objectStore(indexedDbConstants.storeNames.posts);

    const request = store.add(post, post.id);
    request.onsuccess = () => subject.complete();
    request.onerror = () => subject.error(request.error);

    return subject;
  }

  private createDatabase(): void {
    this.database.createObjectStore(indexedDbConstants.storeNames.posts, { keyPath: 'id' });
  }
}