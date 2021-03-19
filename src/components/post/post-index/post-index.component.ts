import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { JRPost } from "../../../models/joy-reactor/post.interface";
import { PostGqlService } from "../../../services/gql/post-gql.service";

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.css']
})
export class PostIndexComponent implements OnInit {
  public post: JRPost;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postGqlService: PostGqlService) {
    this.post = undefined!;
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(paramMap => paramMap.get('id')),
        map(id => Number.parseInt(id!)),
        switchMap(id => this.postGqlService.get(id!)))
      .subscribe(post => this.post = post);
  }
}