import { Component, Input, OnChanges } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JRPostAttributeEmbed } from "../../../models/joy-reactor/post-attribute-embed.interface";
import { JRPostAttributePicture } from "../../../models/joy-reactor/post-attribute-picture.interface";
import { JRAttributeType } from "../../../models/joy-reactor/attribute-type.enum";
import { JRPostAttribute } from "../../../models/joy-reactor/post-attribute.interface";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnChanges {
  @Input() public post: JRPost;

  public html: SafeHtml;

  constructor(private readonly domSanitizer: DomSanitizer) {
    this.post = undefined!;
    this.html = undefined!;
  }

  public ngOnChanges(): void {
    let rawBodyHtml = this.post.text;
    for (let i = 0; i < this.post.attributes.length; i++) {
      const replaceTagRegex = `&attribute_insert_${i + 1}&`;

      const postAttribute = this.post.attributes[i] as JRPostAttribute;
      const replaceTag = this.getReplaceTag(postAttribute);
      const isHtmlContainsReplaceTag = rawBodyHtml.match(replaceTagRegex);
      if (isHtmlContainsReplaceTag) rawBodyHtml = rawBodyHtml.replace(replaceTagRegex, replaceTag.outerHTML);
      else rawBodyHtml += replaceTag.outerHTML;
    }

    this.html = this.domSanitizer.bypassSecurityTrustHtml(rawBodyHtml);
  }

  private getReplaceTag(attribute: JRPostAttribute): HTMLElement {
    const pictureAttribute = attribute as JRPostAttributePicture;
    const embedAttribute = attribute as JRPostAttributeEmbed;

    switch (attribute.type) {
      case JRAttributeType.Picture:
        const pictureFileName = this.getPictureFileName(pictureAttribute);
        const pictureUrl = `http://img10.joyreactor.cc/pics/post/${pictureFileName}`;

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

  private getPictureFileName(attribute: JRPostAttribute): string {
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