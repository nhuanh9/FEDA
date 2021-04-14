import {Component, OnInit} from '@angular/core';
import {UserToken} from "../../../models/user-token";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  currentUser: UserToken;
  user: User;
  term: string = '';
  posts: Post[] = [{}];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private postService: PostService,
  ) {

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.user = {}
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        this.user = value;
        console.log(this.user);
      });
    });
    this.postService.getAll().subscribe(res => {
      this.posts = res;
    })
  }

}
