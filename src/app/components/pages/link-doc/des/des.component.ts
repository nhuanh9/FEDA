import {Component, OnInit} from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {Post} from "../../../../models/post";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {Category} from "../../../../models/category";
import {LinkDocService} from "../../../../services/link-doc.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PostService} from "../../../../services/post.service";
import {OrderSeminarService} from "../../../../services/order-seminar.service";
import {PostLikeService} from "../../../../services/post-like.service";
import {CategoryService} from "../../../../services/category.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-des',
  templateUrl: './des.component.html',
  styleUrls: ['./des.component.scss']
})
export class DesComponent implements OnInit {
  linkDocs: LinkDoc[];
  posts: Post[];
  listPost: Post[];
  listCurrentUserLikePost: CurrentUserLikePost[];
  post: Post;
  user: User;
  sub: Subscription;
  listLikePost: LikePost[] = [{}, {}];
  allLike: LikePost[];
  term: string;
  category: Category;
  des: string;
  caption: string = '';
  currentUser: User = {status: '1'};
  constructor(private linkDocService: LinkDocService,
              private activateRoute: ActivatedRoute,
              private postService: PostService,
              private orderSeminarService: OrderSeminarService,
              private postLikeService: PostLikeService,
              private categoryService: CategoryService,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.des = '';
    this.linkDocs = [{description: '', user: {}, category: {name: ''}}]
    this.listCurrentUserLikePost = [{post: {category: {name: ''}}}];
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      this.des = paraMap.get('des');
      this.caption = 'Tài liệu học trong trường kì ' + (+this.des % 2 == 0 ? 2 : 1) + ' năm ' + (Math.ceil(+this.des / 2))
      this.linkDocService.getAllByDes(this.des).subscribe(res => {
        this.linkDocs = res
      })
      this.getAllPost(this.des);

    });
    this.getCurrentUser()
  }

  getAllPost(des) {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.postService.getAllByDes(des).subscribe((resJson) => {
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
        this.getAllPost(this.des);
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
        this.getAllPost(this.des);
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
