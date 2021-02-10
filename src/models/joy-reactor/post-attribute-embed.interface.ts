import { JRAttributeEmbed } from "./attribute-embed.interface";
import { JRPost } from "./post.interface";

export interface JRPostAttributeEmbed extends JRAttributeEmbed {
  post: JRPost
}