import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userData;
  constructor(public router: Router){
    this.userData;
  }
  setUserData(data){
    try {
      this.userData = JSON.parse(data);
  
    } catch (error) {
      alert('setUserData: ' + error);
    }
  }
  getUserData(){
    let temp;
    try {
      temp = this.userData;
      return temp;
    } catch (error) {
      alert('getUserDetails: ' + error);
    }
  }
}
