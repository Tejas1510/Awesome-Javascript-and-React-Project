import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  panelOpenState = false;
  events = [];
  constructor(public baseService: BaseService) { }
  ngOnInit() {
    this.getFaq();
  }
  async getFaq() {
    let responseData = await this.baseService.getFaq();
    for (let i = 0; i < responseData.data.rows.length; i++) {
      let model = {
        event_number: responseData.data.rows[i].number,
        question: responseData.data.rows[i].question,
        answer: responseData.data.rows[i].answer,
      }
      this.events.push(model);
    }
  }
}
