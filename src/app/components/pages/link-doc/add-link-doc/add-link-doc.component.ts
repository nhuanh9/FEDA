import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../../../models/category";
import {UserToken} from "../../../../models/user-token";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../../../services/category.service";
import {PostService} from "../../../../services/post.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {Post} from "../../../../models/post";
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";
import {finalize} from "rxjs/operators";

import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-add-link-doc',
  templateUrl: './add-link-doc.component.html',
  styleUrls: ['./add-link-doc.component.scss']
})
export class AddLinkDocComponent implements OnInit {

  // @ts-ignore
  @ViewChild('inputFile') myInputVariable: ElementRef;
  categories: Category[];
  currentUser: UserToken;
  createLinkDocForm: FormGroup = new FormGroup({
    link: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    des: new FormControl('', [Validators.required]),
    optional: new FormControl('', [Validators.required]),

  });
  link: any = '';
  fb: any;
  des: any = ''

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private linkDocService: LinkDocService,
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
    })
  }

  returnHome() {
    this.router.navigate(['/users/all-link-doc']);
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
    let linkDoc: LinkDoc = this.setLinkDoc();
    console.log(linkDoc);
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        linkDoc.user = value;
        this.linkDocService.create(linkDoc).subscribe(() => {
          alert("Thêm mới đường dẫn tài liệu thành công!");
          this.returnHome();
        }, error => {
        })
      })
    });
  }

  private setLinkDoc() {
    let linkDoc: LinkDoc = {
      link: this.createLinkDocForm.get('link').value,
      description: this.createLinkDocForm.get('description').value,
      category: this.setCategoryForFormData(),
      des: this.createLinkDocForm.get('des').value + ' ' + this.createLinkDocForm.get('optional').value
    }
    if (linkDoc.category == undefined) {
      linkDoc.category = this.categories[this.categories.length - 1];
    }
    linkDoc.linkFile = this.link;
    if (linkDoc.link == '') {
      linkDoc.link = this.des;
    }
    return linkDoc;
  }

  openSelect(event) {
    if (event.target.value === 'Trong trường') {
      document.getElementById('truong').style.display = '';
    } else {
      document.getElementById('truong').style.display = 'none';
    }
  }

  choseInput(event) {
    if (event.target.value === 'pdf') {
      document.getElementById('pdf').style.display = '';
      document.getElementById('link').style.display = 'none';
    }
    if (event.target.value === 'Đường dẫn') {
      document.getElementById('link').style.display = '';
      document.getElementById('pdf').style.display = 'none';
    }
  }

  savePDF(value) {
    console.log(value)
    var n = Date.now();
    const file = value.target.files[0];
    this.des = file.name;
    let infoFile = file.name.split(".");
    if (infoFile[infoFile.length-1] == 'exe') {
      alert("Không thể upload file exe");
      this.myInputVariable.nativeElement.value = '';
    } else {
      const filePath = `RoomsImages/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`RoomsImages/${n}`, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.fb = fileRef.getDownloadURL();
            this.fb.subscribe(url => {
              if (url) {
                this.link = url;
              }
              console.log(this.link);
            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });
    }

  }
}
