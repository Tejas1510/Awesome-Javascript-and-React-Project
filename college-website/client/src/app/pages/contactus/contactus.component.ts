import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';
interface maps {
  value: string;
}
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {


  contactFormData = {
    FullName: '',
    Contactno: '',
    Email: '',
    Address: '',
    Description: ''
  };
 
  result: any;
  maplink = [];
  images = [
    '../../../assets/images/contactus/youtube.jpeg',
    '../../../assets/images/contactus/twitter.jpeg',
    '../../../assets/images/contactus/facebook.jpeg'
  ]

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
  }
  async contactForm() {
    try {
      await this.baseService.postContactForm(this.contactFormData);
    } catch (error) {
      alert('contactForm: ' + error);
    }
  }
}
