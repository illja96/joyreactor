import { Injectable } from "@angular/core";
import { ApolloQueryResult, FetchResult } from "@apollo/client/core";
import { JRProfile } from "../models/joy-reactor/profile.interface";
import { JRPost } from "../models/joy-reactor/post.interface";
import { JRImage } from "../models/joy-reactor/image.interface";
import { JRUser } from "../models/joy-reactor/user.interface";
import { JRBlog } from "../models/joy-reactor/blog.interface";
import { JRComment } from "../models/joy-reactor/comment.interface";
import { JRPostAttributePicture } from "../models/joy-reactor/post-attribute-picture.interface";
import { JRPostAttributeEmbed } from "../models/joy-reactor/post-attribute-embed.interface";
import { JRCommentAttributePicture } from "../models/joy-reactor/comment-attribute-picture.interface";
import { JRCommentAttributeEmbed } from "../models/joy-reactor/comment-attribute-embed.interface";
import { JRPostAttribute } from "../models/joy-reactor/post-attribute.interface";
import { JRCommentAttribute } from "../models/joy-reactor/comment-attribute.interface";

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

    return Number.parseInt(rawId);
  }

  private parseUser(rawUser: any): JRUser {
    if (!rawUser) return undefined!;

    const user: JRUser = {
      id: this.parseId(rawUser.id),
      encodedId: rawUser.id,
      username: rawUser.username
    };

    return user;
  }

  private parsePost(rawPost: any): JRPost {
    if (!rawPost) return undefined!;

    const post: JRPost = {
      id: this.parseId(rawPost.id),
      encodedId: rawPost.id,
      text: rawPost.text,
      rating: Number.parseFloat(rawPost.rating),
      commentsCount: Number.parseInt(rawPost.commentsCount),
      createdAt: new Date(rawPost.createdAt),
      nsfw: rawPost.nsfw,
      user: this.parseUser(rawPost.user),
      attributes: this.parsePostAttributes(rawPost.attributes),
      blogs: this.parseBlogs(rawPost.blogs),
      bestComments: this.parseComments(rawPost.bestComments),
      comments: this.parseComments(rawPost.comments)
    };

    return post;
  }

  private parsePostAttributes(rawAttributes: any[]): JRPostAttribute[] {
    if (!rawAttributes) return [];

    return rawAttributes
      .map(ra => this.parsePostAttribute(ra))
      .filter(a => a !== undefined);
  }

  private parsePostAttribute(rawAttribute: any): JRPostAttribute {
    if (!rawAttribute) return undefined!;

    switch (rawAttribute.__typename) {
      case 'PostAttributePicture':
        const postAttributePicture: JRPostAttributePicture = {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          value: rawAttribute.value,
          post: undefined!
        };
        return postAttributePicture;
      case 'PostAttributeEmbed':
        const postAttributeEmbed: JRPostAttributeEmbed = {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          value: rawAttribute.value,
          post: undefined!
        };
        return postAttributeEmbed;
      default:
        throw 'Invalid attribute type';
    }
  }

  private parseCommentAttributes(rawAttributes: any[]): JRCommentAttribute[] {
    if (!rawAttributes) return [];

    return rawAttributes
      .map(ra => this.parseCommentAttribute(ra))
      .filter(a => a !== undefined);
  }

  private parseCommentAttribute(rawAttribute: any): JRCommentAttribute {
    if (!rawAttribute) return undefined!;

    switch (rawAttribute.__typename) {
      case 'CommentAttributePicture':
        const commentAttributePicture: JRCommentAttributePicture = {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          comment: undefined!
        };
        return commentAttributePicture;
      case 'CommentAttributeEmbed':
        const commentAttributeEmbed: JRCommentAttributeEmbed = {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          value: rawAttribute.value,
          comment: undefined!
        };
        return commentAttributeEmbed;
      default:
        throw 'Invalid attribute type';
    }
  }

  private parseImage(rawImage: any): JRImage {
    if (!rawImage) return undefined!;

    const image: JRImage = {
      id: this.parseId(rawImage.id),
      encodedId: rawImage.id,
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
      encodedId: rawBlog.id,
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
      encodedId: rawComment.id,
      text: rawComment.text,
      createdAt: new Date(rawComment.createdAt),
      parent: this.parseComment(rawComment.parent),
      post: this.parsePost(rawComment.post),
      rating: Number.parseFloat(rawComment.rating),
      level: Number.parseInt(rawComment.level),
      user: this.parseUser(rawComment.user),
      attributes: this.parseCommentAttributes(rawComment.attributes)
    };

    return comment;
  }
}