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
import {ReactiveFormsModule} from "@angular/forms";
import {NewPostComponent} from "../components/pages/post/new-post/new-post.component";
import {ListPostComponent} from "../components/pages/post/list-post/list-post.component";
import {ListLinkDocComponent} from "../components/pages/link-doc/list-link-doc/list-link-doc.component";
import {AddLinkDocComponent} from "../components/pages/link-doc/add-link-doc/add-link-doc.component";
import {DetailPostComponent} from "../components/pages/post/detail-post/detail-post.component";
import {ListOrderComponent} from "../components/pages/order-seminar/list-order/list-order.component";
import {AddOrderComponent} from "../components/pages/order-seminar/add-order/add-order.component";

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
  ],
  exports: [
    TopbarComponent,
    LinkTaiLieuComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class LayoutModule {
}
