import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = []
  items = [];
  pageOfItems: Array<any>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getAllPost();
    this.items = [{post: {content: 'a', user: {username: ''}, category: {id: ''}, listComment: []}}];
  }

  getAllPost() {
    this.postService.getAll().subscribe(res => {
      this.items = res;
    })
  }


  onChangePage(pageOfItems: Array<any>) {
    console.log(pageOfItems);
    this.pageOfItems = pageOfItems;
  }

  deletePost(id) {
    if (confirm("Bạn có chắc chắn muốn xoá bài viết này?")) {
      this.postService.delete(id).subscribe(()=> {
        alert("Xoá thành công!");
        this.getAllPost();
      })
    }
  }
}
