import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HtmlElemService {

  constructor() { }

  getByClass(cls) {
    return document.getElementsByClassName(cls);
    // var result = "document.getElementsByClassName('orange juice')";
    // for (var i = 0, len = allOrangeJuiceByClass.length | 0; i < len; i = i + 1 | 0) {
    //   result += "\n  " + allOrangeJuiceByClass[i].textContent;
    // }
  }
  // mat element is checked
  isChecked(control: HTMLInputElement) {
    if (this.isMat(control)) {
      if (control.classList.contains('mat-checkbox-checked')) {
        console.log('isChecked:', 'true');
        return true;
      } else {
        console.log('isChecked:', 'false');
        return false;
      }
    } else {
      console.log('cannot determine checkbox type')
    }

  }

  getElem(selector) {
    return document.getElementById(selector.id) as HTMLInputElement;
  }

  addClassByID(id, cls) {
    const elem = document.getElementById(id) as HTMLElement;
    elem.classList.add(cls);
  }

  removeClassByID(id, cls) {
    const elem = document.getElementById(id) as HTMLElement;
    elem.classList.remove(cls);
  }

  isMat(control: HTMLInputElement) {
    const tagName = control.tagName
    const strTyp = tagName.substring(0, 4).toLowerCase();
    console.log('matType:', strTyp);
    if (strTyp === 'mat-') {
      return true;
    } else {
      return false;
    }
  }

  getHTMLContent(elem) {
    console.log(elem.innerHTML);
    return elem.innerHTML;
  }

  getHTMLInputVal(id) {
    const elem = document.getElementById(id) as HTMLInputElement;
    console.log(elem.value);
    return elem.value;
  }

  setHTMLInputVal(id, val) {
    const elem = document.getElementById(id) as HTMLInputElement;
    elem.value = val;
  }

  appendHtml(elementRef, selector, srtHtml) {
    const parent = elementRef.nativeElement.querySelector(selector) as HTMLElement;
    parent.insertAdjacentHTML('afterbegin', srtHtml);
  }

  

}
