import { Component, OnInit } from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";

@Component({
  selector: 'app-all-link-doc',
  templateUrl: './all-link-doc.component.html',
  styleUrls: ['./all-link-doc.component.scss']
})
export class AllLinkDocComponent implements OnInit {
  linkDocs: LinkDoc[] = [{link:'',category: {name: ''}, createAt:'', description:'', user: {usename: ''}, likes: ''}];
  constructor(private linkDocService: LinkDocService,) { }

  ngOnInit() {
    this.linkDocService.getAll().subscribe(res=> {
      this.linkDocs = res;
    })
    setInterval(() => {
      this.linkDocService.getAll().subscribe(res=> {
        this.linkDocs = res;
      })
    }, 2000);
  }

}
