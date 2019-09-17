import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileService } from '../file.service';
import { Subscription } from 'rxjs';
import { File } from '../file.model';
@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  updateForm: FormGroup;
  id: string;
  files: File[];
  fileSub: Subscription;

  constructor(
    private fileService: FileService) { }

  ngOnInit() {

    // Getting all Questions to the List
    this.fileService.getFiles();
    this.fileSub = this.fileService
      .getFileUpdateListner()
      .subscribe(files => {
        this.files = files;
        // console.log(this.files);
      });
  }

  onDelete(id) {
    this.fileService.deleteFile(id);

    this.fileService.getFiles();
    this.fileSub = this.fileService
      .getFileUpdateListner()
      .subscribe(files => {
        this.files = files;
      });
  }

}
