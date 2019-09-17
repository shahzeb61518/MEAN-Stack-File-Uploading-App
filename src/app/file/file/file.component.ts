import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../file.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  form: FormGroup;
  formdata: FormGroup;
  imagePreview: string | ArrayBuffer;
  videoPreview: string | ArrayBuffer;
  videoSize: number = null;
  setMatProgressBar: HTMLElement;

  constructor(
    public fileService: FileService,
    public route: ActivatedRoute,
    private router: Router) { }

  onSubmitFile() {
    if (this.form.invalid) {
      return;
    }
    this.fileService.saveFile(
      this.form.value.image,
      this.form.value.video);
      this.form.reset();
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


  // video uploding functionality
  onVideoPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ video: file });
    this.form.get('video').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.videoPreview = reader.result;
      this.videoSize = null;
    };
    reader.readAsDataURL(file);
    this.videoSize = file.size;

  }



  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null),
      video: new FormControl(null)
    });
  }

}
