import { JRAttributeType } from "./attribute-type.enum";
import { JRImage } from "./image.interface";

export interface JRAttribute {
  id: string,
  type: JRAttributeType,
  insertId: number | undefined,
  image: JRImage
}