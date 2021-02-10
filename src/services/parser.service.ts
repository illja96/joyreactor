import { Injectable } from "@angular/core";
import { ApolloQueryResult, FetchResult } from "@apollo/client/core";
import { JRProfile } from "../models/joy-reactor/profile.interface";
import { JRPost } from "../models/joy-reactor/post.interface";
import { JRAttribute } from "../models/joy-reactor/attribute.interface";
import { JRImage } from "../models/joy-reactor/image.interface";
import { JRUser } from "../models/joy-reactor/user.interface";
import { JRBlog } from "../models/joy-reactor/blog.interface";
import { JRComment } from "../models/joy-reactor/comment.interface";

@Injectable({ providedIn: 'root' })
export class ParserService {
  public parseProfile(mutationResult: FetchResult<any, Record<string, any>, Record<string, any>>): JRProfile {
    const rawProfile = mutationResult.data.login.me;

    const profile: JRProfile = {
      token: rawProfile.token,
      user: this.parseUser(rawProfile.user)
    };

    return profile;
  }

  public parsePosts(queryResult: ApolloQueryResult<any>): JRPost[] {
    const rawPosts = queryResult.data.weekTopPosts as any[];

    const posts = rawPosts
      .map(rp => this.parsePost(rp))
      .filter(p => p !== undefined);

    return posts;
  }

  private parseId(encodedId: string): number {
    const decodedId = atob(encodedId);
    const rawId = decodedId.split(':')[1];
    const id = Number.parseInt(rawId);

    return id;
  }

  private parseUser(rawUser: any): JRUser {
    if (!rawUser) return undefined!;

    const user: JRUser = {
      id: this.parseId(rawUser.id),
      username: rawUser.username
    };

    return user;
  }

  private parsePost(rawPost: any): JRPost {
    if (!rawPost) return undefined!;

    const post: JRPost = {
      id: this.parseId(rawPost.id),
      text: rawPost.text,
      rating: Number.parseFloat(rawPost.rating),
      commentsCount: Number.parseInt(rawPost.commentsCount),
      createdAt: new Date(rawPost.createdAt),
      nsfw: rawPost.nsfw,
      user: this.parseUser(rawPost.user),
      attributes: this.parseAttributes(rawPost.attributes),
      blogs: this.parseBlogs(rawPost.blogs),
      bestComments: this.parseComments(rawPost.bestComments),
      comments: this.parseComments(rawPost.comments)
    };

    return post;
  }

  private parseAttributes(rawAttributes: any[]): JRAttribute[] {
    if (!rawAttributes) return [];

    return rawAttributes
      .map(ra => this.parseAttribute(ra))
      .filter(a => a !== undefined);
  }

  private parseAttribute(rawAttribute: any): JRAttribute {
    if (!rawAttribute) return undefined!;

    const attribute: JRAttribute = {
      id: this.parseId(rawAttribute.id),
      type: rawAttribute.type,
      insertId: rawAttribute.insertId,
      image: this.parseImage(rawAttribute.image)
    };

    return attribute;
  }

  private parseImage(rawImage: any): JRImage {
    if (!rawImage) return undefined!;

    const image: JRImage = {
      id: this.parseId(rawImage.id),
      width: Number.parseInt(rawImage.width),
      height: Number.parseInt(rawImage.height),
      comment: rawImage.comment,
      type: rawImage.type,
      hasVideo: rawImage.hasVideo
    };

    return image;
  }

  private parseBlogs(rawBlogs: any[]): JRBlog[] {
    if (!rawBlogs) return [];

    return rawBlogs
      .map(rb => this.parseBlog(rb))
      .filter(b => b !== undefined);
  }

  private parseBlog(rawBlog: any): JRBlog {
    if (!rawBlog) return undefined!;

    const blog: JRBlog = {
      id: this.parseId(rawBlog.id),
      tag: rawBlog.tag,
      name: rawBlog.name,
      synonyms: rawBlog.synonyms
    };

    return blog;
  }

  private parseComments(rawComments: any[]): JRComment[] {
    if (!rawComments) return [];

    return rawComments
      .map(rc => this.parseComment(rc))
      .filter(c => c !== undefined);
  }

  private parseComment(rawComment: any): JRComment {
    if (!rawComment) return undefined!;

    const comment: JRComment = {
      id: this.parseId(rawComment.id),
      text: rawComment.text,
      createdAt: new Date(rawComment.createdAt),
      parent: this.parseComment(rawComment.parent),
      post: this.parsePost(rawComment.post),
      rating: Number.parseFloat(rawComment.rating),
      level: Number.parseInt(rawComment.level),
      user: this.parseUser(rawComment.user),
      attributes: this.parseAttributes(rawComment.attributes)
    };

    return comment;
  }
}