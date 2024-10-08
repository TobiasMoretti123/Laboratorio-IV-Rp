import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function RadioSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value ? null : { noSeleccionado: true };
    };
  }