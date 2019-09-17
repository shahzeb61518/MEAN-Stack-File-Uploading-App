import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FileComponent } from './file/file/file.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatVideoModule } from 'mat-video';

import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
} from '@angular/material';
import { FileListComponent } from './file/file-list/file-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FileComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatBadgeModule,
    MatSelectModule,
    MatProgressBarModule,
    MatVideoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
