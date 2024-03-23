import { FormControl } from '@angular/forms';

/**
 * student propertied
 * if you add new features to student class remember add new value to this enum
 */
export enum StudentFormFields {
  firstName = 'firstName',
  lastName = 'lastName',
  mathMark = 'mathMark',
  historyMark = 'historyMark',
  physicalEduMark = 'physicalEduMark',
}

/**
 * Definition of student form
 */
export interface IStudentForm {
  [StudentFormFields.firstName]: FormControl<string | null>;
  [StudentFormFields.lastName]: FormControl<string | null>;
  [StudentFormFields.mathMark]: FormControl<number | null>;
  [StudentFormFields.historyMark]: FormControl<number | null>;
  [StudentFormFields.physicalEduMark]: FormControl<number | null>;
}
