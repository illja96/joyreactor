import { JRAttribute } from "./attribute.interface";
import { JRAttributeType } from "./attribute-type.enum";
import { JRImage } from "./image.interface";

export interface JRAttributeEmbed extends JRAttribute {
  type: JRAttributeType,
  insertId: number | undefined,
  image: JRImage,
  value: string
}