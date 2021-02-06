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
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {Image} from "../../../models/image";
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  categories: Category[];
  downloadURL: Observable<string>;
  currentUser: UserToken;
  fb;
  selectedImages: any[] = [];
  createPostForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private postService: PostService,
              private imageService: ImageService,
              private authenticationService: AuthenticationService,
              private storage: AngularFireStorage
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
        // this.postService.create(post).subscribe(() => {
        //   console.log("Thêm mới bài viết thành công!");
        // }, error => {
        //   console.log("Tạo post lỗi!");
        //   console.log(error);
        // })
        return this.postService.create(post).toPromise();
      })
    });
  }

  setNewPost() {
    let post: Post = {
      content: this.createPostForm.get('content').value,
      category: this.setCategoryForFormData()
    }
    console.log(post)
    return post;
  }


  createImage() {

    let post: Post = this.setNewPost();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        post.user = value;
        return this.postService.create(post).subscribe(data => {
          if (this.selectedImages.length !== 0) {
            for (let i = 0; i < this.selectedImages.length; i++) {
              let selectedImage = this.selectedImages[i];
              var n = Date.now();
              const filePath = `RoomsImages/${n}`;
              const fileRef = this.storage.ref(filePath);
              this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe(url => {
                    const image: Image = {
                      linkImg: url,
                      postId: data.id
                    };
                    console.log(image);
                    console.log(url);
                    if (i == 0) {
                    }
                    this.imageService.create(image).subscribe(() => {
                      console.log('SUCCESSFULLY CREATE')
                    });
                  });
                })
              ).subscribe();
            }
            this.returnHome();
          }
        });
      })
    });

  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
      console.log(this.selectedImages);
    } else {
      this.selectedImages = [];
    }
    // this.createImage();
  }
}
