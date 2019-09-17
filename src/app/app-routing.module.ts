import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileComponent } from './file/file/file.component';
import { FileListComponent } from './file/file-list/file-list.component';

const routes: Routes = [
  { path: '', component: FileComponent },
  { path: 'list', component: FileListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
