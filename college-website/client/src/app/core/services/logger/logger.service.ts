import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private status = -2;
  private expection = '';
  private logRepo: string [];

  constructor() { }

  // return the status of last operation
  getStatus() {
    return this.status;
  }

  // return the Exception of last operation if any
  getException() {
    return this.expection;
  }

  private addEntryToLog(logType, user, message){
    let datatimestamp =  new Date().toJSON("yyyy-MM-dd HH:mm:ss");
    try {
      this.logRepo.push(datatimestamp + ' : ' + ' : ' + logType + ' : ' + user + ' : ' + message);
      console.log(datatimestamp + ' : ' + ' : ' + logType + ' : ' + user + ' : ' + message);

    } catch (error) {
      console.log(datatimestamp + ': addEntryToLog: ' + error + ' : ' + logType + ' : ' + user + ' : ' + message);
    }
  }

  // CRUD operations for notification
  // ## CREATE ##
  log(message: string) {
    this.status = -2;
    this.expection = '';
    let retunId = -2;

    try {
      retunId = 1;

      this.logRepo.push(message);

      this.status = 200;
      return true;
    } catch (error) {
      this.status = -333;
      this.expection = 'log: ' + error;
      return false;
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
