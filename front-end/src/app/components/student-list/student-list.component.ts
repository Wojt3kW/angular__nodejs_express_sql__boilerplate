import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { faTrashCan, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Student } from 'src/app/models/student.model';
import { StudentSubject } from 'src/app/models/subject.enum';
import { ToastService } from 'src/app/services/toast.service';
import { catchError, firstValueFrom, map, of } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  public faTrashCan = faTrashCan;
  public faAdd = faAdd;
  public StudentSubject: typeof StudentSubject = StudentSubject;

  public students: any[] = []; // Array to store student data

  public constructor(
    private _studentService: StudentService,
    private _toastService: ToastService
  ) {}

  public async ngOnInit(): Promise<void> {
    const students = await this.getStudents(); // Fetches the list of students when the component initializes
    this.students.push(...students);
  }

  /**
   * callback function, running when new student has been added
   * @param student recently added student
   */
  public studentAdded(student: Student): void {
    this.students.push(student);
  }

  /**
   * Call the deleteStudent() method of the studentService, passing the ID of the student to be deleted.
   * Subscribe to the returned observable to handle the asynchronous response of the deletion
   * @param student student that will be deleted
   */
  public deleteStudent(student: Student): void {
    this._studentService.deleteStudent(student?.id).subscribe({
      next: (response: any) => {
        this._toastService.showResponseMessage(response);
        this.students = this.students.filter((s) => s.id !== student.id);
      },
      error: (error: any) => {
        this._toastService.showErrorMessage(error);
        console.error(error);
      },
    });
  }

  /**
   * Fetches the list of students when the component initializes
   */
  private async getStudents(): Promise<Student[]> {
    const getStudents$ = this._studentService.getAll(); // Retrieves the list of students from the service and assigns it to the component's students array

    return firstValueFrom(
      getStudents$.pipe(
        map((response) => {
          if ((response?.data?.length ?? 0) > 0) {
            return response.data;
          } else {
            return [];
          }
        }),
        catchError((err) => {
          this._toastService.showErrorMessage(err);
          return of([]);
        })
      )
    );
  }
}
