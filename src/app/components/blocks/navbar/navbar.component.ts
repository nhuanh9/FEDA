import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin = false;
  username = '';
  userId = '';

  constructor(private route: Router) {
  }

  ngOnInit() {
    this.isLogin = localStorage.getItem('ID') == null ? false : true;
    this.username = localStorage.getItem('USERNAME');
    this.userId = localStorage.getItem('ID');
  }

  logOut(){
    localStorage.clear();
    this.isLogin = false;
    this.route.navigate(['/']);
  }
}
