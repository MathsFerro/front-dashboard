import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Pageable } from '../../models/Pageable';

@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss']
})
export class PaginationTableComponent implements OnInit {

  public pageEvent: PageEvent;
  @Input() public pageable: Pageable<any> = new Pageable();
  @Output() public currentPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.pageable.totalPages = 10;
    this.pageable.size = 2;

  }

  event() {
    this.currentPage.emit(this.pageEvent.pageIndex);
  }
}
