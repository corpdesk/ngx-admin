import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

export interface FormSection {
  index: number;
  name: string;
  form: FormGroup;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuetionService {
  genders = ['male', 'female'];
  forms: FormSection[] = [];
  forbiddenUserNames = ['geetha', 'puja'];
  formGroups = [
    {
      index: 0,
      name: 'identity',
      icon: 'phone',
      controls: [{
        name: 'userName',
        validation: ['required'],
        type: 'text',
        label: 'User Name',
        placeholder: 'User Name',
        icon: 'person-outline'
      },
      {
        name: 'password',
        validation: ['required'],
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        icon: 'lock-closed-outline'
      },
      {
        name: 'firstname',
        validation: ['required'],
        type: 'text',
        label: 'First Name',
        placeholder: 'First Name',
        icon: 'person-outline'
      },
      {
        name: 'lastname',
        validation: ['required'],
        type: 'text',
        label: 'Last Name',
        placeholder: 'First Name',
        icon: 'person-outline'
      }]
    },
    {
      index: 1,
      name: 'contacts',
      icon: 'chat',
      controls: [
        {
          name: 'email',
          validation: ['required'],
          type: 'text',
          label: 'Email',
          placeholder: 'Email',
          icon: 'mail-outline'
        }]
    }
  ];
  allForms = {};
  constructor() { }
}
