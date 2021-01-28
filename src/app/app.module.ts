import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './components/pages/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {LayoutModule} from "./module/layout.module";
import { NewPostComponent } from './components/pages/new-post/new-post.component';
import { ListPostComponent } from './components/pages/list-post/list-post.component';
import { ListLinkDocComponent } from './components/pages/list-link-doc/list-link-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
