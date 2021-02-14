import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ParserHttpService {
  private readonly domParser: DOMParser;

  constructor() {
    this.domParser = new DOMParser();
  }

  public parseHeader(html: string): string {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const headerTag = dom.querySelector('#header > div') as HTMLDivElement;
    return headerTag.innerText;
  }

  public parseLastPage(html: string): number {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const lastPageTag = dom.querySelector('#Pagination > div > div.pagination_expanded > :nth-child(1)') as HTMLElement;
    const rawLastPage = lastPageTag.innerText;

    return Number.parseInt(rawLastPage);
  }

  public parsePostIds(html: string): number[] {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const rawPostLinkTags = dom.querySelectorAll('a[title="ссылка на пост"]') as NodeListOf<HTMLLinkElement>;
    const postLinkTags = Array.from(rawPostLinkTags);

    return postLinkTags
      .map(tag => tag.href)
      .map(url => url.split('/'))
      .map(urlParts => urlParts[urlParts.length - 1])
      .map(rawId => Number.parseInt(rawId));
  }
}