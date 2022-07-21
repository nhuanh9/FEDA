import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './components/pages/register/register.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NavbarComponent } from './components/blocks/navbar/navbar.component';
import { UserPageComponent } from './components/pages/users/user-page/user-page.component';
import { ListBlogComponent } from './components/blocks/list-blog/list-blog.component';
import { UserBlogComponent } from './components/pages/users/user-blog/user-blog.component';
import { AllBlogComponent } from './components/pages/users/all-blog/all-blog.component';
import { AddBlogComponent } from './components/pages/users/add-blog/add-blog.component';
import { EditBlogComponent } from './components/pages/users/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    NavbarComponent,
    UserPageComponent,
    ListBlogComponent,
    UserBlogComponent,
    AllBlogComponent,
    AddBlogComponent,
    EditBlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
