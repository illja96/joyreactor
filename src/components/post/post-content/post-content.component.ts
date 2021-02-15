import { Component, Input, OnChanges } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { AttributeMapperService } from "../../../services/attribute-mapper.service";

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnChanges {
  @Input() public post: JRPost;

  public html: SafeHtml;

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly attributeMapperService: AttributeMapperService) {
    this.post = undefined!;
    this.html = undefined!;
  }

  public ngOnChanges(): void {
    let rawBodyHtml = this.post.text;
    for (let i = 0; i < this.post.attributes.length; i++) {
      const replaceTagRegex = `&attribute_insert_${i + 1}&`;

      const replaceTag = this.attributeMapperService.map(this.post, this.post.attributes[i], true);
      const isHtmlContainsReplaceTag = rawBodyHtml.match(replaceTagRegex);
      if (isHtmlContainsReplaceTag) rawBodyHtml = rawBodyHtml.replace(replaceTagRegex, `<br>${replaceTag.outerHTML}`);
      else rawBodyHtml += `<br>${replaceTag.outerHTML}`;
    }

    this.html = this.domSanitizer.bypassSecurityTrustHtml(rawBodyHtml);
  }
}