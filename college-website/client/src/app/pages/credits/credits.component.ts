import { Component, OnInit } from '@angular/core';
import { MasterModelService } from 'src/app/core/services/master-model/master-model.service';
@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  credits = [

  ];
  constructor(public modelMaster: MasterModelService) {
    this.onLoad();
   }

  ngOnInit(): void {

  }

  // loading the method on load of the component
  private onLoad() {

    let creditModel = this.modelMaster.getCreditModel();

    try {
      creditModel = this.modelMaster.getCreditModel();
      creditModel.title = 'MH Shuaib';
      creditModel.sub_title = 'Alpine, BCA (2017-2020)';
      creditModel.pic_src = 'shuaib.jpg';
      // tslint:disable-next-line: max-line-length
      creditModel.description = 'Shuaib loves music and singing. He like playing guiter and has genuine interest in technology and science.';
      this.credits.push(creditModel);

      creditModel = this.modelMaster.getCreditModel();
      creditModel.title = 'Shikha Sharma';
      creditModel.sub_title = 'Alpine, BCA (2017-2020)';
      creditModel.pic_src = 'shikha.jpg';
      creditModel.description = 'Shikha wants to be the example for the girls of Rural India, who wants to achieve big with dedication and hard work.';
      this.credits.push(creditModel);

      creditModel = this.modelMaster.getCreditModel();
      creditModel.title = 'Vishal Raj';
      creditModel.sub_title='Alpine, BCA (2018-2021)';
      creditModel.pic_src = 'vishal.jpg';
      creditModel.description = 'Vishal like playing guitar and doing stunts on bike. He is facinated by the modern technologies and concepts like Block Chain and Crypto Currency.';
      this.credits.push(creditModel);

      creditModel = this.modelMaster.getCreditModel();
      creditModel.title = 'Sultan Khan';
      creditModel.sub_title='Alpine, BCA (2017-2020)';
      creditModel.pic_src = 'sultan.jpg';
      // tslint:disable-next-line: max-line-length
      creditModel.description = 'Sultan likes photo shoot and is a camera lover. Sultan has big dream making his family proud one day by his exceptonal deeds.';
      this.credits.push(creditModel);

      creditModel = this.modelMaster.getCreditModel();
      creditModel.title = 'Bhupendra Sharma'; 
      creditModel.sub_title = 'Alpine, BCA (2017-2020)';
      creditModel.pic_src = 'bhupendra.JPG';
      // tslint:disable-next-line: max-line-length
      creditModel.description = 'Bhupendra wants to be a computer graduate since childhood. By years of hard work he is now an example for others in his society.';
      this.credits.push(creditModel);

      creditModel = this.modelMaster.getCreditModel();
      creditModel.title = 'Aman Jangid';
      creditModel.sub_title='BCA (2017-2020)';
      creditModel.pic_src = 'aman.jpg';
      creditModel.description = 'Aman loves internet surfing and designing web components. He plays mobile games in his free time and like riding bike.';
      this.credits.push(creditModel);

    } catch (error) {


    }
  }


  getCredits(){
    return this.credits;
  }
}
