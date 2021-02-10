import { JRAttributeEmbed } from "./attribute-embed.interface";
import { JRComment } from "./comment.interface";

export interface CommentAttributeEmbed extends JRAttributeEmbed {
  comment: JRComment
}