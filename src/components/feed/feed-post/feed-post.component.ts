import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { JRAttribute } from "../../../models/joy-reactor/attribute.interface";
import { JRPost } from "../../../models/joy-reactor/post.interface";

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FeedPostComponent implements OnInit {
  @Input()
  public post: JRPost;

  public bodyHtml: string;

  constructor() {
    this.post = undefined!;
    this.bodyHtml = '';
  }

  public ngOnInit(): void {
    if (!this.post) return;

    this.bodyHtml = this.post.text;
    for (let i = 0; i < this.post.attributes.length; i++) {
      const attribute = this.post.attributes[i];

      const attributeFileName = this.getAttributeFileName(attribute);

      const attributeHtml = document.createElement('img');
      attributeHtml.src = `http://img10.joyreactor.cc/pics/post/${attributeFileName}`;

      const replaceTagRegex = `&attribute_insert_${i+1}&`;
      const isHtmlContainsReplaceTag = this.bodyHtml.match(replaceTagRegex);
      if (isHtmlContainsReplaceTag) this.bodyHtml = this.bodyHtml.replace(replaceTagRegex, attributeHtml.outerHTML);
      else this.bodyHtml += attributeHtml.outerHTML;
    }
  }

  private getAttributeFileName(attribute: JRAttribute): string {
    const nameParts = [];

    this.post.blogs
      .slice(0, 3)
      .map(b => b.tag)
      .map(t => t.replace(/[ ./?#]|\s/g, '-'))
      .forEach(t => nameParts.push(t));

    nameParts.push(attribute.id);

    const name = nameParts.join('-');
    const nameWithExtension = `${name}.${attribute.image.type}`.toLowerCase();

    return nameWithExtension;
  }
}