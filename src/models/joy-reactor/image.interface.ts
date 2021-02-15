import { JRNode } from "./node.interface";
import { JRImageType } from "./image-type.enum";

export interface JRImage extends JRNode {
  width: number,
  height: number,
  comment: string,
  type: JRImageType,
  hasVideo: boolean
}