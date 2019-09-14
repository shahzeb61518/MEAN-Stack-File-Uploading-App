import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  post: any = {};
  form: FormGroup;
  public postId: string;
  public postSub: Subscription;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private postService: PostService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  updatePost(title, body) {
    let postId = this.route.snapshot.queryParamMap.get('id');
    this.postService.updatePost(postId, title, body);
  }


  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required] }),
      body: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.postId = paramMap.get('id');
        this.postService.getPost(this.postId)
          .subscribe(postData => {
            this.post = {
              id: postData._id,
              title: postData.title,
              body: postData.body,
            };
            this.form.setValue({
              title: this.post.title,
              body: this.post.body,
            });
          });
      } else {
        this.postId = null;
      }
    });
  }
}
