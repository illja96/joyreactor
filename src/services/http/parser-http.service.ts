import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ParserHttpService {
  private readonly domParser: DOMParser;

  constructor() {
    this.domParser = new DOMParser();
  }

  public parseHeader(html: string): string {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const headerElement = dom.querySelector('#header > div') as HTMLDivElement;
    return headerElement.innerText;
  }

  public parseFirstPage(html: string): number {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const firstPageElement = dom.querySelector('#Pagination > div > div.pagination_expanded > :nth-last-child(1)') as HTMLElement;
    const rawFirstPageElement = firstPageElement.innerText;

    return Number.parseInt(rawFirstPageElement);
  }

  public parseLastPage(html: string): number {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const lastPageElement = dom.querySelector('#Pagination > div > div.pagination_expanded > :nth-child(1)') as HTMLElement;
    const rawLastPage = lastPageElement.innerText;

    return Number.parseInt(rawLastPage);
  }

  public parsePostIds(html: string): number[] {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const rawPostLinkElements = dom.querySelectorAll('a[title="ссылка на пост"]') as NodeListOf<HTMLLinkElement>;
    const postLinkElements = Array.from(rawPostLinkElements);

    return postLinkElements
      .map(element => element.href)
      .map(url => url.split('/'))
      .map(urlParts => urlParts[urlParts.length - 1])
      .map(rawId => Number.parseInt(rawId));
  }

  public parseTagIds(html: string): number[] {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const rawTagImageElements = dom.querySelectorAll('#contentinner > div.blog_list_item > div.blog_list_avatar > a > img') as NodeListOf<HTMLImageElement>;
    const tagImageElements = Array.from(rawTagImageElements);

    return tagImageElements
      .map(element => element.src)
      .map(url => url.split('/'))
      .map(urlParts => urlParts[urlParts.length - 1])
      .map(filename => filename.split('.'))
      .map(filenameParts => filenameParts[0])
      .filter(rawId => rawId !== 'default_avatar')
      .map(rawId => Number.parseInt(rawId));
  }
}