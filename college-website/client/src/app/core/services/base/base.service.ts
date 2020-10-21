import { Injectable } from '@angular/core';
import { HttpMasterService } from '../http/http-master.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(public httpMaster: HttpMasterService) { }
  getBaseUrl() {
    //let baseUrl = 'https://api.alpinecollege.online';
    let baseUrl = 'http://localhost:3000';

    // let baseUrl = process.env.API_SERVER_URL;

    // production API URL
    // baseUrl = 'https://www.gindowa.com/services';
    return baseUrl;
  }
  async postContactForm(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/alpine/contactform';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }

  async getCources() {
    let path = '';
    let serverUrl;
    let payload;
    let result;
    try {
      path = '/test/user/getcources';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getFees() {
    let path = '';
    let serverUrl;
    let payload;
    let result;
    try {
      path = '/test/user/fees';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getFeeStructure() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/alpine/feestructure';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }


  async getGallery() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/alpine/gallery';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }


  async getPtmAgenda() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/feedback/ptm/agenda';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }


  async getPtmDetails() {
    let path = '';
    let serverUrl;
    let payload;
    let result;
    try {
      path = '/test/feedback/dropdown/ptm';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }


  async getPtmCourses() {
    let path = '';
    let serverUrl;
    let payload;
    let result;
    try {
      path = '/test/feedback/dropdown/course';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }

  async getPtmStudents() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/feedback/dropdown/student';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }

  async getPtmQuestions(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/feedback/ptm/questions';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }

  async getFeedbackData(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/feedback/ptm/feedbackdata';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }

  async postSubmitFeedback(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/feedback/submit';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getNotification() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/notification';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getFaq() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/alpine/faq';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getTransportsQuestions() {
    let path = '';
    let serverUrl;
    let payload;
    let result;

    try {
      path = '/test/transports/getquestions';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getQnA() {
    let path = '';
    let serverUrl;
    let payload;
    let result;
    try {
      path = '/test/getquestion';
      serverUrl = this.getBaseUrl() + path;
      payload = {};
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async postSubmitQnA(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/askform/submit';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getAnswerReq(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/getanswer';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async getCovidData() {
    let serverUrl;
    let payload;
    let result;
    try {
      serverUrl = 'https://api.covid19india.org/data.json';
      payload = {};
      result = await this.httpMaster.getCovidTableData(serverUrl);
      return result;
    } catch (error) {
    }
  }
  async getRollDob(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/transports/getrolldob';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async sumbitTransportsData(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/transports/sumbittransports';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
  async noticeData(payload) {
    let path = '';
    let serverUrl;
    let result;
    try {
      path = '/test/transports/getnotice';
      serverUrl = this.getBaseUrl() + path;
      result = await this.httpMaster.postRequest(serverUrl, payload);
      return result;
    } catch (error) {
    }
  }
}

