import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../models/post";
import {PostService} from "../../../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {HttpClient} from "@angular/common/http";
// import {AngularFireDatabase} from "@angular/fire/database";
import {PostLikeService} from "../../../../services/post-like.service";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  // posts: Post[];
  // count = 0;
  //
  // constructor(private postService: PostService) {
  // }
  //
  // ngOnInit() {
  //   this.postService.getAll().subscribe(data => {
  //     console.log(data)
  //     this.posts = data;
  //   })
  // }
  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  statusPost: string;
  contentPost: string;
  arrayPicture = '';
  sub: Subscription;
  listLikePost: LikePost[];
  allLike: LikePost[];

  constructor(private http: HttpClient,
              // private db: AngularFireDatabase,
              private postLikeService: PostLikeService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
  ) {
  }

  ngOnInit() {
    this.getAllPost();
  }

  getAllPost() {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.postService.getAll().subscribe((resJson) => {
      this.listPost = resJson;
      this.listPost.reverse();
      this.postLikeService.getAll().subscribe(value => {
        this.allLike = value;
        console.log(value)
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

  getAllLikesByPostId(id) {
    this.postService.getAllLikeById(id).subscribe(value => {
      this.listLikePost = value;
      let str = 'Người dùng đã thích bài viết: \n';
      for (let j = 0; j < this.listLikePost.length; j++) {
        if (this.listLikePost[j].liked)
          str += this.listLikePost[j].user.username + '\n';
      }
      alert(str);
    })
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


}
