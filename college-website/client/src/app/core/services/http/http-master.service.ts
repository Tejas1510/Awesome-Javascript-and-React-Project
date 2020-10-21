import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CryptoService } from '../crypto/crypto.service';
import { UtilityService } from '../utils/utility.service';

@Injectable({
  providedIn: 'root'
})
export class HttpMasterService {
  constructor(
    public http: HttpClient,
    public cyrptoService: CryptoService,
    public utility: UtilityService
  ) { }
  async postRequest(url, payload) {
    let asyncResult: any;
    let options;
    try {
      options = this.getOptions();
      asyncResult = await this.http.post(url, payload, options).toPromise();
      return asyncResult;
    } catch (error) {
    }
  }
  async getCovidTableData(url) {
    let asyncResult: any;
    try {
      asyncResult = await this.http.get(url).toPromise();
      return asyncResult;
    } catch (error) {
    }
  }
  private getToken() {
    let currentDate;
    let token;
    try {
      currentDate = this.utility.getDateMySQL();
      token = this.cyrptoService.MD5(currentDate);
      return token;
    } catch (error) {
    }
  }
  private getOptions() {
    let token;
    let headers;
    try {
      token = this.getToken();
      headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token
        })
      };
      return headers;
    } catch (error) {
    }
  }
}
