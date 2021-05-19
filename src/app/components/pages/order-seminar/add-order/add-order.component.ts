import {Component, OnInit} from '@angular/core';
import {OrderSeminarService} from "../../../../services/order-seminar.service";
import {OrderSeminar} from "../../../../models/order-seminar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../../services/authentication.service";
import {CategoryService} from "../../../../services/category.service";
import {UserService} from "../../../../services/user.service";
import {Category} from "../../../../models/category";
import {UserToken} from "../../../../models/user-token";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  order: OrderSeminar;
  createForm: FormGroup;
  categories: Category[];
  currentUser: UserToken;

  constructor(private orderSeminarService: OrderSeminarService,
              private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService,
              private router: Router,) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(value => {
      this.categories = value;
      console.log(value);
    })
  }

  prepareForm() {
    this.createForm = new FormGroup({
      createAt: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      note: new FormControl('',[Validators.required]),
      category: new FormControl('', [Validators.required]),
    })
  }

  setCategoryForFormData() {
    let category;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == this.createForm.get('category').value) {
        category = this.categories[i];
      }
    }
    return category
  }

  setNewOrder() {
    let order: OrderSeminar = {
      createAt: Date.now().toString(),
      time: this.createForm.get('time').value,
      content: this.createForm.get('content').value,
      category: this.setCategoryForFormData(),
      note: this.createForm.get('note').value
    }
    return order;
  }

  returnHome() {
    this.router.navigate(['/users/home']);
  }

  createOrder() {
    let order = this.setNewOrder();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        order.user = value;
        this.orderSeminarService.create(order).subscribe(() => {
          alert("Thêm mới đường dẫn tài liệu thành công!");
          this.returnHome();
        }, error => {
        })
      })
    });
  }
}
