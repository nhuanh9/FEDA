import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {OrderSeminarService} from "../../../services/order-seminar.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  constructor(private orderSeminarService: OrderSeminarService) { }

  ngOnInit() {
    this.getAllPost();
    this.items = [{post: {content: 'a', user: {username: ''}, category: {id: ''}, listComment: []}}];
  }

  getAllPost() {
    this.orderSeminarService.getAll().subscribe(res => {
      this.items = res;
    })
  }


  onChangePage(pageOfItems: Array<any>) {
    console.log(pageOfItems);
    this.pageOfItems = pageOfItems;
  }
}
