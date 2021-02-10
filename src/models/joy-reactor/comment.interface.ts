import { JRAttribute } from "./attribute.interface";
import { JRContent } from "./content.interface";
import { JRNode } from "./node.interface";
import { JRPost } from "./post.interface";
import { JRUser } from "./user.interface";

export interface JRComment extends JRContent, JRNode {
  id: string,
  text: string,
  createdAt: Date,
  parent: Comment | undefined,
  post: JRPost,
  rating: number,
  level: number,
  user: JRUser,
  attributes: JRAttribute[]
}