import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../services/blog.service";
import {Blog} from "../../../models/blog";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  blogs: Blog[] = []

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.blogService.findAllPublicStatus().subscribe((blogs) => {
      this.blogs = blogs;
    })
  }

}
