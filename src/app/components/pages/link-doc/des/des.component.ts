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
    this.listCurrentUserLikePost = [{post: {category: {name: ''}}}];
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const des = paraMap.get('des');
      this.linkDocService.getAllByDes(des).subscribe(res => {
        console.log(res);
      })
      this.postService.getAllByDes(des).subscribe(res => {
        console.log(res);
      })
      // this.getAllPost(id);

    });
  }

}
