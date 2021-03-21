import {Component, OnInit} from '@angular/core';
import {OrderSeminarService} from "../../../../services/order-seminar.service";
import {OrderSeminar} from "../../../../models/order-seminar";

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  orders: OrderSeminar[]

  constructor(private orderSeminarService: OrderSeminarService) {
  }

  ngOnInit() {
  }

  getAllOrders() {
    this.orderSeminarService.getAll().subscribe(res => {
      this.orders = res;
      console.log(res);
    }, error => {
      console.log("Lỗi: ");
      console.log(error);
    })
  }
}
