import { Component, EventEmitter, Output } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IStudentForm, StudentFormFields } from './student.form';
import { studentNameValidator } from 'src/app/validators/student-name.validator';
import { ToastService } from 'src/app/services/toast.service';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'add-student-form-component',
  templateUrl: './add-student-form.component.html',
})
export class AddStudentFormComponent {
  /**
   * EventEmitter called when new student has been added to the data base
   * You can 'subscribe' into this event emitter in your component like below
   * <add-student-form-component (studentAdded)="studentAdded($event)"></add-student-form-component>
   */
  @Output()
  public studentAdded: EventEmitter<Student> = new EventEmitter<Student>();

  public submitted: boolean = false;
  /**
   * Defines a form with a fixed set of controls
   * Please read https://angular.io/guide/reactive-forms
   */
  public formGroup: FormGroup;

  /**
   * Enum used in add-student-form.component.html
   */
  public StudentFormFields: typeof StudentFormFields = StudentFormFields;

  public constructor(
    formBuilder: FormBuilder,
    private _studentService: StudentService,
    private _toastService: ToastService
  ) {
    this.formGroup = this.createFormGroup(formBuilder);
  }

  public get formControls(): any {
    return this.formGroup.controls;
  }

  /**
   * adding a new student to the database
   * student will be added when formGroup.invalid = true
   */
  public addStudent(): void {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    var model = <IStudentForm>{
      [StudentFormFields.firstName]:
        this.formControls[StudentFormFields.firstName]?.value,
      [StudentFormFields.lastName]:
        this.formControls[StudentFormFields.lastName]?.value,
      [StudentFormFields.mathMark]:
        this.formControls[StudentFormFields.mathMark]?.value,
      [StudentFormFields.historyMark]:
        this.formControls[StudentFormFields.historyMark]?.value,
      [StudentFormFields.physicalEduMark]:
        this.formControls[StudentFormFields.physicalEduMark]?.value,
    };

    this._studentService.addStudent(model).subscribe({
      next: (response: any) => {
        document.getElementById('btn-close')?.click();

        this._toastService.showResponseMessage(response);

        setTimeout(() => {
          this.studentAdded.emit(response.data);
          this.submitted = false;
          this.formGroup.reset();
        }, 200);
      },
      error: (error: any) => {
        this._toastService.showErrorMessage(error);
        console.error(error);
      },
    });
  }

  /**
   * Creating and returning a FormGroup used in reactive form in add-student-form.component.html
   */
  private createFormGroup(formBuilder: FormBuilder): FormGroup<IStudentForm> {
    return formBuilder.group<IStudentForm>({
      firstName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(127),
        studentNameValidator(),
      ]),
      lastName: new FormControl<string | null>(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(127),
        studentNameValidator(),
      ]),
      mathMark: new FormControl<number | null>(null, [
        Validators.min(1),
        Validators.max(6),
      ]),
      historyMark: new FormControl<number | null>(null, [
        Validators.min(1),
        Validators.max(6),
      ]),
      physicalEduMark: new FormControl<number | null>(null, [
        Validators.min(1),
        Validators.max(6),
      ]),
    });
  }
}
