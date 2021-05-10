import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../components/layout/layout.component";
import {SidebarComponent} from "../components/blocks/sidebar/sidebar.component";
import {TopbarComponent} from "../components/blocks/topbar/topbar.component";
import {FooterComponent} from "../components/blocks/footer/footer.component";
import {LinkTaiLieuComponent} from "../components/blocks/link-tai-lieu/link-tai-lieu.component";
import {HomeComponent} from "../components/home/home.component";
import {NewPasswordComponent} from "../components/pages/user/new-password/new-password.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewPostComponent} from "../components/pages/post/new-post/new-post.component";
import {ListPostComponent} from "../components/pages/post/list-post/list-post.component";
import {ListLinkDocComponent} from "../components/pages/link-doc/list-link-doc/list-link-doc.component";
import {AddLinkDocComponent} from "../components/pages/link-doc/add-link-doc/add-link-doc.component";
import {DetailPostComponent} from "../components/pages/post/detail-post/detail-post.component";
import {ListOrderComponent} from "../components/pages/order-seminar/list-order/list-order.component";
import {AddOrderComponent} from "../components/pages/order-seminar/add-order/add-order.component";
import {UpdateProfileComponent} from "../components/pages/user/update-profile/update-profile.component";
import {UserPostsComponent} from "../components/pages/user/user-posts/user-posts.component";
import {NgxLoadingModule} from "ngx-loading";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {JwPaginationComponent, JwPaginationModule} from "jw-angular-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {CategoriesComponent} from "../components/blocks/categories/categories.component";
import {TopPostsComponent} from "../components/blocks/top-posts/top-posts.component";
import {DesComponent} from "../components/pages/link-doc/des/des.component";
import {TopsComponent} from "../components/blocks/tops/tops.component";
import {UserInfoComponent} from "../components/pages/user/user-info/user-info.component";
import {ListPostLikesComponent} from "../components/pages/post/list-post-likes/list-post-likes.component";
import {AllLinkDocComponent} from "../components/pages/link-doc/all-link-doc/all-link-doc.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: '',
    component: HomeComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'list-post',
    component: ListPostComponent
  },
  {
    path: 'link-docs/:id',
    component: ListLinkDocComponent
  }, {
    path: 'link-docs/:id',
    component: ListLinkDocComponent
  },
  {
    path: 'posts/:id',
    component: DetailPostComponent
  }, {
    path: 'new-link-document',
    component: AddLinkDocComponent
  }, {
    path: 'new-order',
    component: AddOrderComponent
  }, {
    path: 'list-order',
    component: ListOrderComponent
  }, {
    path: 'profile',
    component: UpdateProfileComponent,
  },
  {
    path: 'my-posts',
    component: UserPostsComponent,
  }, {
    path: 'des/:des',
    component: DesComponent
  }, {
    path: 'user-info/:id',
    component: UserInfoComponent
  }, {
    path: 'order-by-likes',
    component: ListPostLikesComponent
  }, {
    path: 'all-link-doc',
    component: AllLinkDocComponent
  }
];

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    LinkTaiLieuComponent,
    HomeComponent,
    NewPasswordComponent,
    NewPostComponent,
    ListPostComponent,
    ListLinkDocComponent,
    AddLinkDocComponent,
    DetailPostComponent,
    ListOrderComponent,
    AddOrderComponent,
    UpdateProfileComponent,
    UserPostsComponent,
    // JwPaginationComponent,
    CategoriesComponent,
    TopPostsComponent,
    DesComponent,
    TopsComponent,
    UserInfoComponent,
    ListPostLikesComponent,
    AllLinkDocComponent,
  ],
  exports: [
    TopbarComponent,
    LinkTaiLieuComponent,
    SidebarComponent,
    FooterComponent,
    TopsComponent,
    // JwPaginationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxLoadingModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    JwPaginationModule
  ]
})
export class LayoutModule {
}
