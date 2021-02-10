import { JRAttributeEmbed } from "./attribute-embed.interface";
import { JRAttributeType } from "./attribute-type.enum";
import { JRAttribute } from "./attribute.interface";
import { JRImage } from "./image.interface";
import { JRNode } from "./node.interface";
import { JRPost } from "./post.interface";

export interface JRPostAttributeEmbed extends JRAttributeEmbed, JRAttribute, JRNode {
  id: string,
  post: JRPost,
  type: JRAttributeType,
  insertId: number | undefined,
  value: string,
  image: JRImage
}