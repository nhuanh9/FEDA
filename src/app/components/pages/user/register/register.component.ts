import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";
import {ItutcService} from "../../../../services/itutc.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  itutcs: any[];
  msv: any;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    msv: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService,
              private router: Router,
              private itutcService: ItutcService) {
  }

  ngOnInit() {

  }

  register() {
    const user = this.setNewUser();
    this.itutcService.getAll().subscribe(res=>{
      this.itutcs = res;
      for (let i=0; i<this.itutcs.length; i++) {
        if (this.itutcs[i].msv === user.status){
          user.status = '2';
        }
      }
      console.log(user.status);
    })

    // this.userService.register(user).subscribe(() => {
    //   alert('Đăng ký thành công');
    //   this.registerForm.reset();
    //   this.router.navigate(['/login']);
    // }, err => {
    //   alert("Tài khoản đã được đăng ký!");
    // });
    // console.log(user);
  }

  private setNewUser() {
    const user: User = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      phoneNumber: "1",
      status: this.registerForm.value.msv
    };
    return user;
  }

  openSelect(event) {
    if (event.target.checked == true) {
      document.getElementById('truong').style.display = '';
    } else {
      document.getElementById('truong').style.display = 'none';
    }
  }
}
