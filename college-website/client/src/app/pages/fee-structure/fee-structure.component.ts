import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
export interface BCAElement {
  name: string;
  position: number;
  weight: number;
}
export interface BBAElement {
  name: string;
  position: number;
  weight: number;
}
export interface BAElement {
  name: string;
  position: number;
  weight: number;
}
export interface BCOMElement {
  name: string;
  position: number;
  weight: number;
}
export interface BSCElement {
  name: string;
  position: number;
  weight: number;
}
export interface BTCElement {
  name: string;
  position: number;
  weight: number;
}
export interface BEDElement {
  name: string;
  position: number;
  weight: number;
}

let ELEMENT_DATA_BCA: BCAElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];

const ELEMENT_DATA_BBA: BBAElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];
const ELEMENT_DATA_BA: BAElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];
const ELEMENT_DATA_BCOM: BCOMElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];
const ELEMENT_DATA_BSC: BSCElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];
const ELEMENT_DATA_BTC: BTCElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];
const ELEMENT_DATA_BED: BEDElement[] = [
  {position: 1, name: 'Registration Fee', weight: 0},
  {position: 2, name: 'Tution Fee/Year', weight: 0},
  {position: 3, name: 'Books and Labs/Year', weight: 0},
  {position: 4, name: 'Building Fee', weight: 0},
  {position: 5, name: 'Grand Total', weight: 0}
 
];

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.css']
})
export class FeeStructureComponent implements OnInit {

  Data: any;
  registrationbca = '';
  tutionbca = '';
  booksbca = '';
  buildingbca = '';
  totalbca = '';

  registrationbba = '';
  tutionbba = '';
  booksbba = '';
  buildingbba = '';
  totalbba = '';

  registrationbcom = '';
  tutionbcom = '';
  booksbcom = '';
  buildingbcom = '';
  totalbcom = '';

  registrationbsc = '';
  tutionbsc = '';
  booksbsc = '';
  buildingbsc = '';
  totalbsc = '';

  registrationba = '';
  tutionba = '';
  booksba = '';
  buildingba = '';
  totalba = '';

  registrationbtc = '';
  tutionbtc = '';
  booksbtc = '';
  buildingbtc = '';
  totalbtc = '';

  registrationbed = '';
  tutionbed = '';
  booksbed = '';
  buildingbed = '';
  totalbed = '';

  constructor(
    public baseService: BaseService
    ) { this.registrationbca;}

  displayedColumns1: string[] = ['position', 'name', 'weight'];
  dataSource1 = ELEMENT_DATA_BCA;

  displayedColumns2: string[] = ['position', 'name', 'weight'];
  dataSource2 = ELEMENT_DATA_BBA;

  displayedColumns3: string[] = ['position', 'name', 'weight'];
  dataSource3 = ELEMENT_DATA_BA;

  displayedColumns4: string[] = ['position', 'name', 'weight'];
  dataSource4 = ELEMENT_DATA_BCOM;

  displayedColumns5: string[] = ['position', 'name', 'weight'];
  dataSource5 = ELEMENT_DATA_BSC;

  displayedColumns6: string[] = ['position', 'name', 'weight'];
  dataSource6 = ELEMENT_DATA_BTC;

  displayedColumns7: string[] = ['position', 'name', 'weight'];
  dataSource7 = ELEMENT_DATA_BED;


