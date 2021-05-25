import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";
import {CategoryService} from "../../../../services/category.service";
import {Post} from "../../../../models/post";
import {PostService} from "../../../../services/post.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserToken} from "../../../../models/user-token";
import {AngularFireStorage} from "@angular/fire/storage";
import {delay, finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {ImageService} from "../../../../services/image.service";
import {Category} from "../../../../models/category";
import {NgxLoadingComponent, ngxLoadingAnimationTypes} from "ngx-loading";
import {DomSanitizer} from "@angular/platform-browser";
import {Image} from "../../../../models/image";

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
    content: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    detail: new FormControl('', [Validators.required]),
    optional: new FormControl('', [Validators.required]),
  });

  title = 'tinymcedemo';
  data: any;
  tinymceinit: any;

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private postService: PostService,
              private imageService: ImageService,
              private authenticationService: AuthenticationService,
              private storage: AngularFireStorage,
              private sanitizer: DomSanitizer
  ) {

    this.tinymceinit = {
      height: 500,
      plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor colorpicker textpattern",

      ],
      toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
      image_advtab: true,
      file_picker_callback: function (cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        // Note: In modern browsers input[type="file"] is functional without
        // even adding it to the DOM, but that might not be the case in some older
        // or quirky browsers like IE, so you might want to add it to the DOM
        // just in case, and visually hide it. And do not forget do remove it
        // once you do not need it sanymore.

        input.onchange = function () {
          var file = input.files[0];

          var reader = new FileReader();
          reader.onload = function () {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
            var id = 'blobid' + (new Date()).getTime();
            // @ts-ignore
            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
            // @ts-ignore
            var base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            blobCache.add(blobInfo);

            // call the callback and populate the Title field with the file name
            cb(blobInfo.blobUri(), {title: file.name});
          };
          reader.readAsDataURL(file);
        };

        input.click();
      }
    }
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
      detail: this.createPostForm.get('detail').value,
      category: this.setCategoryForFormData(),
      description: this.createPostForm.get('description').value + ' ' + this.createPostForm.get('optional').value
    }
    post.status = '1';
    if (post.category == undefined) {
      post.category = this.categories[this.categories.length - 1];
    }
    console.log(post)
    return post;
  }


  savePost() {
    this.loading1 = true;
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
                    console.log(url);
                    this.imageService.create(image).subscribe(() => {
                      console.log('SUCCESSFULLY CREATE')
                    });
                  });
                })
              ).subscribe();
            }
          }
          setTimeout(() => {
            this.loading1 = false;
            this.loading2 = true;
          }, 3500);
          setTimeout(() => {
            this.router.navigate(['/users/posts/', data.id]);
          }, 4500)
        });
      })
    });
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
