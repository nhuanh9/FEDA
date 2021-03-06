import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/pages/user/login/login.component";
import {RegisterComponent} from "./components/pages/user/register/register.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {AdminComponent} from "./components/admin/admin/admin.component";
import {ListLinkDocComponent} from "./components/pages/link-doc/list-link-doc/list-link-doc.component";
import {CallVideoComponent} from "./components/call-video/call-video.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    component: LayoutComponent,
    loadChildren: () => import('./module/layout.module').then(module => module.LayoutModule)
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./module/layout.module').then(module => module.LayoutModule)
  }, {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./module/admin.module').then(module => module.AdminModule)
  }, {
    path: 'call-video/:uid',
    component: CallVideoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
