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

  addClassByID(id,cls){
    const elem = document.getElementById(id) as HTMLElement;
    elem.classList.add(cls);
  }

  removeClassByID(id,cls){
    const elem = document.getElementById(id) as HTMLElement;
    elem.classList.remove(cls);
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

  // // mat-icon notranslate mat-chip-remove mat-chip-trailing-icon material-icons mat-icon-no-color ng-star-inserted
  // isChips(){

  // }

}
