import {Component, OnInit} from '@angular/core';
import {UserToken} from "../../../models/user-token";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  currentUser: UserToken;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      console.log(this.currentUser);
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }
}