  ngOnInit() {
    this.getDataFromServer();
    
  }
  async getDataFromServer() {
    this.Data =  await this.baseService.getFeeStructure();
    if(this.Data.status = 1){
      this.getData();
    }
  }
  getData() {

    try {

      // BCA START
      this.registrationbca = JSON.stringify(this.Data.data.rows[2].registration_fee);
      ELEMENT_DATA_BCA[0].weight = JSON.parse(this.registrationbca);


      this.tutionbca = JSON.stringify(this.Data.data.rows[2].tution_fee_per_year);
      ELEMENT_DATA_BCA[1].weight = JSON.parse(this.tutionbca);

      this.booksbca = JSON.stringify(this.Data.data.rows[2].books_and_labs_per_year);
      ELEMENT_DATA_BCA[2].weight = JSON.parse(this.booksbca);


      this.buildingbca = JSON.stringify(this.Data.data.rows[2].building_fee);
      ELEMENT_DATA_BCA[3].weight = JSON.parse(this.buildingbca);


      this.totalbca = JSON.parse(this.registrationbca) + JSON.parse(this.tutionbca) + JSON.parse(this.booksbca) + JSON.parse(this.buildingbca);
      ELEMENT_DATA_BCA[4].weight = JSON.parse(this.totalbca);
      // BCA END


      //BBA START
      this.registrationbba = JSON.stringify(this.Data.data.rows[1].registration_fee);
      ELEMENT_DATA_BBA[0].weight = JSON.parse(this.registrationbba);


      this.tutionbba = JSON.stringify(this.Data.data.rows[1].tution_fee_per_year);
      ELEMENT_DATA_BBA[1].weight = JSON.parse(this.tutionbba);

      this.booksbba = JSON.stringify(this.Data.data.rows[1].books_and_labs_per_year);
      ELEMENT_DATA_BBA[2].weight = JSON.parse(this.booksbba);


      this.buildingbba = JSON.stringify(this.Data.data.rows[1].building_fee);
      ELEMENT_DATA_BBA[3].weight = JSON.parse(this.buildingbba);


      this.totalbba = JSON.parse(this.registrationbba) + JSON.parse(this.tutionbba) + JSON.parse(this.booksbba) + JSON.parse(this.buildingbba);
      ELEMENT_DATA_BBA[4].weight = JSON.parse(this.totalbba);
      // BBA END


      // BCOM START
      this.registrationbcom = JSON.stringify(this.Data.data.rows[3].registration_fee);
      ELEMENT_DATA_BCOM[0].weight = JSON.parse(this.registrationbcom);


      this.tutionbcom = JSON.stringify(this.Data.data.rows[3].tution_fee_per_year);
      ELEMENT_DATA_BCOM[1].weight = JSON.parse(this.tutionbcom);

      this.booksbcom = JSON.stringify(this.Data.data.rows[3].books_and_labs_per_year);
      ELEMENT_DATA_BCOM[2].weight = JSON.parse(this.booksbcom);


      this.buildingbcom = JSON.stringify(this.Data.data.rows[3].building_fee);
      ELEMENT_DATA_BCOM[3].weight = JSON.parse(this.buildingbcom);


      this.totalbcom = JSON.parse(this.registrationbcom) + JSON.parse(this.tutionbcom) + JSON.parse(this.booksbcom) + JSON.parse(this.buildingbcom);
      ELEMENT_DATA_BCOM[4].weight = JSON.parse(this.totalbcom);
      // BCOM END


      //BSC START
      this.registrationbsc = JSON.stringify(this.Data.data.rows[5].registration_fee);
      ELEMENT_DATA_BSC[0].weight = JSON.parse(this.registrationbsc);


      this.tutionbsc = JSON.stringify(this.Data.data.rows[5].tution_fee_per_year);
      ELEMENT_DATA_BSC[1].weight = JSON.parse(this.tutionbsc);

      this.booksbsc = JSON.stringify(this.Data.data.rows[5].books_and_labs_per_year);
      ELEMENT_DATA_BSC[2].weight = JSON.parse(this.booksbsc);


      this.buildingbsc = JSON.stringify(this.Data.data.rows[5].building_fee);
      ELEMENT_DATA_BSC[3].weight = JSON.parse(this.buildingbsc);


      this.totalbsc = JSON.parse(this.registrationbsc) + JSON.parse(this.tutionbsc) + JSON.parse(this.booksbsc) + JSON.parse(this.buildingbsc);
      ELEMENT_DATA_BSC[4].weight = JSON.parse(this.totalbsc);
      // BSC END

      // BA START
      this.registrationba = JSON.stringify(this.Data.data.rows[0].registration_fee);
      ELEMENT_DATA_BA[0].weight = JSON.parse(this.registrationba);


      this.tutionba = JSON.stringify(this.Data.data.rows[0].tution_fee_per_year);
      ELEMENT_DATA_BA[1].weight = JSON.parse(this.tutionba);

      this.booksba = JSON.stringify(this.Data.data.rows[0].books_and_labs_per_year);
      ELEMENT_DATA_BA[2].weight = JSON.parse(this.booksba);


      this.buildingba = JSON.stringify(this.Data.data.rows[0].building_fee);
      ELEMENT_DATA_BA[3].weight = JSON.parse(this.buildingba);


      this.totalba = JSON.parse(this.registrationba) + JSON.parse(this.tutionba) + JSON.parse(this.booksba) + JSON.parse(this.buildingba);
      ELEMENT_DATA_BA[4].weight = JSON.parse(this.totalba);
      // BA END


      //BTC START
      this.registrationbtc = JSON.stringify(this.Data.data.rows[6].registration_fee);
      ELEMENT_DATA_BTC[0].weight = JSON.parse(this.registrationbtc);


      this.tutionbtc = JSON.stringify(this.Data.data.rows[6].tution_fee_per_year);
      ELEMENT_DATA_BTC[1].weight = JSON.parse(this.tutionbtc);

      this.booksbtc = JSON.stringify(this.Data.data.rows[6].books_and_labs_per_year);
      ELEMENT_DATA_BTC[2].weight = JSON.parse(this.booksbtc);


      this.buildingbtc = JSON.stringify(this.Data.data.rows[6].building_fee);
      ELEMENT_DATA_BTC[3].weight = JSON.parse(this.buildingbtc);


      this.totalbtc = JSON.parse(this.registrationbtc) + JSON.parse(this.tutionbtc) + JSON.parse(this.booksbtc) + JSON.parse(this.buildingbtc);
      ELEMENT_DATA_BTC[4].weight = JSON.parse(this.totalbtc);
      // BTC END

      // BED START
      this.registrationbed = JSON.stringify(this.Data.data.rows[4].registration_fee);
      ELEMENT_DATA_BED[0].weight = JSON.parse(this.registrationbed);


      this.tutionbed = JSON.stringify(this.Data.data.rows[4].tution_fee_per_year);
      ELEMENT_DATA_BED[1].weight = JSON.parse(this.tutionbed);

      this.booksbed = JSON.stringify(this.Data.data.rows[4].books_and_labs_per_year);
      ELEMENT_DATA_BED[2].weight = JSON.parse(this.booksbed);


      this.buildingbed = JSON.stringify(this.Data.data.rows[4].building_fee);
      ELEMENT_DATA_BED[3].weight = JSON.parse(this.buildingbed);


      this.totalbed = JSON.parse(this.registrationbed) + JSON.parse(this.tutionbed) + JSON.parse(this.booksbed) + JSON.parse(this.buildingbed);
      ELEMENT_DATA_BED[4].weight = JSON.parse(this.totalbed);
      // BED END

    } catch (error) {
    }
  }
}


