export class Pageable<T> {
  content: T;
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
}