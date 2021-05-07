import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxLoadingModule} from "ngx-loading";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {HomeComponent} from "../components/home/home.component";
import {PostsComponent} from "../components/admin/posts/posts.component";
import {JwPaginationModule} from "jw-angular-pagination";
import {LayoutModule} from "./layout.module";
const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent
  },
]

@NgModule({
  declarations: [
    PostsComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxLoadingModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    LayoutModule,
  ]
})
export class AdminModule { }
