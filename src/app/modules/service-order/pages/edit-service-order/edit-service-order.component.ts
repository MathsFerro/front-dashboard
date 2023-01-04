import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-edit-service-order',
  templateUrl: './edit-service-order.component.html',
  styleUrls: ['./edit-service-order.component.scss']
})
export class EditServiceOrderComponent implements OnInit {


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
      console.log(resp)
    })
  }

  ngOnInit(): void {
  }

  private findById(orderId: String) {
    this.orderService.findByIdWithJoins(orderId).subscribe(resp => {
      console.log(resp);
    });
  }
}
