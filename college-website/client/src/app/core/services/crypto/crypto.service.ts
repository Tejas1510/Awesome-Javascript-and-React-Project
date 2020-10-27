import { Injectable } from '@angular/core';
import * as cryptoJS from 'Crypto-Js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private cryptoKey = 'gindowa';

  constructor() { }

  encrypt(text) {
    let cipher;
    try {
      cipher = cryptoJS.AES.encrypt(text, this.cryptoKey);
      return cipher + '';
    } catch (error) {
      alert('encrypt:' + error);
    }
  }
   MD5(text){
    let key = '';
    try {
        key = cryptoJS.MD5(text);
        return key + '';
    } catch (error) {

        throw 'md5:' + error;
    }
}
  decrypt(text) {
    let deCipher = '';
    try {
      deCipher = cryptoJS.AES.decrypt(text, this.cryptoKey).toString(cryptoJS.enc.Utf8);
      return deCipher + '';
    } catch (error) {
      alert('decrypt:' + error);
    }
  }


}
