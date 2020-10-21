import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  constructor() { }
}

export class NotificationService {

  private notification = new Subject();
  private status = -2;
  private expection = '';
  private notificationRepo: string [];

  // return the status of last operation
  getStatus() {
    return this.status;
  }

  // return the Exception of last operation if any
  getException() {
    return this.expection;
  }

  // CRUD operations for notification
  // ## CREATE ##
  add(message: string) {
    this.status = -2;
    this.expection = '';
    let retunId = -2;

    try {
      retunId = 1;

      this.notificationRepo.push(message);
      retunId = this.notificationRepo.length - 1;

      this.status = 200;
      return retunId;
    } catch (error) {
      this.status = -333;
      this.expection = 'add: ' + error;
      return this.status + '';
    }
  }

  // ## READ ## with message id
  get(): string {
    this.status = -2;
    this.expection = '';
    let retunId = -2;

    try {
      retunId = 1;

      this.status = 200;
    } catch (error) {
      this.status = -333;
      this.expection = 'get: ' + error;
      return this.expection;
    }

  }


  // ## UPDATE ##
  set() {


  }

  // ## DELETE ##
  remove() {


  }


}

