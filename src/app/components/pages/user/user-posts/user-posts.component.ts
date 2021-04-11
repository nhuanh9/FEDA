import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../models/post";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {HttpClient} from "@angular/common/http";
import {PostLikeService} from "../../../../services/post-like.service";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {PostService} from "../../../../services/post.service";
// import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  sub: Subscription;
  listLikePost: LikePost[] = [{}, {}];

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
    this.listLikePost = [{user: {name: 'a'}}, {user: {name: 'a'}}];
  }

  getAllPost() {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.getUserPosts(this.user.id).subscribe((resJson) => {
      this.listPost = resJson;
      console.log(resJson)
      this.listPost.reverse();

    }, error => {
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

  showListUsersLikePost(id) {
    this.postService.getAllLikeById(id).subscribe(value => {
      this.listLikePost = value;
    })
    // $('#myModalUsersLike' + id).modal('show');

  }

  showUpdatePost = (id) => {
    // $('#myModal' + id).modal('show');
    console.log($('#myModal' + id)[0].style);
  }

  updatePostAndImg(idPost, idImg) {

    // $('#myModal' + this.post.id).modal('hide');

  }

  updatePost(id) {
    let newpost = {
      id: id,
      // content: $('#editContent' + id).val()
    }
    this.userService.updatePost(this.user.id, newpost).subscribe(() => {
      this.getAllPost();
    }, error => {
    })
    // $('#myModal' + id).modal('hide');
  }


  deletePost(id) {
    this.userService.deletePost(this.user.id, id).subscribe(() => {
      this.getAllPost();
    }, error => {
    })
    // $('#myModal' + id).modal('hide');
  }
}
