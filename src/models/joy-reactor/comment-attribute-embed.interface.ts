import { JRAttributeEmbed } from "./attribute-embed.interface";
import { JRAttributeType } from "./attribute-type.enum";
import { JRAttribute } from "./attribute.interface";
import { JRComment } from "./comment.interface";
import { JRImage } from "./image.interface";
import { JRNode } from "./node.interface";

export interface CommentAttributeEmbed extends JRAttributeEmbed, JRAttribute, JRNode {
  id: string,
  comment: JRComment,
  type: JRAttributeType,
  insertId: number | undefined,
  value: string,
  image: JRImage
}