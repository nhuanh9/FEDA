import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.scss']
})
export class TopsComponent implements OnInit {
  topPosts: User = {};
  topLinkDocs: User = {};
  topComments: User = {};
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getTop()
    setInterval(() => {
      this.getTop();
    }, 2000);
  }

  getTop() {
    this.userService.getTopPosts().subscribe(res => {
      this.topPosts = res[0];
    })
    this.userService.getTopComments().subscribe(res => {
      this.topComments = res[0];
    })
    this.userService.getTopLinkDocs().subscribe(res => {
      this.topLinkDocs = res[0];
    })
  }

}
