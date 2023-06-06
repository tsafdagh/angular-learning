import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "ReplaceComma"
})
export class ReplaceComma implements PipeTransform {

  transform(value: string): string {
    if (!!value) {//Si la valeur n'est ni undefine, ni null, alor on peut commencer notre transformation
      return value.replace(/,/g, '.');
    }else{
      return '';
    }
  }

}
