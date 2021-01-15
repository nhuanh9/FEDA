import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "../components/layout/layout.component";
import {SidebarComponent} from "../components/blocks/sidebar/sidebar.component";
import {TopbarComponent} from "../components/blocks/topbar/topbar.component";
import {FooterComponent} from "../components/blocks/footer/footer.component";
import {LinkTaiLieuComponent} from "../components/blocks/link-tai-lieu/link-tai-lieu.component";
import {HomeComponent} from "../components/home/home.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    LinkTaiLieuComponent,
    HomeComponent
  ],
  exports: [
    TopbarComponent,
    LinkTaiLieuComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LayoutModule { }
