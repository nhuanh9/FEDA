import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {Category} from "../../../models/category";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  posts: Post[];
  count = 0;
  currentUser: any;
  categories: Category[];

  constructor(private postService: PostService,
              private router: Router,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.currentUser = localStorage.getItem("currentUser");
    if (this.currentUser == null) {
      alert("Bạn phải đăng nhập trước!");
      this.router.navigate(['/login']);
    }
    this.postService.getTop4().subscribe(data => {
      this.posts = data;
    })
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

}
