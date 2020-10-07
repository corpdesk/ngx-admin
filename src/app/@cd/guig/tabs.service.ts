import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  constructor() { }

  tabActivate(id) {
    console.log('starting tabActivate(id)');
    console.log('id;', id);
    const tabElem = document.getElementsByClassName('nav-link active');
    tabElem[0].classList.remove('active');
    const tabPaneElem = document.getElementsByClassName('tab-pane active');
    tabPaneElem[0].classList.remove('active');

    const tabSelected = document.getElementById('tab_' + id);
    console.log('tabSelected;', tabSelected);
    const selItem = tabSelected.childNodes[0] as HTMLElement;
    selItem.classList.add('active');
    // tabSelected.classList.add('active');
    const tabPaneSelected = document.getElementById('tab-' + id);
    console.log('tabPaneSelected;', tabPaneSelected);
    tabPaneSelected.classList.add('active');
  }
}
