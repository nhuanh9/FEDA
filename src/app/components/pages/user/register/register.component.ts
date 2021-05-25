import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = this.setNewUser();
    this.userService.register(user).subscribe(() => {
      alert('Đăng ký thành công');
      this.registerForm.reset();
      this.router.navigate(['/login']);
    }, err => {
      alert("Tài khoản đã được đăng ký!");
    });
    console.log(user);
  }

  private setNewUser() {
    const user: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phoneNumber: "1"
    };
    return user;
  }
}
