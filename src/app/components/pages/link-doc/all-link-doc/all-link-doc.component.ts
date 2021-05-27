import {Component, OnInit} from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-all-link-doc',
  templateUrl: './all-link-doc.component.html',
  styleUrls: ['./all-link-doc.component.scss']
})
export class AllLinkDocComponent implements OnInit {
  currentUser: User = {status: '1'};
  linkDocs: LinkDoc[] = [{
    link: '',
    category: {name: ''},
    createAt: '',
    description: '',
    user: {usename: ''},
    likes: ''
  }];

  constructor(private linkDocService: LinkDocService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.linkDocService.getAll().subscribe(res => {
      this.linkDocs = res.reverse();
    })
    // setInterval(() => {
    //   this.linkDocService.getAll().subscribe(res => {
    //     this.linkDocs = res.reverse();
    //   })
    // }, 2000);
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe(x => {
      this.userService.getUserProfile(x.id).subscribe(value => {
        this.currentUser = value;
        console.log(this.currentUser)
      })
    })
  }

  isITUTC(status, linkDoc) {
    if (status == '2' && linkDoc.des.split(' ')[0] === 'Trong') {
      return true;
    }
    return false;
  }
  isTrongTruong(linkDoc) {
    if (linkDoc.des.split(' ')[0] === 'Trong') {
      return true;
    }
    return false;
  }
  isLink(linkDoc) {
    if (linkDoc.linkFile == '' || linkDoc.linkFile == null) {
      return true;
    }
    return false
  }
}
