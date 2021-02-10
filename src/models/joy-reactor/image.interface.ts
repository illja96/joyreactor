import { JRImageTypes } from "./image-types.enum";
import { JRNode } from "./node.interface";

export interface JRImage extends JRNode {
  width: number,
  height: number,
  comment: string,
  type: JRImageTypes,
  hasVideo: boolean,
  id: string
}