import { JRAttributeType } from "./attribute-type.enum";
import { JRImage } from "./image.interface";

export interface JRAttributePicture {
  id: string,
  type: JRAttributeType,
  insertId: number | undefined,
  image: JRImage
}