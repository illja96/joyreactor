import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HotKey } from "../models/hot-key.enum";

@Injectable({ providedIn: 'root' })
export class HotKeysService {
  private readonly hotKeySubject: Subject<HotKey>;

  constructor() {
    this.hotKeySubject = new Subject<HotKey>();
  }

  public get(): Observable<HotKey> {
    return this.hotKeySubject;
  }

  public set(hotKey: HotKey): void {
    this.hotKeySubject.next(hotKey);
  }
}