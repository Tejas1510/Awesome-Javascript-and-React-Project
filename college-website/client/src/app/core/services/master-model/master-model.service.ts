import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterModelService {

  constructor() { }
  public getCreditModel(){

    let model = {
      title: '',
      sub_title: '',
      pic_src: '',
      description: ''
    };
    return model;

  }
}
