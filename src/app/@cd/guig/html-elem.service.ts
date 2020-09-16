import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlElemService {

  constructor() { }

  isChecked(control: HTMLInputElement){
    if(this.isMat(control)){
      if(control.classList.contains('mat-checkbox-checked')){
        console.log('isChecked:', 'true');
        return true;
      } else {
        console.log('isChecked:', 'false');
        return false;
      }
    }else {
      console.log('cannot determine checkbox type')
    }
    
  }

  getElem(selector){
    return document.getElementById(selector.id) as HTMLInputElement;
  }

  isMat(control: HTMLInputElement){
    const tagName = control.tagName
    const strTyp = tagName.substring(0, 4).toLowerCase();
    console.log('matType:', strTyp);
    if(strTyp === 'mat-'){
      return true;
    } else {
      return false;
    }
  }
}
