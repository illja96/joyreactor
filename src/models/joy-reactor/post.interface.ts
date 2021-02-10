import { JRBlog } from "./blog.interface";
import { JRContent } from "./content.interface";
import { JRUser } from "./user.interface";
import { JRComment } from "./comment.interface";

export interface JRPost extends JRContent {
  rating: number,
  commentsCount: number,
  createdAt: Date,
  nsfw: boolean,
  user: JRUser,
  blogs: JRBlog[],
  bestComments: JRComment[],
  comments: JRComment[]
}