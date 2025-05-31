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

export interface Sticker {
  type:string,
  uid:string|undefined,
  url:string,
  name:string,
  position:string|null,
  key:string,
}
