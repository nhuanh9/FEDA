import { Component, OnInit } from '@angular/core';
import {Post} from "../../../models/post";
import {PostService} from "../../../services/post.service";
import {LinkDocService} from "../../../services/link-doc.service";

@Component({
  selector: 'app-linkdocs',
  templateUrl: './linkdocs.component.html',
  styleUrls: ['./linkdocs.component.scss']
})
export class LinkdocsComponent implements OnInit {

  items = [];
  pageOfItems: Array<any>;
  constructor(private linkDocService: LinkDocService) { }

  ngOnInit() {
    this.getAllPost();
    this.items = [{}];
  }

  getAllPost() {
    this.linkDocService.getAll().subscribe(res => {
      this.items = res;
    })
  }


  onChangePage(pageOfItems: Array<any>) {
    console.log(pageOfItems);
    this.pageOfItems = pageOfItems;
  }

  deletePost(id) {
    if (confirm("Bạn có chắc chắn muốn xoá đường dẫn này?")) {
      this.linkDocService.delete(id).subscribe(()=> {
        alert("Xoá thành công!");
        this.getAllPost();
      })
    }
  }
}
