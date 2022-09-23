import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { PostSalvatiComponent } from './post-salvati/post-salvati.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PostSalvatiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
