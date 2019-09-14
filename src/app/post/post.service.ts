import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })

export class PostService {

  private posts: Post[] = [];
  private postUpdate = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  //Getting all posts
  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.reverse().map(post => {
          return {
            id: post._id,
            title: post.title,
            body: post.body
          };
        });
      }))
      .subscribe((transformedPosts) => {
        // console.log(transformedPosts);
        this.posts = transformedPosts;
        this.postUpdate.next([...this.posts]);
      });
  }


  getPostUpdateListner() {
    return this.postUpdate.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string,
      title: string,
      body: string
    }>('http://localhost:3000/api/posts/' + id);
  }

  //Creating a post
  addPost(id: string, title: string, body: string) {
    const postData: Post = {
      id: id,
      title: title,
      body: body
    };
    this.posts.push(postData);
    this.postUpdate.next([...this.posts]);
    return this.http.post<{ message: string, post: Post }>
      ('http://localhost:3000/api/posts', postData)
      .subscribe(result => {
      });
  }

  updatePost(id: string, title: string, body: string) {
    const postData = {
      id: id,
      title: title,
      body: body
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
      .subscribe(result => {
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe((result) => {
      console.log(result);
    });
  }
}
