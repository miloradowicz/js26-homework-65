export interface Page {
  get title(): string;
  get content(): string;
}

export interface Id {
  get id(): string;
}

export interface Url {
  get url(): string;
}

export interface PageWithUrl extends Page, Url {}

export interface InvalidationObject {
  c: null;
}
