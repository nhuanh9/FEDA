import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Post} from "../../../../models/post";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {HttpClient} from "@angular/common/http";
import {PostLikeService} from "../../../../services/post-like.service";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../../services/post.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LinkDocService} from "../../../../services/link-doc.service";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";
import {finalize} from "rxjs/operators";
import {Image} from "../../../../models/image";
import {UserToken} from "../../../../models/user-token";
// import * as $ from 'jquery';
import {NgxLoadingComponent, ngxLoadingAnimationTypes} from "ngx-loading";
import {ImageService} from "../../../../services/image.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {DomSanitizer} from "@angular/platform-browser";

declare var $: any;

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {


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
  selectedImages: any[] = [];
  createPostForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    optional: new FormControl('', [Validators.required]),
  });

  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  sub: Subscription;
  listLikePost: LikePost[] = [{}, {}];

  constructor(private http: HttpClient,
              // private db: AngularFireDatabase,
              private postLikeService: PostLikeService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              public modalService: NgbModal,
              private linkDocService: LinkDocService,
              private imageService: ImageService,
              private authenticationService: AuthenticationService,
              private storage: AngularFireStorage,
              private sanitizer: DomSanitizer,
              private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.getAllPost();
    this.getAllCategory();
    this.listLikePost = [{user: {name: 'a'}}, {user: {name: 'a'}}];
  }

  getAllPost() {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserPosts(this.user.id).subscribe((resJson) => {
      this.listPost = resJson;
      this.listPost.reverse();
    }, error => {
    });
    this.userService.getUserLinkdocs(this.user.id).subscribe(res => {
    })
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(value => {
      this.categories = value;
    })
  }


  showListUsersLikePost(content, id) {
    this.postService.getAllLikeById(id).subscribe(value => {
      this.listLikePost = value;
    })
    this.modalService.open(content, {centered: true})
    // $('#myModalUsersLike' + id).modal('show');

  }

  showUpdatePost = (content, id) => {
    this.modalService.open(content, {centered: true})
  }


  updatePost(id) {
    let newpost = {
      id: id,
      content: (<HTMLInputElement>document.getElementById('editContent')).value
    }
    this.userService.updatePost(this.user.id, newpost).subscribe(() => {
      this.getAllPost();
    }, error => {
    })
    this.modalService.dismissAll();
  }


  deletePost(id) {
    this.userService.deletePost(this.user.id, id).subscribe(() => {
      this.getAllPost();
    }, error => {
    })
    this.modalService.dismissAll();
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
      id: (<HTMLInputElement>document.getElementById('editContent')).value,
      content: this.createPostForm.get('content').value,
      category: this.setCategoryForFormData(),
      description: this.createPostForm.get('description').value + ' ' + this.createPostForm.get('optional').value
    }
    return post;
  }


  savePost() {
    this.loading1 = true;
    let post: Post = this.setNewPost();
    this.userService.updatePost(this.user.id, post).subscribe(() => {
      this.getAllPost();
    }, error => {
    })
    this.modalService.dismissAll();
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
