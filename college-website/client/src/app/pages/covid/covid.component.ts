import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {
  text = [
    "COVID-19 is the disease caused by the new coronavirus that emerged in China in December 2019.",
    "COVID-19 symptoms include cough, fever, shortness of breath, muscle aches, sore throat, unexplained loss of taste or smell, diarrhea and headache. COVID-19 can be severe, and some cases have caused death.",
    "The new coronavirus can be spread from person to person. It is diagnosed with a laboratory test.",
    "There is no coronavirus vaccine yet. Prevention involves frequent hand-washing, coughing into the bend of your elbow, staying home when you are sick and wearing a cloth face covering if you can't practice social distancing."
  ]
  resData;
  QnA;
  ELEMENT_DATA = [];
  stateData = [];
  dataSource = this.ELEMENT_DATA;
  formData = {
    name: '',
    contactNo: '',
    city: '',
    district: '',
    state: '',
    question: ''
  };
  getAnswer = {
    contactNo: ''
  };
  answerJSON = {
    name: '',
    question: '',
    answer: ''
  };
  constructor(
    public baseService: BaseService
  ) { }
  ngOnInit(): void {
    this.getQnA();
    this.covidTable();
  }
  async covidTable() {
    this.resData = await this.baseService.getCovidData();
    for (let i = 0; i < this.resData.statewise.length; i++) {
      let model = {
        active: this.resData.statewise[i].active,
        confirmed: this.resData.statewise[i].confirmed,
        deaths: this.resData.statewise[i].deaths,
        lastupdatedtime: this.resData.statewise[i].lastupdatedtime,
        recovered: this.resData.statewise[i].recovered,
        state: this.resData.statewise[i].state,
        statecode: this.resData.statewise[i].statecode,
        statenotes: this.resData.statewise[i].statenotes
      };
      this.stateData.push(model);
    }
  }
  async getQnA() {
    let model;
    try {
      this.QnA = await this.baseService.getQnA();
      this.ELEMENT_DATA.length = 0;
      for (let i = 0; i < Object.keys(this.QnA.data.rows).length; i++) {
        model = {
          order: this.QnA.data.rows[i].order,
          questions: this.QnA.data.rows[i].questions,
          answer: this.QnA.data.rows[i].answer
        };
        this.ELEMENT_DATA.push(model);
      }
    } catch (error) {
    }
  }
  async sumbitClick() {
    let contact = JSON.stringify(this.formData.contactNo);
    let result;
    try {
      if (contact.length !== 10) {
        alert('Enter Valid Mobile Number');
      } else {
        result = await this.baseService.postSubmitQnA(this.formData);
      }
    } catch (error) {
    }
  }
  async getAnswerClick() {
    let contactNo = JSON.stringify(this.getAnswer.contactNo);
    let result;
    try {
      if (contactNo.length !== 10) {
        alert('Enter Valid Mobile Number');
      } else {
        result = await this.baseService.getAnswerReq(this.getAnswer);
        this.answerJSON.name = result.data.rows[0].name;
        this.answerJSON.question = result.data.rows[0].ask_question;
        this.answerJSON.answer = result.data.rows[0].answer;
      }
    } catch (error) {
    }
  }
}
