import {Component, OnInit} from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {PostService} from "../../../../services/post.service";
import {Post} from "../../../../models/post";
import {OrderSeminarService} from "../../../../services/order-seminar.service";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {User} from "../../../../models/user";
import {Subscription} from "rxjs";
import {LikePost} from "../../../../models/like-post";
import {PostLikeService} from "../../../../services/post-like.service";
import {CategoryService} from "../../../../services/category.service";
import {Category} from "../../../../models/category";

@Component({
  selector: 'app-list-link-doc',
  templateUrl: './list-link-doc.component.html',
  styleUrls: ['./list-link-doc.component.scss']
})
export class ListLinkDocComponent implements OnInit {
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
  id: any;

  constructor(private linkDocService: LinkDocService,
              private activateRoute: ActivatedRoute,
              private postService: PostService,
              private orderSeminarService: OrderSeminarService,
              private postLikeService: PostLikeService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.linkDocs = [{category: '', user: {}}]
    this.category = {name: ''}
    this.id = '';
    this.listCurrentUserLikePost = [{post: {category: {name: ''}}}];
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.id = id;
      this.categoryService.getById(id).subscribe(res => {
        this.category = res;
      })
      this.linkDocService.getAllByCategoryId(id).subscribe(data => {
        console.log(data);
        this.linkDocs = data;
      }, error => {
        console.log(error);
      })
      this.getAllPost(id);

    });
  }


  getAllPost(id) {
    this.listCurrentUserLikePost = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.postService.getAllByCategoryId(id).subscribe((resJson) => {
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
        this.getAllPost(this.id);
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
        this.getAllPost(this.id);
      }, error => {
        console.log(error);
      })
    });

  }
}
