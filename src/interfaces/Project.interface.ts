import type { Status } from "../constants/Status.enum";

export interface Project {
  name: string;
  price: string;
  status: Status;
}
