import { Component, Input, OnChanges } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JRAttributeType } from "../../../models/joy-reactor/attribute-type.enum";
import { JRCommentAttributeEmbed } from "../../../models/joy-reactor/comment-attribute-embed.interface";
import { JRCommentAttributePicture } from "../../../models/joy-reactor/comment-attribute-picture.interface";
import { JRCommentAttribute } from "../../../models/joy-reactor/comment-attribute.interface";
import { JRComment } from "../../../models/joy-reactor/comment.interface";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-comment-content',
  templateUrl: './post-comment-content.component.html',
  styleUrls: ['./post-comment-content.component.css']
})
export class PostCommentContentComponent implements OnChanges {
  @Input() public comment: JRComment;
  @Input() public post: JRPost;

  public html: SafeHtml;

  constructor(private readonly domSanitizer: DomSanitizer) {
    this.comment = undefined!;
    this.post = undefined!;

    this.html = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.comment || !this.post) return;

    let rawBodyHtml = this.comment.text;
    for (let i = 0; i < this.comment.attributes.length; i++) {
      const replaceTagRegex = `&attribute_insert_${i + 1}&`;

      const replaceTag = this.getReplaceTag(this.comment.attributes[i] as JRCommentAttribute);
      const isHtmlContainsReplaceTag = rawBodyHtml.match(replaceTagRegex);
      if (isHtmlContainsReplaceTag) rawBodyHtml = rawBodyHtml.replace(replaceTagRegex, `<br>${replaceTag.outerHTML}`);
      else rawBodyHtml += `<br>${replaceTag.outerHTML}`;
    }

    this.html = this.domSanitizer.bypassSecurityTrustHtml(rawBodyHtml);
  }

  private getReplaceTag(attribute: JRCommentAttribute): HTMLElement {
    const pictureAttribute = attribute as JRCommentAttributePicture;
    const embedAttribute = attribute as JRCommentAttributeEmbed;

    switch (attribute.type) {
      case JRAttributeType.Picture:
        const pictureFileName = this.getPictureFileName(pictureAttribute);
        const pictureUrl = `http://img10.joyreactor.cc/pics/comment/${pictureFileName}`;

        const pictureElement = document.createElement('img');
        pictureElement.src = pictureUrl;

        return pictureElement;

      case JRAttributeType.YouTube:
        const youtubeUrl = `https://www.youtube.com/embed/${embedAttribute.value}`;
        const youtubeElement = this.createWrappedIframe(youtubeUrl);

        return youtubeElement;

      case JRAttributeType.Vimeo:
        const vimeoUrl = `https://player.vimeo.com/video/${embedAttribute.value}`;
        const vimeoElement = this.createWrappedIframe(vimeoUrl);

        return vimeoElement;

      case JRAttributeType.Coub:
        const coubUrl = `https://coub.com/embed/${embedAttribute.value}`;
        const coubElement = this.createWrappedIframe(coubUrl);

        return coubElement;

      case JRAttributeType.SoundCloud:
        const soundcloudAttribute = JSON.parse(embedAttribute.value);
        const rawSoundcloudTrackUrl = soundcloudAttribute.url;
        const encodedSoundcloudTrackUrl = encodeURIComponent(rawSoundcloudTrackUrl);
        const fullSoundcloudTrackUrl: string = `${encodedSoundcloudTrackUrl}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
        const soundcloudTrackHeight: number = soundcloudAttribute.height;

        const soundcloudUrl = `https://w.soundcloud.com/player/?url=${fullSoundcloudTrackUrl}`;
        const soundcloudElement = this.createSoundCloudIframe(soundcloudUrl, soundcloudTrackHeight);

        return soundcloudElement;

      case JRAttributeType.Bandcamp:
        const bandcampAttribute = JSON.parse(embedAttribute.value);
        const bandcampUrl: string = bandcampAttribute.url;
        const bandcampWidth: number = bandcampAttribute.width;
        const bandcampHeight: number = bandcampAttribute.height;

        const fullBandcampUrl = `https://bandcamp.com/EmbeddedPlayer/${bandcampUrl}`;
        const bandcampElement = this.createBandcampIframe(fullBandcampUrl, bandcampHeight);

        return bandcampElement;

      default:
        throw 'Invalid type';
    }
  }

  private createWrappedIframe(src: string): HTMLDivElement {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.allowFullscreen = true;
    iframe.style.border = '0px';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';

    const iframeWrapper = document.createElement('div');
    iframeWrapper.style.width = '100%';
    iframeWrapper.style.height = '0px';
    iframeWrapper.style.paddingBottom = '56.25%';
    iframeWrapper.style.position = 'relative';
    iframeWrapper.appendChild(iframe);

    return iframeWrapper;
  }

  private createSoundCloudIframe(src: string, height: number): HTMLIFrameElement {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.allowFullscreen = true;
    iframe.width = '100%';
    iframe.height = `${height}px`;
    iframe.style.border = '0px';

    return iframe;
  }

  private createBandcampIframe(src: string, height: number): HTMLDivElement {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.allowFullscreen = true;
    iframe.style.border = '0px';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';

    const iframeWrapper = document.createElement('div');
    iframeWrapper.style.width = '100%';
    iframeWrapper.style.height = `${height}px`;
    iframeWrapper.style.paddingBottom = '56.25%';
    iframeWrapper.style.position = 'relative';
    iframeWrapper.appendChild(iframe);

    return iframeWrapper;
  }

  private getPictureFileName(attribute: JRCommentAttribute): string {
    const nameParts = [];

    this.post.blogs
      .slice(0, 3)
      .map(b => b.tag)
      .map(t => t.replace(/[ ./?#]|\s/g, '-'))
      .forEach(t => nameParts.push(t));

    if (nameParts.length === 0) nameParts.push('picture');

    nameParts.push(attribute.id);

    const name = nameParts.join('-');
    const nameWithExtension = `${name}.${attribute.image.type}`.toLowerCase();

    return nameWithExtension;
  }
}