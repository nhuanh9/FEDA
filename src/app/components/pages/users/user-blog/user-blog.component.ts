import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BlogService} from "../../../../services/blog.service";
import {Blog} from "../../../../models/blog";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-user-blog',
  templateUrl: './user-blog.component.html',
  styleUrls: ['./user-blog.component.scss']
})
export class UserBlogComponent implements OnInit {
  userId: string = ''
  blogs: Blog[] = []
  currentUser: User = {}

  constructor(private activatedRoute: ActivatedRoute,
              private blogService: BlogService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.userId = param.get('id');
      this.blogService.findAllByUserId(this.userId).subscribe((blogs) => {
        this.blogs = blogs;
      })

      this.userService.getUserProfile(this.userId).subscribe((user) => {
        this.currentUser = user;
      })
    })
  }

}
