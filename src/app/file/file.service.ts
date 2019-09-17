import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { File } from './file.model';

@Injectable({ providedIn: 'root' })

export class FileService {

  private files: File[] = [];
  private fileUpdate = new Subject<File[]>();

  constructor(private http: HttpClient, private router: Router) {

  }

  getFiles() {
    this.http.get<{ message: string, files: any }>('http://localhost:3000/api/files')
      .pipe(map((fileData) => {
        return fileData.files.map(file => {
          return {
            id: file._id,
            imagePath: file.imagePath,
            videoPath: file.videoPath
          };
        });
      }))
      .subscribe((transformedFiles) => {
        this.files = transformedFiles;
        this.fileUpdate.next([...this.files]);
      });
  }

  getFileUpdateListner() {
    return this.fileUpdate.asObservable();
  }

  getFile(id: string) {
    return this.http.get<{
      _id: string,
      imagePath: string;
    }>('http://localhost:3000/api/files/' + id);
  }

  saveFile(image: File | null, videoPath: File | string) {
    if (image == null) {
      const fileData = new FormData();
      fileData.append('videoPath', videoPath);
      console.log(fileData);
      this.http.post<{ message: string, file: File }>
        ('http://localhost:3000/api/files/fileWithVideo', fileData)
        .subscribe(result => {
          this.router.navigate(['/list']);
        });
    } else {
      const fileData = new FormData();
      fileData.append('image', image);
      this.http.post<{ message: string, file: File }>
        ('http://localhost:3000/api/files', fileData)
        .subscribe(result => {
          this.router.navigate(['/list']);
        });
    }
  }

  deleteFile(fileId: string) {
    this.http.delete('http://localhost:3000/api/files/' + fileId).subscribe((result) => {
      console.log(result);
    });
  }

}
