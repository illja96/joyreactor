import { JRNode } from "./node.interface";
import { JRImageTypes } from "./image-types.enum";

export interface JRImage extends JRNode {
  width: number,
  height: number,
  comment: string,
  type: JRImageTypes,
  hasVideo: boolean
}