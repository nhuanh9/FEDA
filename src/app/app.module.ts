import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/pages/user/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './components/pages/user/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {LayoutModule} from "./module/layout.module";
import {NewPostComponent} from './components/pages/post/new-post/new-post.component';
import {ListPostComponent} from './components/pages/post/list-post/list-post.component';
import {ListLinkDocComponent} from './components/pages/link-doc/list-link-doc/list-link-doc.component';
import {AddLinkDocComponent} from './components/pages/link-doc/add-link-doc/add-link-doc.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {DetailPostComponent} from './components/pages/post/detail-post/detail-post.component';
import {ListOrderComponent} from './components/pages/order-seminar/list-order/list-order.component';
import {AddOrderComponent} from './components/pages/order-seminar/add-order/add-order.component';
import {UpdateProfileComponent} from './components/pages/user/update-profile/update-profile.component';
import {UserPostsComponent} from './components/pages/user/user-posts/user-posts.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxLoadingModule} from "ngx-loading";
import {JwPaginationComponent} from "jw-angular-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { CategoriesComponent } from './components/blocks/categories/categories.component';
import { TopPostsComponent } from './components/blocks/top-posts/top-posts.component';
import { DesComponent } from './components/pages/link-doc/des/des.component';
import { TopsComponent } from './components/blocks/tops/tops.component';
import { UserInfoComponent } from './components/pages/user/user-info/user-info.component';
import { ListPostLikesComponent } from './components/pages/post/list-post-likes/list-post-likes.component';
import { AllLinkDocComponent } from './components/pages/link-doc/all-link-doc/all-link-doc.component';
import { AdminComponent } from './components/admin/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    NgbModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    NgxLoadingModule.forRoot({}),
    Ng2SearchPipeModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
