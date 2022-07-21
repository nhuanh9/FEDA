import { Component, OnInit } from '@angular/core';
import {Blog} from "../../../../models/blog";
import {BlogService} from "../../../../services/blog.service";

@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.scss']
})
export class AllBlogComponent implements OnInit {

  blogs: Blog[] = []

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.blogService.findAll().subscribe((blogs) => {
      this.blogs = blogs;
    })
  }
}
