import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UtilityService } from '../../core/services/utils/utility.service';
import { BaseService } from 'src/app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  // @ViewChild('clickMe', opts) clickMe: any;
  @ViewChild(MatMenuTrigger, { read: true, static: true }) trigger: MatMenuTrigger;

  private todaydate: any;
  private notificationMessage: string;
  private name: string;
  private designation: string;
  private organization: string;
  private tagLine: string;
  private info: string;
  private status = -2;
  message;
  constructor(
    public utilityService: UtilityService,
    public baseService: BaseService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getNotification();
  }

  // method to get current/todays date from DateService
  getDate() {
    return this.utilityService.getCurrentDate();
  }

  // method to get the status code of last function call;
  getStatus(): number {
    return this.status;
  }

  getHeaderMessage(): string {
    let notificationMessage = '';
    try {
      notificationMessage = this.message;
    } catch (error) {
      notificationMessage = 'catch: error in getting the messgae, please contact the System Admin.';
    }
    return notificationMessage;
  }

  async getNotification() {
      let result = await this.baseService.getNotification();
      this.message = result.data.rows[0].value;

  }

  getName() {
    try {
      this.name = 'User Full Name';

      this.status = 200;
      return this.name;

    } catch (error) {
      this.status = 333;
      throw new Error('getName : ' + error);
    }
  }

  getDesignation() {
    try {
      this.designation = 'User Designation';

      this.status = 200;
      return this.designation;

    } catch (error) {
      this.status = 333;
      throw new Error('getDesignation : ' + error);
    }
  }


  getInfo() {
    try {
      this.info = 'User information/details.';

      this.status = 200;
      return this.info;

    } catch (error) {
      this.status = 333;
      throw new Error('getInfo : ' + error);
    }
  }


  getOrganization() {
    try {
      this.organization = 'Gindowa Technologies';

      this.status = 200;
      return this.organization;

    } catch (error) {
      this.status = 333;
      throw new Error('getOrganization : ' + error);
    }
  }

  getTagLine() {
    try {
      this.tagLine = 'User Fav line! Tag Line!';

      this.status = 200;
      return this.tagLine;

    } catch (error) {
      this.status = 333;
      throw new Error('getTagLine : ' + error);
    }
  }

  logout() {
    alert('Logout');

  }

  reload() {
    window.location.reload();
  }
  // 104.24.123.249 IP of doamina aplinecollege.in

  aboutUs() {

  }

  clickOnHover() {
    // this.clickMe._elementRef.nativeElement.click();
    // this.trigger.openMenu();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '438px',
      width: '590px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
