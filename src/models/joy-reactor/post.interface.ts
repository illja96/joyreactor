import { JRAttribute } from "./attribute.interface";
import { JRBlog } from "./blog.interface";
import { JRContent } from "./content.interface";
import { JRNode } from "./node.interface";
import { JRUser } from "./user.interface";

export interface JRPost extends JRContent, JRNode {
  id: string,
  text: string,
  rating: number,
  commentsCount: number,
  createdAt: Date,
  nsfw: boolean,
  user: JRUser,
  attributes: JRAttribute[],
  blogs: JRBlog[],
  bestComments: Comment[],
  comments: Comment[]
}