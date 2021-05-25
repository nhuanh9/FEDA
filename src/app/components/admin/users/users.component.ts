import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllPost();
    this.items = [{}];
  }

  getAllPost() {
    this.userService.getAll().subscribe(res => {
      this.items = res;
      console.log(res);
    })
  }


  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
