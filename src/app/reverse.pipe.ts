import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value) {
    if(value!=undefined){
      return value.slice().reverse();
    }
    
  }

}
