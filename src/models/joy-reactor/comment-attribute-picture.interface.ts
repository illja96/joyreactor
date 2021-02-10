import { JRAttributePicture } from "./attribute-picture.interface";
import { JRComment } from "./comment.interface";

export interface JRCommentAttributePicture extends JRAttributePicture {
  comment: JRComment,
}