import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {PostSalvatiComponent} from "./post-salvati/post-salvati.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'post-salvati', component: PostSalvatiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
