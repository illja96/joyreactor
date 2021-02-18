import { Injectable } from "@angular/core";
import { JRProfile } from "../../models/joy-reactor/profile.interface";
import { JRPost } from "../../models/joy-reactor/post.interface";
import { JRImage } from "../../models/joy-reactor/image.interface";
import { JRUser } from "../../models/joy-reactor/user.interface";
import { JRBlog } from "../../models/joy-reactor/blog.interface";
import { JRComment } from "../../models/joy-reactor/comment.interface";
import { JRPostAttributePicture } from "../../models/joy-reactor/post-attribute-picture.interface";
import { JRPostAttributeEmbed } from "../../models/joy-reactor/post-attribute-embed.interface";
import { JRCommentAttributePicture } from "../../models/joy-reactor/comment-attribute-picture.interface";
import { JRCommentAttributeEmbed } from "../../models/joy-reactor/comment-attribute-embed.interface";
import { JRPostAttribute } from "../../models/joy-reactor/post-attribute.interface";
import { JRCommentAttribute } from "../../models/joy-reactor/comment-attribute.interface";
import { JRAttributeType } from "../../models/joy-reactor/attribute-type.enum";
import { JRImageType } from "../../models/joy-reactor/image-type.enum";

@Injectable({ providedIn: 'root' })
export class ParserGqlService {
  public parseProfile(rawProfile: any): JRProfile {
    return {
      token: rawProfile.token,
      user: this.parseUser(rawProfile.user)
    };
  }

  public parsePosts(rawPosts: any[]): JRPost[] {
    const posts = rawPosts
      .map(rp => this.parsePost(rp))
      .filter(p => p !== undefined);

    return posts;
  }

  public parseId(encodedId: string): number {
    const decodedId = atob(encodedId);
    const rawId = decodedId.split(':')[1];

    return Number.parseInt(rawId);
  }

  public parseUser(rawUser: any): JRUser {
    if (!rawUser) return undefined!;

    return {
      id: this.parseId(rawUser.id),
      encodedId: rawUser.id,
      username: rawUser.username
    };
  }

  public parsePost(rawPost: any): JRPost {
    if (!rawPost) return undefined!;

    return {
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
  }

  private parsePostAttributes(rawAttributes: any[]): JRPostAttribute[] {
    if (!rawAttributes) return [];

    return rawAttributes
      .map(ra => this.parsePostAttribute(ra))
      .filter(a => a !== undefined);
  }

  private parsePostAttribute(rawAttribute: any): JRPostAttributePicture | JRPostAttributeEmbed {
    if (!rawAttribute) return undefined!;

    switch (rawAttribute.__typename) {
      case 'PostAttributePicture':
        return {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: <JRAttributeType>rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          value: rawAttribute.value,
          post: undefined!
        };
      case 'PostAttributeEmbed':
        return {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: <JRAttributeType>rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          value: rawAttribute.value,
          post: undefined!
        };
      default:
        throw new Error('Invalid attribute type');
    }
  }

  private parseCommentAttributes(rawAttributes: any[]): JRCommentAttribute[] {
    if (!rawAttributes) return [];

    return rawAttributes
      .map(ra => this.parseCommentAttribute(ra))
      .filter(a => a !== undefined);
  }

  private parseCommentAttribute(rawAttribute: any): JRCommentAttributePicture | JRCommentAttributeEmbed {
    if (!rawAttribute) return undefined!;

    switch (rawAttribute.__typename) {
      case 'CommentAttributePicture':
        return {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: <JRAttributeType>rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          comment: undefined!
        };
      case 'CommentAttributeEmbed':
        return {
          id: this.parseId(rawAttribute.id),
          encodedId: rawAttribute.id,
          type: <JRAttributeType>rawAttribute.type,
          insertId: rawAttribute.insertId,
          image: this.parseImage(rawAttribute.image),
          value: rawAttribute.value,
          comment: undefined!
        };
      default:
        throw new Error('Invalid attribute type');
    }
  }

  private parseImage(rawImage: any): JRImage {
    if (!rawImage) return undefined!;

    return {
      id: this.parseId(rawImage.id),
      encodedId: rawImage.id,
      width: Number.parseInt(rawImage.width),
      height: Number.parseInt(rawImage.height),
      comment: rawImage.comment,
      type: <JRImageType>rawImage.type,
      hasVideo: rawImage.hasVideo
    };
  }

  public parseBlogs(rawBlogs: any[]): JRBlog[] {
    if (!rawBlogs) return [];

    return rawBlogs
      .map(rb => this.parseBlog(rb))
      .filter(b => b !== undefined);
  }

  public parseBlog(rawBlog: any): JRBlog {
    if (!rawBlog) return undefined!;

    return {
      id: this.parseId(rawBlog.id),
      encodedId: rawBlog.id,
      tag: rawBlog.tag,
      name: rawBlog.name,
      synonyms: rawBlog.synonyms
    };
  }

  public parseComments(rawComments: any[]): JRComment[] {
    if (!rawComments) return [];

    return rawComments
      .map(rc => this.parseComment(rc))
      .filter(c => c !== undefined);
  }

  public parseComment(rawComment: any): JRComment {
    if (!rawComment) return undefined!;

    return {
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
  }
}