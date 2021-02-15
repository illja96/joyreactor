import { Component, OnInit, Input, ViewEncapsulation, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JRPostAttributePicture } from "../../../models/joy-reactor/post-attribute-picture.interface";
import { JRPostAttributeEmbed } from "../../../models/joy-reactor/post-attribute-embed.interface";
import { JRAttributeType } from "../../../models/joy-reactor/attribute-type.enum";
import { JRAttribute } from "../../../models/joy-reactor/attribute.interface";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedPostComponent implements OnInit {
  @Input() public post: JRPost;

  public bodyHtml: SafeHtml;

  constructor(private readonly domSanitizer: DomSanitizer) {
    this.post = undefined!;
    this.bodyHtml = undefined!;
  }

  public ngOnInit(): void {
    let rawBodyHtml = this.post.text;
    for (let i = 0; i < this.post.attributes.length; i++) {
      const replaceTagRegex = `&attribute_insert_${i + 1}&`;

      const replaceTag = this.getReplaceTag(this.post.attributes[i]);
      const isHtmlContainsReplaceTag = rawBodyHtml.match(replaceTagRegex);
      if (isHtmlContainsReplaceTag) rawBodyHtml = rawBodyHtml.replace(replaceTagRegex, replaceTag.outerHTML);
      else rawBodyHtml += replaceTag.outerHTML;
    }

    this.bodyHtml = this.domSanitizer.bypassSecurityTrustHtml(rawBodyHtml);
  }

  private getReplaceTag(attribute: JRAttribute): HTMLElement {
    const pictureAttribute = attribute as JRPostAttributePicture;
    const embedAttribute = attribute as JRPostAttributeEmbed;

    switch (attribute.type) {
      case JRAttributeType.Picture:
        const pictureFileName = this.getPictureFileName(pictureAttribute);
        const pictureUrl = `http://img10.joyreactor.cc/pics/post/${pictureFileName}`;

        const pictureTag = document.createElement('img');
        pictureTag.src = pictureUrl;

        return pictureTag;

      case JRAttributeType.Coub:
        const coubUrl = `https://coub.com/embed/${embedAttribute.value}`;

        const coubTag = document.createElement('iframe');
        coubTag.src = coubUrl;
        coubTag.allowFullscreen = true;
        coubTag.frameBorder = '0';
        coubTag.style.width = '100%';
        coubTag.style.height = '100%';
        coubTag.style.position = 'absolute';

        const coubWrapperTag = document.createElement('div');
        coubWrapperTag.style.width = '100%';
        coubWrapperTag.style.height = '0px';
        coubWrapperTag.style.paddingBottom = '56%';
        coubWrapperTag.style.position = 'relative';
        coubWrapperTag.appendChild(coubTag);

        return coubWrapperTag;

      default:
        throw 'Invalid type';
    }
  }

  private getPictureFileName(attribute: JRAttribute): string {
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