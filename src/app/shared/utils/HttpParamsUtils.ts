import { HttpParams } from "@angular/common/http";
import { FilterPageable } from "../models/FilterPageable";

export function handleFilterPageable(filter: FilterPageable): HttpParams {
  defaultConfigs(filter);

  return new HttpParams().appendAll({
    size: String(filter.size),
    page: String(filter.page)
  });
}

function defaultConfigs(filter: FilterPageable) {
  filter.size = 10;
}