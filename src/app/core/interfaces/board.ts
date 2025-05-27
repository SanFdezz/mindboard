import { Postit } from "./content";
import { List } from "./content";
import { Calendar } from "./content";

export interface Board {
  uid:string|undefined,
  boardID:string,
  title:string,
  date:string|null,
  postits?: Postit[];
  lists?: List[];
  calendars?: Calendar[];
}
