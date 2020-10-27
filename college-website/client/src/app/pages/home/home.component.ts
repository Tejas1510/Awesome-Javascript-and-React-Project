import { Component, OnInit, Inject } from '@angular/core';
import { SharedService } from 'src/app/core/services/shared/shared.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/core/services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  images = [
    '../../../assets/images/home/infrastructure.jpg',
    '../../../assets/images/home/scholership.jpeg'
  ];

  imgText = [
    'The ACE campus spreads over 20 acres of land in a beautiful and serene atmosphere ideally suited for technical education. The infrastructure and facilities available on campus are amongst the very best. Come, see it to believe it.',
    'Alpine college assists students to get upto 99% of scholarship for their enrolled courses.',
    'Alpine College of Education Saharanpur Road, Jalalabad, Shamli, Muzaffarnagar (ACESR) located at - Muzaffarnagar Uttar Pradesh is one of the popular colleges in the state. The College has been rated by 39 people on iCBSE.',
  ];
  imgText2 = [
    'Come, lets start your professional journey togeather to the road of success.',
    '100% success rate with happy student and parents.',
    'Alpine student stand out from the crowd!',
    // tslint:disable-next-line: max-line-length
    'The ACE campus spreads over 300 acres in a beautiful and serene atmosphere ideally suited for technical education. The infrastructure and facilities available on campus are amongst the very best. It is a wholly self-contained campus comprising of everything that students on campus would ever require. Come; see it to believe it. ',
    // tslint:disable-next-line: max-line-length
    'Alpine College of Education Saharanpur Road, Jalalabad, Shamli, Muzaffarnagar (ACESR) located at - Muzaffarnagar Uttar Pradesh is one of the popular colleges in India. The College has been rated by 39 people on iCBSE.'
  ];
   resData;
   noticeData = [];
  constructor(
    public share: SharedService,
    public dialog: MatDialog,
    public baseService: BaseService
  ) { }


  ngOnInit() {
    this.openDialog();
    this.notice();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Popup, {
      height: '570px',
      width: '415px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 async notice() {
  const payload =  {};
  this.resData = await this.baseService.noticeData(payload);
  let model = {
date : this.resData.rows[0].data,
notice1 : this.resData.rows[0].notice1,
notice2 : this.resData.rows[0].notice2
  };
  this.noticeData.push(model);
  }
}
@Component({
  selector: 'app-popup',
  templateUrl: 'popup.html',
})
export class Popup {

  popupImages = [
    '../../../assets/images/popup/popup_1.jpeg'
  ];

  constructor(
    public dialogRef: MatDialogRef<Popup>,
    @Inject(MAT_DIALOG_DATA) public data: Popup) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
