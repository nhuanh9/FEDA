import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/blocks/sidebar/sidebar.component';
import { TopbarComponent } from './components/blocks/topbar/topbar.component';
import { FooterComponent } from './components/blocks/footer/footer.component';
import { LinkTaiLieuComponent } from './components/blocks/link-tai-lieu/link-tai-lieu.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    LinkTaiLieuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
