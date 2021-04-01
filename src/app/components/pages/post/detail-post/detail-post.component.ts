import {Component, OnInit} from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../../../../models/post";
import {Image} from "../../../../models/image";
import {PostService} from "../../../../services/post.service";
import {ImageService} from "../../../../services/image.service";
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {CommentForm} from "../../../../models/comment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CurrentUserLikePost} from "../../../../models/CurrentUserLikePost";
import {CurrentUserLikeComment} from "../../../../models/CurrentUserLikeComment";
import {CommentLikeService} from "../../../../services/comment-like.service";
import {LikeComment} from "../../../../models/like-comment";
import {LikePost} from "../../../../models/like-post";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  post: Post;
  imgs: Image[];
  user: User;
  comment: CommentForm;
  comments: CommentForm[];
  formGroup: FormGroup;
  allLike: LikeComment[];
  listCurrentUserLikeComment: CurrentUserLikeComment[];

  constructor(private postService: PostService,
              private imageService: ImageService,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
              private commentLikeService: CommentLikeService,
              private authenticationService: AuthenticationService) {
  }

  prepareFormComment() {
    // this.commentForm = this.fb.group({
    //   content: ['', [Validators.required]]
    // });
    this.formGroup = new FormGroup({
      content: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllComment();
    this.prepareFormComment();
  }

  getAllComment() {
    this.listCurrentUserLikeComment = [];
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      // console.log(id);
      this.postService.get(id).subscribe(result => {
        this.post = result;
        this.commentLikeService.getAll().subscribe(res => {
          this.allLike = res;
          for (let i = 0; i < this.post.listComment.length; i++) {
            let currLike: CurrentUserLikeComment = {
              user: this.user,
              comment: this.post.listComment[i],
            }
            for (let j = 0; j < this.allLike.length; j++) {
              if (this.allLike[j].user.id == this.user.id
                && this.allLike[j].comment.id == this.post.listComment[i].id
                && this.allLike[j].liked)
                currLike.is_liked = true;
            }
            this.listCurrentUserLikeComment.push(currLike);
          }
          console.log("C")
          console.log(this.listCurrentUserLikeComment);
        })
        this.imageService.getAllByPostId(this.post.id).subscribe(result => {
          this.imgs = result;
          console.log(this.imgs);
        })
      })
    });
  }

  addComment(id) {
    alert("hello")
    this.user = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getUserProfile(this.user.id).subscribe(value => {
      this.user = value;
      this.comment = {
        content: this.formGroup.get('content').value,
        user: value,
      };
      this.postService.addComment(id, this.comment).subscribe(
        () => {
          alert("Thêm thành công!")
          this.getPost();
          this.prepareFormComment();
        }
      )
    });

  }

  likeCmt(value?: any) {
    let like: LikeComment = {
      user: this.user,
      comment: value,
    }
    console.log(like);
    this.commentLikeService.like(like).subscribe(() => {
      this.getAllComment();
    }, error => {
      console.log(error);
    })

  }

  unlikeCmt(value?: any) {
    let like: LikeComment = {
      user: this.user,
      comment: value,
    }

    console.log(like);
    this.commentLikeService.unlike(like).subscribe(() => {
      this.getAllComment();
    }, error => {
      console.log(error);
    })

  }

//
// deleteComment(id, commentId) {
//   this.postService.deleteComment(id, commentId).subscribe(() => {
//     alert("Đã xoá comment!");
//     this.getAllPost();
//   })
// }
}
