import { Content } from "./content";

export interface Board {
  uid:string|undefined,
  boardID:string,
  title:string,
  date:string|null,
  contents?: Content[];
}
