import { Component, Input, OnChanges } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { AttributeMapperService } from "../../../services/attribute-mapper.service";
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

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly attributeMapperService: AttributeMapperService) {
    this.comment = undefined!;
    this.post = undefined!;

    this.html = undefined!;
  }

  public ngOnChanges(): void {
    if (!this.comment || !this.post) return;

    let rawBodyHtml = this.comment.text;
    for (let i = 0; i < this.comment.attributes.length; i++) {
      const replaceTagRegex = `&attribute_insert_${i + 1}&`;

      const replaceTag = this.attributeMapperService.map(this.post, this.comment.attributes[i], false);
      const isHtmlContainsReplaceTag = rawBodyHtml.match(replaceTagRegex);
      if (isHtmlContainsReplaceTag) rawBodyHtml = rawBodyHtml.replace(replaceTagRegex, `<br>${replaceTag.outerHTML}`);
      else rawBodyHtml += `<br>${replaceTag.outerHTML}`;
    }

    this.html = this.domSanitizer.bypassSecurityTrustHtml(rawBodyHtml);
  }
}