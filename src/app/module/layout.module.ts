import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../components/layout/layout.component";
import {SidebarComponent} from "../components/blocks/sidebar/sidebar.component";
import {TopbarComponent} from "../components/blocks/topbar/topbar.component";
import {FooterComponent} from "../components/blocks/footer/footer.component";
import {LinkTaiLieuComponent} from "../components/blocks/link-tai-lieu/link-tai-lieu.component";
import {HomeComponent} from "../components/home/home.component";
import {NewPasswordComponent} from "../components/pages/new-password/new-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NewPostComponent} from "../components/pages/new-post/new-post.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
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
    NewPostComponent
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
