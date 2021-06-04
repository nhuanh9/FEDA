import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../../models/user";
import {ItutcService} from "../../../../services/itutc.service";
import {CometChat} from "@cometchat-pro/chat/CometChat";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  itutcs: any[];
  msv: any;
  authKey = "f51cb914320b1239d05b6d32ea22727de7e9a558";
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
    this.setCommetChat();
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
      this.userService.register(user).subscribe(() => {
        alert('Đăng ký thành công');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      }, err => {
        alert("Tài khoản đã được đăng ký!");
      });
      console.log(user);
    })
    const userc = new CometChat.User(user.username);
    userc.setName(user.name);
    console.log(user)
    CometChat.createUser(userc, this.authKey).then(
      user => {
        console.log("user created", user);
      },error => {
        console.log("error", error);
      }
    )

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
  setCommetChat() {
    const appID = "343009d4d365f12";
    const region = "EU";
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    console.log(appSetting)
    CometChat.init(appID, appSetting).then(
      () => {
        console.log("Initialization completed successfully");
        // You can now call login function.
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }
}
