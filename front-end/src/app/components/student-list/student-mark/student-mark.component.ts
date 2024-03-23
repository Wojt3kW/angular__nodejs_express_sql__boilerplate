import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentSubject } from 'src/app/models/subject.enum';
import { StudentService } from 'src/app/services/student.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-student-mark',
  templateUrl: './student-mark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentMarkComponent {
  @Output()
  public studentUpdated: EventEmitter<Student> = new EventEmitter<Student>();

  @ViewChild('input', { static: false }) private _input: ElementRef;

  @Input()
  public student: Student; // Input property to receive the student object
  @Input()
  public subject: StudentSubject; // Input property to receive the subject

  private _isEditMode: boolean | undefined;
  public get isEditMode(): boolean {
    if (this._isEditMode === undefined) {
      this._isEditMode = this.student?.editMode?.[this.subject];
    }

    return this._isEditMode ?? false;
  }
  public set isEditMode(v: boolean) {
    this._isEditMode = v;
  }

  public constructor(
    private _studentService: StudentService,
    private _toastService: ToastService,
    private _changeDetection: ChangeDetectorRef
  ) {}

  public toggleEditMode() {
    this.student.editMode = this.student.editMode || {}; // Toggles the edit mode for a specific subject field of a student
    this.student.editMode[this.subject] = !this.student.editMode[this.subject];
    this.isEditMode = this.student.editMode[this.subject];

    if (this.isEditMode === true) {
      setTimeout(() => {
        const input = this._input?.nativeElement as HTMLInputElement;
        input?.focus();
      }, 0);
    }
  }

  public onGradeUpdate(): void {
    // Updates the grade based on the selected subject

    const input = this._input.nativeElement as HTMLInputElement;
    const mark = Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber;

    if (this.student[this.subject] === mark) {
      this.toggleEditMode();
      return;
    }

    this._studentService
      .updateMark(this.student.id, mark, this.subject)
      .subscribe({
        next: (response: any) => {
          this._toastService.showResponseMessage(response);
          this.student[this.subject] = response.data[this.subject];
          this.studentUpdated.emit(response.data);
          this.toggleEditMode();
          this._changeDetection.markForCheck();
        },
        error: (error: any) => {
          this._toastService.showErrorMessage(error);
          console.error(error);
        },
      });
  }

  public onBlur(): void {
    if (this._isEditMode === true) {
      this.onGradeUpdate();
    }
  }

  public onKeyPress(ev: KeyboardEvent): void {
    const input = this._input.nativeElement as HTMLInputElement;
    const value = input.valueAsNumber;

    if (value < 0) {
      input.value = '1';
      ev.preventDefault();
    } else if (value > 6) {
      input.value = '6';
      ev.preventDefault();
    } else if (Number.isNaN(value)) {
      input.value = '';
    }
  }
}
