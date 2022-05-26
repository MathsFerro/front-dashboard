import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Pageable } from '../../models/Pageable';

@Component({
  selector: 'app-pagination-table',
  templateUrl: './pagination-table.component.html',
  styleUrls: ['./pagination-table.component.scss']
})
export class PaginationTableComponent implements OnInit {

  @Input() public pageable: Pageable<any> = new Pageable();
  @Output() public currentPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
}
