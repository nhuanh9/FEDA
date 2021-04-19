import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {CurrentUserLikePost} from "../../../models/CurrentUserLikePost";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {LikePost} from "../../../models/like-post";
import {HttpClient} from "@angular/common/http";
import {PostLikeService} from "../../../services/post-like.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-top-posts',
  templateUrl: './top-posts.component.html',
  styleUrls: ['./top-posts.component.scss']
})
export class TopPostsComponent implements OnInit {

  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  sub: Subscription;
  listLikePost: LikePost[] = [{}, {}];
  allLike: LikePost[];
  term: string;
  constructor(private http: HttpClient,
              private postLikeService: PostLikeService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.getAllPost();
    this.listLikePost = [{user: {name: 'a'}}, {user: {name: 'a'}}];
  }


  getAllPost() {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.postService.getTop4().subscribe((resJson) => {
      this.listPost = resJson;
      this.listPost.reverse();
      this.postLikeService.getAll().subscribe(value => {
        this.allLike = value;
        for (let i = 0; i < this.listPost.length; i++) {
          let currPost: CurrentUserLikePost = {
            user: this.user,
            post: this.listPost[i],
          }
          for (let j = 0; j < this.allLike.length; j++) {
            if (this.allLike[j].user.id == this.user.id
              && this.allLike[j].postEntity.id == this.listPost[i].id
              && this.allLike[j].liked)
              currPost.is_liked = true;
          }
          this.listCurrentUserLikePost.push(currPost);
        }
      });
    });
  }

  likePost(id) {
    this.postService.get(id).subscribe(value => {
      let like: LikePost = {
        user: this.user,
        postEntity: value,
      }
      this.postLikeService.like(like).subscribe(() => {
        this.getAllPost();
      }, error => {
        console.log(error);
      })
    });

  }

  unlikePost(id) {
    this.postService.get(id).subscribe(value => {
      let like: LikePost = {
        user: this.user,
        postEntity: value,
      }
      this.postLikeService.unlike(like).subscribe(() => {
        this.getAllPost();
      }, error => {
        console.log(error);
      })
    });

  }

  showListUsersLikePost(content, id) {
    this.postService.getAllLikeById(id).subscribe(value => {
      this.listLikePost = value;
    })
    this.modalService.open(content, {centered: true});
  }

}
