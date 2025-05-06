import { User } from "firebase/auth";

export interface Content {
  user:string|null,
  text:string,
  date:string|null,
  position:string|null,
  color:string,
}
