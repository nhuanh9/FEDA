import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  posts: Post[];
  count = 0;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.getAll().subscribe(data => {
      console.log(data)
      this.posts = data;
    })
  }
}
