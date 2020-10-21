import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public logger: LoggerService) { }

  getCurrentDate() {
    return new Date();
  }

  getLocalData(key){
    try {
      return localStorage.getItem(key);
    } catch (error) {
      this.logger.log('getLocalData: ' + error);
      return '';
    }
  }

  setLocalData(key, data){
    try {
      localStorage.setItem(key, data);
      return true;
    } catch (error) {
      this.logger.log('setLocalData: ' + error);
      return false;
    }
  }
   getDateMySQL(){
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let mm;
    let dd;
     mm = currentDate.getMonth() + 1;
     dd = currentDate.getDate();
    let today;
    try {
        //
        if(dd<10){ dd=`0${dd}`;} 
        //
        if(mm<10) { mm=`0${mm}`;} 
        //
        today = yyyy + '-' + mm + '-' + dd;
        
    } catch (error) {
       
        today = '';
    }
    return today;
}
}
