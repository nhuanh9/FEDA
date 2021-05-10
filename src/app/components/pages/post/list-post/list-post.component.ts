import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../models/post";
import {PostService} from "../../../../services/post.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user";
import {from, Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {HttpClient} from "@angular/common/http";
// import {AngularFireDatabase} from "@angular/fire/database";
import {PostLikeService} from "../../../../services/post-like.service";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {
  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  sub: Subscription;
  listLikePost: LikePost[] = [{}, {}];
  allLike: LikePost[];
  items = [];
  pageOfItems: Array<any>;
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
    this.items = [{post: {content: 'a', user: {username: ''}, category: {id: ''}, listComment: []}}];
    setInterval(() => {
      this.getAllPost();
    }, 2000);
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  getAllPost() {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.postService.getAll().subscribe((resJson) => {
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
        this.items = this.listCurrentUserLikePost;
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
