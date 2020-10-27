import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../core/services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { CryptoService } from 'src/app/core/services/crypto/crypto.service';
import { HttpMasterService } from 'src/app/core/services/http/http-master.service';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  private userName;
  private passKey;
  private loginResponse;

  data = {
    username: '',
    password: ''
  }



  result: any;
  teacherLoginData = {
    username: '',
    password: ''
  }

  constructor(
    public loginService: LoginService,
    public http: HttpClient,
    public httpMaster: HttpMasterService,
    public crypto: CryptoService,
    public shared: SharedService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public dataAll: LoginComponent
  ) { }

  ngOnInit() {
  }


  async teacherLoginClick() {
    this.result = await this.loginService.teacherLogin(this.teacherLoginData);
    this.shared.setUserData(JSON.stringify(this.result));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
