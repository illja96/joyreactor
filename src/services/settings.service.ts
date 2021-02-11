import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly nsfwSubject: BehaviorSubject<boolean>;
  
  constructor() {
    this.nsfwSubject = new BehaviorSubject<boolean>(false);
  }

  public getNsfw(): Observable<boolean> {
    return this.nsfwSubject;
  }

  public setNsfw(nsfw: boolean): void {
    this.nsfwSubject.next(nsfw);
  }
}