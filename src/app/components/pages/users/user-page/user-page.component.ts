import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Blog} from "../../../../models/blog";
import {BlogService} from "../../../../services/blog.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  blogs: Blog[] = []

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.blogService.findAll().subscribe((blogs) => {
      this.blogs = blogs;
    })
  }
}
