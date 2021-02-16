import { Component, HostListener } from "@angular/core";
import { HotKey } from "../../../models/hot-key.enum";
import { HotKeysService } from "../../../services/hot-keys.service";

@Component({
  selector: 'app-root-hot-keys',
  templateUrl: './root-hot-keys.component.html',
  styleUrls: ['./root-hot-keys.component.css']
})
export class RootHotKeysComponent {
  constructor(private readonly hotKeyService: HotKeysService) { }

  @HostListener('document:keypress', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.code) {
      case 'KeyW':
        this.hotKeyService.set(HotKey.PreviousPost);
        break;
      case 'KeyS':
        this.hotKeyService.set(HotKey.NextPost);
        break;
      case 'KeyA':
        this.hotKeyService.set(HotKey.RatingUp);
        break;
      case 'KeyD':
        this.hotKeyService.set(HotKey.RatingDown);
        break;
      case 'KeyT':
        this.hotKeyService.set(HotKey.ShowComments);
        break;
      case 'Space':
        this.hotKeyService.set(HotKey.OpenPost);
        break;
    }
  }
}