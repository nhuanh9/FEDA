import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category.service";
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserToken} from "../../../models/user-token";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  categories: Category[];
  currentUser: UserToken;
  createPostForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private postService: PostService,
              private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.getAllCategory();
  }


  getAllCategory() {
    this.categoryService.getAll().subscribe(value => {
      this.categories = value;
      console.log(value);
    })
  }

  returnHome() {
    this.router.navigate(['/users/home']);
  }

  setCategoryForFormData() {
    let category;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == this.createPostForm.get('category').value) {
        category = this.categories[i];
      }
    }
    return category
  }

  createPost() {
    let post: Post = this.setNewPost();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        post.user = value;
        this.postService.create(post).subscribe(() => {
          alert("Thêm mới bài viết thành công!");
          this.returnHome();
        }, error => {
          console.log("Tạo post lỗi!");
          console.log(error);
        })
      })
    });
  }

  private setNewPost() {
    let post: Post = {
      content: this.createPostForm.get('content').value,
      category: this.setCategoryForFormData()
    }
    console.log(post)
    return post;
  }

}
