import {Component, OnInit} from '@angular/core';
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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllPost();
    this.items = [{roles: [{}]}];
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

  confirmDA(user) {
    if (confirm("Bạn muốn cho <" + user.username + "> có thể tải tất cả tài liệu?") == true) {
      user.status = "2";
      this.userService.updateUserProfile(user.id, user).subscribe(() => {
      });
    }
  }

  confirmA(user) {
    if (confirm("Bạn muốn cho <" + user.username + "> làm admin?") == true) {
      user.roles.push({id:2, name: 'ROLE_ADMIN'});
      this.userService.updateUserProfile(user.id, user).subscribe(() => {
      });
    }
  }
}
