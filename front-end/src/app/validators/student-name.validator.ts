import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function studentNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const regex = /^[A-Z][a-z]+$/;
    if (regex.test(control.value)) {
      return null;
    } else {
      return { invalidName: true };
    }
  };
}
