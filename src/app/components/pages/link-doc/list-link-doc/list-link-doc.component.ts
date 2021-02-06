import {Component, OnInit} from '@angular/core';
import {LinkDoc} from "../../../../models/link-doc";
import {LinkDocService} from "../../../../services/link-doc.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-list-link-doc',
  templateUrl: './list-link-doc.component.html',
  styleUrls: ['./list-link-doc.component.scss']
})
export class ListLinkDocComponent implements OnInit {
  linkDocs: LinkDoc[];

  constructor(private linkDocService: LinkDocService,
              private activateRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      console.log(id);
      this.linkDocService.getAllByCategoryId(id).subscribe(data => {
        console.log(data);
        this.linkDocs = data;
      }, error => {
        console.log(error);
      })
    });
  }

}
