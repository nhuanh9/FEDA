import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserToken} from "../../../../models/user-token";
import {User} from "../../../../models/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {LinkDoc} from "../../../../models/link-doc";
import {Post} from "../../../../models/post";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Category} from "../../../../models/category";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {HttpClient} from "@angular/common/http";
import {PostLikeService} from "../../../../services/post-like.service";
import {PostService} from "../../../../services/post.service";
import {LinkDocService} from "../../../../services/link-doc.service";
import {ImageService} from "../../../../services/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CategoryService} from "../../../../services/category.service";
import {NgxLoadingComponent, ngxLoadingAnimationTypes} from "ngx-loading";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  currentUser: any = {id: ''};
  user: User = {};
  updateForm: FormGroup;
  arrayPicture: any;
  linkDocs: LinkDoc[] = [{category: {name: ''}, user: {id: ''}}];
  posts: Post[] = [{user: {username: ''}, category: {id: '', name: ''}, listComment: [{}]}];


  @ViewChild('ngxLoading', {static: false}) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public loading1 = false;
  public loading2 = false;
  public loadingTemplate: TemplateRef<any>;
  categories: Category[];
  imgs: any[] = [];
  selectedImages: any[] = [];
  createPostForm: FormGroup = new FormGroup({
    content: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    optional: new FormControl('', [Validators.required]),
  });

  editLinkDocForm: FormGroup = new FormGroup({
    link: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    des: new FormControl('', [Validators.required]),
    optional: new FormControl('', [Validators.required]),
  });

  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
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

    this.listLikePost = [{user: {name: 'a'}}, {user: {name: 'a'}, postEntity: {id: ''}}];
    this.getUser();
    this.getCurrentUser()
    this.getAllCategory();
  }


  getUser() {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.user = value;
      });
      this.userService.getUserPosts(id).subscribe(res => {
        this.posts = res;
      })

      this.userService.getUserLinkdocs(id).subscribe(res => {
        this.linkDocs = res;
      })
    });
  }

  showUpdatePost = (content) => {
    this.modalService.open(content, {centered: true})
  }


  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(x => {
      this.userService.getUserProfile(x.id).subscribe(value => {
        this.currentUser = value;
        console.log(this.currentUser)
      })
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

  }


  deletePost(id) {
    this.userService.deletePost(this.user.id, id).subscribe(() => {
      this.getUser();
    }, error => {
    })
    this.modalService.dismissAll();
  }

  setCategoryForFormData(form) {
    let category;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == form.get('category').value) {
        category = this.categories[i];
      }
    }
    return category
  }

  setNewPost() {
    let post: Post = {
      id: (<HTMLInputElement>document.getElementById('editContent')).value,
      content: this.createPostForm.get('content').value,
      category: this.setCategoryForFormData(this.createPostForm),
      description: this.createPostForm.get('description').value + ' ' + this.createPostForm.get('optional').value
    }
    return post;
  }


  savePost() {
    let post: Post = this.setNewPost();
    this.userService.updatePost(this.user.id, post).subscribe(() => {
      this.getUser();
    }, error => {
    })
    this.modalService.dismissAll();
  }


  openSelect(event) {
    if (event.target.value === 'Trong trường') {
      document.getElementById('truong').style.display = '';
    } else {
      document.getElementById('truong').style.display = 'none';
    }
  }

  openSelect1(event) {
    if (event.target.value === 'Trong trường') {
      document.getElementById('truong1').style.display = '';
    } else {
      document.getElementById('truong1').style.display = 'none';
    }
  }

  setNewLinkDoc() {
    let linkDoc: LinkDoc = {
      id: (<HTMLInputElement>document.getElementById('idLinkDoc')).value,
      link: this.editLinkDocForm.get('link').value,
      description: this.editLinkDocForm.get('description').value,
      category: this.setCategoryForFormData(this.editLinkDocForm),
      des: this.editLinkDocForm.get('des').value + ' ' + this.editLinkDocForm.get('optional').value
    }
    return linkDoc;
  }

  saveLinkDoc() {
    let linkDoc: LinkDoc = this.setNewLinkDoc();
    this.userService.updateLinkDoc(this.user.id, linkDoc).subscribe(() => {
      this.getUser();
    }, error => {
    })
    this.modalService.dismissAll();
  }

  deleteLinkDoc(id) {
    this.userService.deleteLinkDoc(this.user.id, id).subscribe(() => {
      this.getUser();
    }, error => {
    })
    this.modalService.dismissAll();
  }


  isITUTC(status, linkDoc) {
    if (status == '2' && linkDoc.des.split(' ')[0] === 'Trong') {
      return true;
    }
    return false;
  }
  isTrongTruong(linkDoc) {
    if (linkDoc.des.split(' ')[0] === 'Trong') {
      return true;
    }
    return false;
  }
  isLink(linkDoc) {
    if (linkDoc.linkFile == '' || linkDoc.linkFile == null) {
      return true;
    }
    return false;
  }


}
