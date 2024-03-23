import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddStudentFormComponent } from './components/student-list/add-student-form/add-student-form.component';
import { StudentService } from './services/student.service';
import { ToastrModule } from 'ngx-toastr';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { StudentMarkComponent } from './components/student-list/student-mark/student-mark.component';

const routes: Routes = [{ path: 'students', component: StudentListComponent }];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    AddStudentFormComponent,
    ModalDialogComponent,
    StudentMarkComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      timeOut: 2000,
    }),
  ],
  providers: [StudentService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
