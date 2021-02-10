import { JRNode } from "./node.interface";

export interface JRBlog extends JRNode {
  tag: string,
  name: string,
  synonyms: string | undefined,
  id: string
}