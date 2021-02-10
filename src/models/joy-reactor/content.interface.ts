import { JRNode } from "./node.interface";
import { JRAttribute } from "./attribute.interface";

export interface JRContent extends JRNode {
  text: string,
  attributes: JRAttribute[]
}