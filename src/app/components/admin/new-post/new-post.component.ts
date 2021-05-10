import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Category} from "../../../models/category";
import {UserToken} from "../../../models/user-token";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {PostService} from "../../../services/post.service";
import {ImageService} from "../../../services/image.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {DomSanitizer} from "@angular/platform-browser";
import {Post} from "../../../models/post";
import {finalize} from "rxjs/operators";
import {Image} from "../../../models/image";

import {NgxLoadingComponent, ngxLoadingAnimationTypes} from "ngx-loading";
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  @ViewChild('ngxLoading', {static: false}) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public loading1 = false;
  public loading2 = false;
  public loadingTemplate: TemplateRef<any>;
  categories: Category[];
  imgs: any[] = [];
  currentUser: UserToken;
  fb;
  selectedImages: any[] = [];
  createPostForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private postService: PostService,
              private imageService: ImageService,
              private authenticationService: AuthenticationService,
              private storage: AngularFireStorage,
              private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.getAllCategory();
  }


  getAllCategory() {
    this.categoryService.getAll().subscribe(value => {
      this.categories = value;
    })
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

  setNewPost() {
    let post: Post = {
      content: this.createPostForm.get('content').value,
    }
    return post;
  }


  savePost() {
    this.loading1 = true;
    let post: Post = this.setNewPost();
    // this.authenticationService.currentUser.subscribe(x => {
    //   this.currentUser = x;
    //   this.userService.getUserProfile(x.id).subscribe(value => {
    //     post.user = value;
    //     return this.postService.create(post).subscribe(data => {
    //       if (this.selectedImages.length !== 0) {
    //         for (let i = 0; i < this.selectedImages.length; i++) {
    //           let selectedImage = this.selectedImages[i];
    //           var n = Date.now();
    //           const filePath = `RoomsImages/${n}`;
    //           const fileRef = this.storage.ref(filePath);
    //           this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
    //             finalize(() => {
    //               fileRef.getDownloadURL().subscribe(url => {
    //                 const image: Image = {
    //                   linkImg: url,
    //                   postId: data.id
    //                 };
    //                 console.log(url);
    //                 this.imageService.create(image).subscribe(() => {
    //                   console.log('SUCCESSFULLY CREATE')
    //                 });
    //               });
    //             })
    //           ).subscribe();
    //         }
    //       }
    //       setTimeout(() => {
    //         this.loading1 = false;
    //         this.loading2 = true;
    //       }, 3500);
    //       setTimeout(() => {
    //         this.router.navigate(['/users/posts/', data.id]);
    //       }, 4500)
    //     });
    //   })
    // });
  }

  showPreview(event: any) {
    this.loading = true;
    let newSelectedImages = [];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      newSelectedImages = event.target.files;
      for (let i = 0; i < event.target.files.length; i++) {
        this.selectedImages.push(event.target.files[i]);
      }
    } else {
      this.selectedImages = [];
    }
    if (newSelectedImages.length !== 0) {
      for (let i = 0; i < newSelectedImages.length; i++) {
        let selectedImage = newSelectedImages[i];
        var n = Date.now();
        const filePath = `RoomsImages/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgs.push(url);
              if (this.imgs.length == newSelectedImages.length) {
                this.loading = false;
              }
            });
          })
        ).subscribe(() => {
        });
      }
    }

  }

  openSelect(event) {
    if (event.target.value === 'Trong trường') {
      document.getElementById('truong').style.display = '';
    } else {
      document.getElementById('truong').style.display = 'none';
    }
  }
}
