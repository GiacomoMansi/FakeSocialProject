import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from "@angular/router";
import {observable} from "rxjs";
import {PostServiceService} from "../services/post-service.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
@Injectable({
  providedIn: 'root',
})
export class SearchComponent implements OnInit {
  public posts: any = []
  public postLocal: any = []
  public query: any = "";
  public savedPost: any = []
  public isPostSaved: boolean = false
  public like: any = false
  public comment: any = ""
  public isRemoved: any = false

  constructor(public _httpClient: HttpClient, public _postService: PostServiceService) {
  }

  async ngOnInit() {
    await this.getPost()
    console.log(this.posts)
    console.log(this.query)
  }

  async getPost() {
    this.posts = await this._postService.getPost()
  }


/*  SEZIONE POST PREFERITI*/
  removeCommentSave(indexPost: any, indexComment: any) {
    if(this.savedPost[indexPost].comment.length > 0) {
      return this.savedPost[indexPost].comment.splice(indexComment, 1)
    }
    return false
  }

  public reverseSave: boolean = true;
  sortSave() {
    this.savedPost.sort((a: any, b: any) => {
      if(this.reverseSave) {

        return a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? 1 : (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase() ? -1 : 0)
      }
      else {
        return a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? -1 : (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase() ? 1 : 0)
      }
    })
    return this.reverseSave = !this.reverseSave
  }

  searchEmailSave(term: string) {
    return this.savedPost = this.savedPost.filter((item: any) => item.name.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()));
  }

  likePostSave(i: any) {
    if(this.savedPost[i].id) {
      Object.assign(this.savedPost[i], {like: true})
    }
    console.log("index", i)
  }

  removeLikeSave(i: any) {
    if(this.savedPost[i].like) {
      Object.assign(this.savedPost[i], {like: null})
    }
  }
  removePostSave(id: any) {
    return this.savedPost = this.savedPost.filter((p:any) => p.id !== id)
  }

  addCommentSave(id: any) {
    if(this.savedPost[id].id) {
      this.savedPost[id].comment.push(this.comment)
    }
    console.log(this.savedPost)
  }

  deleteSavePost(id: any) {
    if(this.savedPost[id])
    return this.savedPost = this.savedPost.filter((p:any) => p.id !== id)
  }

  getSavePost() {
    console.log(this.isPostSaved)
    this.isPostSaved = true
    console.log(this.isPostSaved)
  }

  putAnimation() {
   if(!this.isRemoved) {
     this.isRemoved = true
   }
   if(this.isRemoved) {
     this.isRemoved = false
   }
  }

  refreshPage() {
    location.reload();
  }
}
