import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../../models/blog";

@Component({
  selector: 'app-list-blog',
  templateUrl: './list-blog.component.html',
  styleUrls: ['./list-blog.component.scss']
})
export class ListBlogComponent implements OnInit {
  @Input()
  blogs: Blog[] = []
  userId = '';

  constructor() {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('ID');
  }

}
