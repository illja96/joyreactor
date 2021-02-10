import { JRContent } from "./content.interface";
import { JRPost } from "./post.interface";
import { JRUser } from "./user.interface";

export interface JRComment extends JRContent {
  createdAt: Date,
  parent: JRContent | undefined,
  post: JRPost,
  rating: number,
  level: number,
  user: JRUser
}