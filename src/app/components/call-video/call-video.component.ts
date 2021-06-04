import {Component, OnInit} from '@angular/core';
import {CometChat} from "@cometchat-pro/chat/CometChat";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-call-video',
  templateUrl: './call-video.component.html',
  styleUrls: ['./call-video.component.scss']
})
export class CallVideoComponent implements OnInit {
  uid: any = '';

  constructor(
    private activateRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      this.uid = paraMap.get('uid');
      console.log(this.uid)
      this.setCommetChat();
    });
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
        this.loginCometChat();
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
      }
    );
  }

  loginCometChat() {
    const authKey = "f51cb914320b1239d05b6d32ea22727de7e9a558";
    const uid = this.uid;

    CometChat.login(uid, authKey).then(
      (user) => {
        console.log("Login Successful:", {user});
      },
      (error) => {
        console.log("Login failed with exception:", {error});
      }
    );
  }

}
