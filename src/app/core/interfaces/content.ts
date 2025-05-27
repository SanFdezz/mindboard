export interface Postit {
  type:string,
  uid:string|undefined,
  text:string,
  date:string|null,
  position:string|null,
  color:string,
  key:string,
}

export interface List {
  type:string,
  uid:string|undefined,
  text:string[],
  date:string|null,
  position:string|null,
  color:string,
  key:string,
}

export interface Calendar {
  type:string,
  uid:string|undefined,
  text:string,
  date:string|null,
  position:string|null,
  color:string,
  key:string,
}
