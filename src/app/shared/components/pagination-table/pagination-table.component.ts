import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Pageable } from '../../models/Pageable';

@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss']
})
export class PaginationTableComponent implements OnInit, OnChanges {

  @Input() public pageable: Pageable<any>;
  @Output() public currentPage = new EventEmitter<number>();

  public length: number = 500;
  public pageSize = 10;
  public pageIndex = 0;
  public showFirstLastButtons = true;
  public pageEvent: PageEvent;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.length = this.pageable.totalElements;
    this.pageSize = this.pageable.size;
    this.pageIndex = this.pageable.page;
  }
}
