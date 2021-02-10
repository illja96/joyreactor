import { JRAttributePicture } from "./attribute-picture.interface";
import { JRPost } from "./post.interface";

export interface JRPostAttributePicture extends JRAttributePicture {
  post: JRPost
}