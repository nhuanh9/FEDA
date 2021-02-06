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

  constructor(private postService: PostService,
              private imageService: ImageService,
              private activateRoute: ActivatedRoute,
              private userService: UserService,
              private fb: FormBuilder,
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
    this.getPost();
    this.prepareFormComment();
  }

  getPost() {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      console.log(id);
      this.postService.get(id).subscribe(result => {
        this.post = result;
        console.log(result);
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


//
// deleteComment(id, commentId) {
//   this.postService.deleteComment(id, commentId).subscribe(() => {
//     alert("Đã xoá comment!");
//     this.getAllPost();
//   })
// }
}
