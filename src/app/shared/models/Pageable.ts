import { FilterPageable } from "./FilterPageable";

export class Pageable<T> extends FilterPageable {
  content: T;
}