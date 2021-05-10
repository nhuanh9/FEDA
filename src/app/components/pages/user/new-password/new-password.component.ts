import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {UserToken} from "../../../../models/user-token";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  currentUser: User;
  sub: Subscription;
  currentUserToken: UserToken;
  newPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authService: AuthenticationService) {

  }

  ngOnInit() {
  }


  changePassword() {
    const user = this.setNewUser();
    this.authService.currentUser.subscribe(
      currentUser => {
        this.userService.updatePassword(currentUser.username, user).subscribe(() => {
          alert('Đổi mật khẩu thành công');
          this.newPasswordForm.reset();
          this.router.navigate(['/users/home']);
        }, err => {
        });
      }
    );
  }

  private setNewUser() {
    const user: User = {
      username:'',
      password: this.newPasswordForm.value.password,
      confirmPassword: this.newPasswordForm.value.confirmPassword,
      name: '',
      email: '',
      phoneNumber: '',
    };
    return user;
  }
}
