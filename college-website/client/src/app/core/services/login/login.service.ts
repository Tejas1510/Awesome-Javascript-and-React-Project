import { Injectable } from '@angular/core';
import { CryptoService } from '../crypto/crypto.service';
import { BaseService } from '../base/base.service';
import { HttpMasterService } from '../http/http-master.service';


@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(
    public crypto: CryptoService,
    public baseService: BaseService,
    public httpMaster: HttpMasterService
    ){}

  login(userName, password) {
    let payload = '';
    let loginModel = {
      username: userName,
      password: password
    }

    payload = this.crypto.encrypt(JSON.stringify(loginModel));

    alert('loginModel: ' + JSON.stringify(loginModel) + ' : Encrypt: ' + payload);

    return payload;
  }
  async teacherLogin(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/login/teacher';
      serverUrl = this.baseService.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
      alert('postSubmitFeedback: ' + error);
    }
  }

}
