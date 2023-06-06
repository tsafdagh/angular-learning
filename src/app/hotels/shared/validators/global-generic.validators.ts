import { FormGroup } from "@angular/forms";

export class GlobalGenericValidator {

  constructor(
    private validatorMessages: { [key: string]: { [key: string]: string } }
  ) {

  }

  public createErrorMessage(container: FormGroup, isFormSubmited?:boolean): { [key: string]: string } {
    const errorMessages: { [key: string]: string } = {}

    for (const controlName in container.controls) {
      if (container.controls.hasOwnProperty(controlName)) {

        const selectedControl = container.controls[controlName];

        if (this.validatorMessages[controlName]) {
          errorMessages[controlName] = ''

          if ((selectedControl.dirty || selectedControl.touched || isFormSubmited) && selectedControl.errors) {

            Object.keys(selectedControl.errors).map((errorMessageKey: string) => {
              if (this.validatorMessages[controlName][errorMessageKey]) {
                errorMessages[controlName] += this.validatorMessages[controlName][errorMessageKey]+' '
              }
            })
          }
        }
      }
    }
    return errorMessages;
  }
}
