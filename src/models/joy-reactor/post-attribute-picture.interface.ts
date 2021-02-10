import { JRAttributePicture } from "./attribute-picture.interface";
import { JRAttributeType } from "./attribute-type.enum";
import { JRAttribute } from "./attribute.interface";
import { JRImage } from "./image.interface";
import { JRNode } from "./node.interface";
import { JRPost } from "./post.interface";

export interface JRPostAttributePicture extends JRAttributePicture, JRAttribute, JRNode {
  id: string,
  post: JRPost,
  type: JRAttributeType,
  insertId: number | number,
  image: JRImage
}