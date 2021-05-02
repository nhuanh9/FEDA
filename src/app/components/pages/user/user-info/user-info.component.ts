import {Component, OnInit} from '@angular/core';
import {UserToken} from "../../../../models/user-token";
import {User} from "../../../../models/user";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {LinkDoc} from "../../../../models/link-doc";
import {Post} from "../../../../models/post";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  currentUser: UserToken;
  user: User = {};
  updateForm: FormGroup;
  arrayPicture: any;
  fb: any;
  linkDocs: LinkDoc[] = [{}];
  posts: Post[] = [{}];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private storage: AngularFireStorage,
              private activateRoute: ActivatedRoute,) {
  }

  ngOnInit() {

    this.getUser();
  }


  getUser() {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.userService.getUserProfile(id).subscribe(value => {
        this.user = value;
        console.log(this.user);
      });
      this.userService.getUserPosts(id).subscribe(res => {
        this.posts = res;
      })

      this.userService.getUserLinkdocs(id).subscribe(res => {
        this.linkDocs = res;
      })
    });
  }
}
