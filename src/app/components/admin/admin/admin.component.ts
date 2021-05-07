import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,) {
  }

  ngOnInit() {
    this.checkRole();
  }

  checkRole() {
    if (localStorage.getItem("ROLE") !== "ROLE_ADMIN") {
      alert("Bạn không có quyền vào trang web này!");
      this.router.navigate(['/login']);
    }
  }

}
