import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  posts: Post[] = [];
  form: FormGroup;
  public postId: string;
  public postSub: Subscription;
  id: string;

  constructor(public route: ActivatedRoute, private fb: FormBuilder, private postService: PostService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  createPost(title, body) {
    this.postService.addPost(this.id, title, body);
    this.resetForm();
  }


  resetForm() {
    this.form = this.fb.group({
      title: '',
      body: ''
    });
  }

  ngOnInit() {
    this.getPosts();
  }

  deletePost(id) {
    this.postService.deletePost(id);
    // Retrieving list or refresh list
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  getPosts() {
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
}
