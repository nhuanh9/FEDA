import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {PostService} from "../../services/post.service";
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  count = 0;
  currentUser: any;
  categories: Category[];
  adminPosts: Post[] = [{}];
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
    setInterval(()=> {
      this.postService.getTop4().subscribe(data => {
        this.posts = data;
      })
      this.postService.getAllAdminPost().subscribe(data => {
        console.log(data)
        this.adminPosts = data;
      })
      this.categoryService.getAll().subscribe(data => {
        this.categories = data;
      })
    },2000);

  }

}
