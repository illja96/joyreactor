import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { JRPost } from '../../../models/joy-reactor/post.interface';
import { PostGqlService } from '../../../services/gql/post-gql.service';
import { FeedHttpService } from '../../../services/http/feed-http.service';

@Component({
  selector: 'app-feed-all',
  templateUrl: './feed-all.component.html',
  styleUrls: ['./feed-all.component.css']
})
export class FeedAllComponent implements OnInit {
  public posts: JRPost[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly feedHttpService: FeedHttpService,
    private readonly postGqlService: PostGqlService) {
      this.posts = undefined!;
    }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(p => {
          const isPaged = p.has('page');
          if (!isPaged) return undefined;

          const rawPage = p.get('page')!;
          return Number.parseInt(rawPage);
        }),
        switchMap(p => this.feedHttpService.getAll(p)),
        switchMap(i => this.postGqlService.getAll(i)))
      .subscribe(p => this.posts = p);
  }
}
