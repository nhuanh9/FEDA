import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category";
import {UserToken} from "../../../models/user-token";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {PostService} from "../../../services/post.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {Post} from "../../../models/post";
import {LinkDoc} from "../../../models/link-doc";
import {LinkDocService} from "../../../services/link-doc.service";

@Component({
  selector: 'app-add-link-doc',
  templateUrl: './add-link-doc.component.html',
  styleUrls: ['./add-link-doc.component.scss']
})
export class AddLinkDocComponent implements OnInit {

  categories: Category[];
  currentUser: UserToken;
  createLinkDocForm: FormGroup = new FormGroup({
    link: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private linkDocService: LinkDocService,
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
      if (this.categories[i].id == this.createLinkDocForm.get('category').value) {
        category = this.categories[i];
      }
    }
    return category
  }

  createPost() {
    let linkDoc: LinkDoc = this.setNewPost();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        linkDoc.user = value;
        this.linkDocService.create(linkDoc).subscribe(() => {
          alert("Thêm mới đường dẫn tài liệu thành công!");
          this.returnHome();
        }, error => {
          console.log("Tạo linkDoc lỗi!");
          console.log(error);
        })
      })
    });
  }

  private setNewPost() {
    let linkDoc: LinkDoc = {
      link: this.createLinkDocForm.get('link').value,
      category: this.setCategoryForFormData()
    }
    console.log(linkDoc)
    return linkDoc;
  }
}
