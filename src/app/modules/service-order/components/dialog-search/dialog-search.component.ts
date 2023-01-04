import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderWithoutJoins } from 'src/app/shared/models/OrderWithoutJoins';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.scss']
})
export class DialogSearchComponent implements OnInit {
  public formGroup: FormGroup;
  public orders: OrderWithoutJoins[] = [];

  constructor(
    private dialog: MatDialog,
    private orderService: ServiceOrderService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  get numberOrder(): String {
    return this.formGroup.value.numberOrder;
  }

  public findOrders() {
    if(this.numberOrder.length<=0) {
      this.orders = [];
      return;
    }

    this.orderService.findByOrderNumberWithoutJoins(this.numberOrder)
      .subscribe(data => this.orders = data);
  }

  selectedOption(order: OrderWithoutJoins) {
    this.dialog.closeAll();
    this.router.navigate(['/service-order/edit-service-order', order]);
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      'numberOrder': ['']
    });
  }
}
