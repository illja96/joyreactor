import { JRAttributeType } from "./attribute-type.enum";
import { JRImage } from "./image.interface";

export interface JRAttributeEmbed {
  id: string,
  type: JRAttributeType,
  insertId: number | undefined,
  image: JRImage,
  value: string
}