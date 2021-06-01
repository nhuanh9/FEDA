import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserToken} from "../../../../models/user-token";
import {User} from "../../../../models/user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import firebase from "firebase";
import {finalize} from "rxjs/operators";
import {Image} from "../../../../models/image";
import {AngularFireStorage} from "@angular/fire/storage";
import {NgxLoadingComponent, ngxLoadingAnimationTypes} from "ngx-loading";
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  @ViewChild('ngxLoading', {static: false}) ngxLoadingComponent: NgxLoadingComponent;
  @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public loadingTemplate: TemplateRef<any>;
  currentUser: UserToken;
  user: User;
  updateForm: FormGroup;
  arrayPicture: any;
  fb: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private storage: AngularFireStorage
  ) {

  }

  ngOnInit(): void {
    this.user = {

    }
    this.prepareForm();
    this.getUser();
  }

  prepareForm() {
    this.updateForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    })
  }

  getUser() {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        this.user = value;
        console.log(this.user);
        this.updateForm = new FormGroup({
          name: new FormControl(this.user.name),
          email: new FormControl(this.user.email),
          phoneNumber: new FormControl(this.user.phoneNumber),
        })
      });
    });
  }

  setInfo() {
    let newUser: User = {
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      confirmPassword: this.user.confirmPassword,
      name: this.updateForm.get('name').value,
      email: this.updateForm.get('email').value,
      phoneNumber: this.updateForm.get('phoneNumber').value,
      imageUrls: this.user.imageUrls
    }
    return newUser;
  }

  update() {
    let userNewInfo = this.setInfo();
    this.userService.updateUserProfile(this.user.id, userNewInfo).subscribe(() => {
      alert("Cập nhật thành công!");
    }, error => {
      console.log(error);
    })
  }


  saveImg(value) {
    this.loading = true;
    var n = Date.now();
    const file = value.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.arrayPicture = fileRef.getDownloadURL();
          this.arrayPicture.subscribe(url => {
            if (url) {
              this.user.imageUrls = url;
            }
            console.log(this.user.imageUrls);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    setInterval(() => this.loading = false, 5000);
  }
}
