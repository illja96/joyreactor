import { JRAttributeEmbed } from "./attribute-embed.interface";
import { JRPost } from "./post.interface";

export interface JRPostAttribute extends JRAttributeEmbed {
  post: JRPost
}