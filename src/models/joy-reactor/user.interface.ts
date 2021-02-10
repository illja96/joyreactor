import { JRNode } from "./node.interface";

export interface JRUser extends JRNode {
  username: string,
  id: string
}