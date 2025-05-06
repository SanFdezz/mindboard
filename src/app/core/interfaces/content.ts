import { User } from "firebase/auth";

export interface Content {
  uid:string|undefined,
  text:string,
  date:string|null,
  position:string|null,
  color:string,
}
