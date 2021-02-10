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
    const rawPosts = queryResult.data.posts as any[];
    const posts = rawPosts.map(rp => this.parsePost(rp));

    return posts;
  }

  private parseUser(rawUser: any): JRUser {
    const user: JRUser = {
      id: rawUser.id,
      username: rawUser.username
    };

    return user;
  }

  private parsePost(rawPost: any): JRPost {
    const post: JRPost = {
      id: rawPost.id,
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
    return rawAttributes.map(ra => this.parseAttribute(ra));
  }

  private parseAttribute(rawAttribute: any): JRAttribute {
    const attribute: JRAttribute = {
      id: rawAttribute.id,
      type: rawAttribute.type,
      insertId: rawAttribute.insertId,
      image: this.parseImage(rawAttribute.image)
    };

    return attribute;
  }

  private parseImage(rawImage: any): JRImage {
    const image: JRImage = {
      id: rawImage.id,
      width: Number.parseInt(rawImage.width),
      height: Number.parseInt(rawImage.height),
      comment: rawImage.comment,
      type: rawImage.type,
      hasVideo: rawImage.hasVideo
    };

    return image;
  }

  private parseBlogs(rawBlogs: any[]): JRBlog[] {
    return rawBlogs.map(rb => this.parseBlog(rb));
  }

  private parseBlog(rawBlog: any): JRBlog {
    const blog: JRBlog = {
      id: rawBlog.id,
      tag: rawBlog.tag,
      name: rawBlog.name,
      synonyms: rawBlog.synonyms
    };

    return blog;
  }

  private parseComments(rawComments: any[]): JRComment[] {
    return rawComments.map(rc => this.parseComment(rc));
  }

  private parseComment(rawComment: any): JRComment {
    const comment: JRComment = {
      id: rawComment.id,
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