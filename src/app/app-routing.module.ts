import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/pages/login/login.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {UserPageComponent} from "./components/pages/users/user-page/user-page.component";
import {AllBlogComponent} from "./components/pages/users/all-blog/all-blog.component";
import {UserBlogComponent} from "./components/pages/users/user-blog/user-blog.component";
import {AddBlogComponent} from "./components/pages/users/add-blog/add-blog.component";
import {EditBlogComponent} from "./components/pages/users/edit-blog/edit-blog.component";


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
    path: '',
    component: HomePageComponent
  }, {
    path: 'users',
    component: UserPageComponent,
    children: [
      {
        path: '',
        component: AllBlogComponent
      },
      {
        path:'info/:id',
        component: UserBlogComponent
      },
      {
        path: 'add-blog',
        component: AddBlogComponent
      },
      {
        path: 'edit-blog/:id',
        component: EditBlogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
