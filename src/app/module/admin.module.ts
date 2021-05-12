import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxLoadingModule} from "ngx-loading";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {HomeComponent} from "../components/home/home.component";
import {PostsComponent} from "../components/admin/posts/posts.component";
import {JwPaginationModule} from "jw-angular-pagination";
import {LayoutModule} from "./layout.module";
import {LinkdocsComponent} from "../components/admin/linkdocs/linkdocs.component";
import {UsersComponent} from "../components/admin/users/users.component";
import {OrdersComponent} from "../components/admin/orders/orders.component";
import {NewPostComponent} from "../components/admin/new-post/new-post.component";
import {NewNotiComponent} from "../components/admin/new-noti/new-noti.component";
import {NgxEditorModule} from "ngx-editor";

const routes: Routes = [
  {
    path: 'posts',
    component: PostsComponent
  },{
    path: '',
    component: PostsComponent
  }, {
    path: 'linkdocs',
    component: LinkdocsComponent
  }, {
    path: 'users',
    component: UsersComponent
  },{
    path: 'order-seminars',
    component: OrdersComponent
  },{
    path: 'new-noti',
    component: NewNotiComponent
  },
]

@NgModule({
  declarations: [
    PostsComponent,
    LinkdocsComponent,
    UsersComponent,
    OrdersComponent,
    NewPostComponent,
    NewNotiComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgxLoadingModule,
        NgbModule,
        Ng2SearchPipeModule,
        FormsModule,
        LayoutModule,
        JwPaginationModule,
        NgxEditorModule
    ]
})
export class AdminModule {
}
