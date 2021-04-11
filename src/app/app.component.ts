import { Component } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {PostService} from "./services/post.service";
import {LikePost} from "./models/like-post";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FEDA';
  listLikePost: LikePost[];
  constructor(private modalService: NgbModal,
              private postService: PostService) {}

  open(content, id) {
    this.postService.getAllLikeById(id).subscribe(value => {
      this.listLikePost = value;
      console.log(this.listLikePost);
    })
    this.modalService.open(content);
  }
}
