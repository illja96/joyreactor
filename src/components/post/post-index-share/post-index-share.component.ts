import { Component, Input, OnChanges } from "@angular/core";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { ShareType } from "../../../models/share-type.enum";

@Component({
  selector: 'app-post-index-share',
  templateUrl: './post-index-share.component.html',
  styleUrls: ['./post-index-share.component.css']
})
export class PostIndexShareComponent implements OnChanges {
  @Input() public post: JRPost;

  public visibleShareTypes: ShareType[];

  public shareTypeInfo: { [key in ShareType]: { fa: string, text: string, url: string }; };

  constructor() {
    this.post = undefined!;
    this.shareTypeInfo = undefined!;

    // TODO: Get this list from settings
    this.visibleShareTypes = [
      ShareType.Telegram,
      ShareType.VK,
      ShareType.Twitter,
      ShareType.Facebook
    ];
  }

  public ngOnChanges(): void {
    const url = `${window.location.origin}/post/${this.post.id}`;

    // TODO: Implement all share types
    this.shareTypeInfo = {
      [ShareType.Telegram]: { fa: 'fab fa-telegram-plane', text: 'Telegram', url: `https://t.me/share/url?url=${url}` },
      [ShareType.Messenger]: { fa: 'fab fa-facebook-messenger', text: 'Messenger', url: '' },
      [ShareType.Viber]: { fa: 'fab fa-viber', text: 'Viber', url: '' },
      [ShareType.Whatsapp]: { fa: 'fab fa-whatsapp', text: 'Whatsapp', url: '' },
      [ShareType.VK]: { fa: 'fab fa-vk', text: 'VK', url: `http://vk.com/share.php?url=${url}` },
      [ShareType.Twitter]: { fa: 'fab fa-twitter', text: 'Twitter', url: `http://twitter.com/home?status=${url}` },
      [ShareType.Facebook]: { fa: 'fab fa-facebook-f', text: 'Facebook', url: `http://www.facebook.com/sharer.php?u=${url}` }
    };
  }
}