import { Component, OnInit, Inject } from '@angular/core';
import { BaseService } from 'src/app/core/services';

interface Cource {
  cource_name: string,
  description: string,
  eligibility_criteria: string,
  carrer_oppurtunities: string,
  seats: string,
  cource_duration: string,
  affilated_by: string,
  mode: string,

}
interface Alpine_fees {
  course: '',
  first_year: '',
  second_year: '',
  third_year: '',
  total_fees: ''
};
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  images = [

  ]
  responseData;
  feesData;
  courses: Cource[] = [];
  alpine_fees: Alpine_fees[] = [];

  constructor(
    public baseService: BaseService
  ) {

  }

  ngOnInit(): void {
    this.get_html_text();
  }

  async get_html_text() {
    this.responseData = await this.baseService.getCources();
    this.feesData = await this.baseService.getFees();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.responseData.data.rows.length; i++) {
      const model = {
        description: this.responseData.data.rows[i].description,
        cource_name: this.responseData.data.rows[i].course_name,
        eligibility_criteria: this.responseData.data.rows[i].eligibility_criteria,
        carrer_oppurtunities: this.responseData.data.rows[i].career_opportunities,
        seats: this.responseData.data.rows[i].seats,
        cource_duration: this.responseData.data.rows[i].course_duration,
        affilated_by: this.responseData.data.rows[i].affiliated_by,
        mode: this.responseData.data.rows[i].mode,
        course: this.feesData.data.rows[i].course_name,
        first_year: this.feesData.data.rows[i].first_year_fees,
        second_year: this.feesData.data.rows[i].second_year_fees,
        third_year: this.feesData.data.rows[i].third_year_fees,
        total_fees: this.feesData.data.rows[i].total_fees,
      }
      this.courses.push(model);
    }
  }
}
