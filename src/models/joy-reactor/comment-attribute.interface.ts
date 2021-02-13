import { JRAttribute } from "./attribute.interface";
import { JRComment } from "./comment.interface";

export interface JRCommentAttribute extends JRAttribute {
  comment: JRComment
}