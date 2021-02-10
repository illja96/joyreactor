import { JRNode } from "./node.interface";
import { JRAttributeType } from "./attribute-type.enum";
import { JRImage } from "./image.interface";

export interface JRAttribute extends JRNode {
  type: JRAttributeType,
  insertId: number | undefined,
  image: JRImage
}