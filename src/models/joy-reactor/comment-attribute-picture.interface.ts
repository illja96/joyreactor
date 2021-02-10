import { JRAttributePicture } from "./attribute-picture.interface";
import { JRAttributeType } from "./attribute-type.enum";
import { JRAttribute } from "./attribute.interface";
import { JRComment } from "./comment.interface";
import { JRImage } from "./image.interface";
import { JRNode } from "./node.interface";

export interface JRCommentAttributePicture extends JRAttributePicture, JRAttribute, JRNode {
  id: string,
  comment: JRComment,
  type: JRAttributeType,
  insertId: number | undefined,
  image: JRImage
}