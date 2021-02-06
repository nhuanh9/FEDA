import {Component, OnInit} from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../../../../models/post";
import {Image} from "../../../../models/image";
import {PostService} from "../../../../services/post.service";
import {ImageService} from "../../../../services/image.service";

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {

  post: Post;
  imgs: Image[];

  constructor(private postService: PostService,
              private imageService: ImageService,
              private activateRoute: ActivatedRoute,) {
  }

  ngOnInit() {
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
}
