import { Postit, Sticker,List } from "./content";


export interface Board {
  uid:string|undefined,
  boardID:string,
  title:string,
  date:string|null,
  postits?: Postit[];
  lists?: List[];
  stickers?: Sticker[];
}
