import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  public posts: any = []
  public savedPost: any = []
  public comment: any = ""

  constructor(public _httpClient: HttpClient) {

  }
  async getPost() {
    if(!localStorage.getItem("this.posts")) {
      this.posts = await this._httpClient.get("https://jsonplaceholder.typicode.com/comments").toPromise()
      this.posts.forEach((post: object) => {
        Object.assign(post, {comment: []})
      })
      return localStorage.setItem("this.posts", JSON.stringify(this.posts))
    }
    return this.posts = JSON.parse(<any>localStorage.getItem("this.posts"))
  }

  removePost(id: any) {
    localStorage.setItem("this.posts", JSON.stringify(this.posts.filter((p:any) => p.id !== id)))
    return this.posts = JSON.parse(<any>localStorage.getItem("this.posts"))
  }
  likePost(i: any) {
    if(this.posts[i].id) {
      Object.assign(this.posts[i], {like: true})
    }
    console.log("index", i)
  }
  removeLike(i: any) {
    if(this.posts[i].like) {
      Object.assign(this.posts[i], {like: null})
    }
  }
  addComment(id: any) {
    if(this.posts[id].id) {
      this.posts[id].comment.push(this.comment)
    }
    console.log(this.posts)
    console.log(typeof this.posts[id].comment)
  }

  removeComment(indexPost: any, indexComment: any) {
    if(this.posts[indexPost].comment.length > 0) {
      return this.posts[indexPost].comment.splice(indexComment, 1)
    }
    return false
  }
  savePost(indexPost: any, ) {
    if(this.posts[indexPost] && this.savedPost[indexPost] !== this.posts[indexPost]) {
      this.savedPost.push(this.posts[indexPost])
      console.log(this.savedPost)
      //Controllo i duplicati
      this.savedPost = this.savedPost.filter((value: any, index: any) => {
        return this.savedPost.indexOf(value) === index;
      });
      return console.log("Post aggiunto")
    }
    return console.log("post inesistente")
  }
  public reverse: boolean = true;
  sort() {
    this.posts.sort((a: any, b: any) => {
      if(this.reverse) {

        return a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? 1 : (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase() ? -1 : 0)
      }
      else {
        return a.email.toLocaleLowerCase() > b.email.toLocaleLowerCase() ? -1 : (a.email.toLocaleLowerCase() < b.email.toLocaleLowerCase() ? 1 : 0)
      }
    })
    return this.reverse = !this.reverse
  }
  searchEmail(query: string) {
    if (query == '') return this.getPost();
    return this.posts = this.posts.filter((item: any) => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  }
}
