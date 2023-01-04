import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/shared/models/Order';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-edit-service-order',
  templateUrl: './edit-service-order.component.html',
  styleUrls: ['./edit-service-order.component.scss']
})
export class EditServiceOrderComponent implements OnInit {
  public order: Order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private orderService: ServiceOrderService
  ) { 
    this.activatedRoute.paramMap.subscribe(resp => {
      const orderId = resp.get('id');
      if(orderId==null) {
        toastr.error("Ordem de serviço não encontrada");
        this.router.navigate(['/service-order'])
        return;
      }
      this.findById(orderId);
    })
  }

  ngOnInit(): void {
  }

  private findById(orderId: String) {
    this.orderService.findByIdWithJoins(orderId).subscribe(resp => {
      this.order = resp;
    }, error => {
      this.toastr.error("Falha ao carregar a Ordem de Serviço");
      this.router.navigate(['/service-order']);
    });
  }

  // Enviar dados para os forms
}
