import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
export interface PeriodicElement {
  order: number;
  question: string;
  ratings: string;
}


@Component({
  selector: 'app-transports',
  templateUrl: './transports.component.html',
  styleUrls: ['./transports.component.css']
})
export class TransportsComponent implements OnInit {
  favoriteSeason: string;
  seasons: string[] = ['Good', 'Very Good', 'Excellent'];
  openTable: boolean;
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['order', 'question', 'ratings'];
  dataSource = this.ELEMENT_DATA;
  submitFormArray = [];
  rowQuestionModel;
  transportsQuestions;
  formData = {
    rollNo: '',
    dob: ''
  }
  constructor(public baseService: BaseService) { }
  ngOnInit(): void {
    this.getQuestions();
  }
  async getQuestions() {
    this.transportsQuestions = await this.baseService.getTransportsQuestions();
    for (let i = 0; i < Object.keys(this.transportsQuestions.data.rows).length; i++) {
      this.rowQuestionModel = {
        order: this.transportsQuestions.data.rows[i].question_order,
        question: this.transportsQuestions.data.rows[i].questions,
        ratings: ''
      }
      this.ELEMENT_DATA.push(this.rowQuestionModel);
    }
    this.openTableFun();
  }
  async submitClick() {
    let model = {};
    let result;
    let body = {};
    let response;
    try {
      result = await this.baseService.getRollDob(this.formData);
      if (this.formData.rollNo === result.data.rows[0].university_roll_no) {
        for (let i = 0; i < Object.keys(this.ELEMENT_DATA).length; i++) {
          model = {
            roll_no: this.formData.rollNo,
            dob: this.formData.dob,
            question_order: this.ELEMENT_DATA[i].order,
            question: this.ELEMENT_DATA[i].question,
            ratings: this.ELEMENT_DATA[i].ratings,
          }
          this.submitFormArray.push(model);
        }
        body = {
          data: this.submitFormArray
        }
        response = await this.baseService.sumbitTransportsData(body);
      }
    } catch (error) {
      alert('Enter Valid Roll No or DOB');
    }
  }
  openTableFun = async () => {
    this.openTable = true;
  }
  closeTableFun = async () => {
    this.openTable = false;
  }
}
