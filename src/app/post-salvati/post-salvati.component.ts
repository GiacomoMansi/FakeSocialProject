import { Component, OnInit } from '@angular/core';
import {SearchComponent} from '../search/search.component';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-post-salvati',
  templateUrl: './post-salvati.component.html',
  styleUrls: ['./post-salvati.component.scss']
})
export class PostSalvatiComponent implements OnInit {
  public like: any = false
  public comment: any = ""
  public posts: any = []
  public query: any = "";
  public savedPosts: any = []

  constructor(public _searchComponent: SearchComponent, public _httpClient: HttpClient) {
  }
 async ngOnInit() {
    this.savedPosts = this._searchComponent.like
    console.log(this.savedPosts)
  }

  async getPost() {
    this.posts = await this._httpClient.get("https://jsonplaceholder.typicode.com/comments").toPromise()
    this.posts.forEach((post: object) => {
      Object.assign(post, {comment: []})
    })
  }

  public reverse: boolean = true;
  sort() {
    this.savedPosts.sort((a: any, b: any) => {
      if(this.reverse) {

        return a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? 1 : (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase() ? -1 : 0)
      }
      else {
        return a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? -1 : (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase() ? 1 : 0)
      }
    })
    return this.reverse = !this.reverse
  }

  searchEmail(term: string) {
    if (this.query == '') return this.getPost();
    return this.savedPosts = this.savedPosts.filter((item: any) => item.name.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()));
  }

  likePost(i: any) {
    if(this.savedPosts[i].id) {
      Object.assign(this.savedPosts[i], {like: true})
    }
    console.log("index", i)
  }

  removeLike(i: any) {
    if(this.savedPosts[i].like) {
      Object.assign(this.savedPosts[i], {like: null})
    }
  }
  removePost(id: any) {
    return this.savedPosts = this.savedPosts.filter((p:any) => p.id !== id)
  }

  addComment(id: any) {
    if(this.savedPosts[id].id) {
      this.savedPosts[id].comment.push(this.comment)
    }
    console.log(this.savedPosts)
    console.log(typeof this.savedPosts[id].comment)
  }
  /*removeComment(id: any) {
    return this.posts[id].comment[0] = ""
  }*/

  removeComment(indexPost: any, indexComment: any) {
    if(this.savedPosts[indexPost].comment.length > 0) {
      return this.savedPosts[indexPost].comment.splice(indexComment, 1)
    }
    return false
  }

}
