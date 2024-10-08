import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function AlMenosUnoValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        if (!(formGroup instanceof FormGroup)) {
            return null; // Asegúrate de que es un FormGroup
        }

        const controls = formGroup.controls;
        const atLeastOneSelected = Object.values(controls).some(control => control.value === true);

        if (atLeastOneSelected) {
            return null; // Validación correcta
        } else {
            // Si no hay ninguna opción seleccionada, establece el error
            return { noSeleccionado: true };
        }
    };
}