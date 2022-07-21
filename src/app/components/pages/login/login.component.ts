import {Component, OnInit} from '@angular/core';
import {first} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  returnUrl: string;
  adminUrl: string;
  error = '';
  loading = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
    console.log(this.authenticationService.currentUserValue);
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.returnUrl = '/users';
    this.adminUrl = '/admin'
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          localStorage.setItem('ID', data.id);
          if (data.roles[0].authority == "ROLE_ADMIN") {
            this.router.navigate([this.adminUrl])
          } else {
            this.router.navigate([this.returnUrl]);
          }

        },
        error => {
          alert("Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!");
          this.loading = false;
        });
  }

}
