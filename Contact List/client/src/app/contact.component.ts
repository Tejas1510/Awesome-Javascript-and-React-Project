import { ContactService } from './contact.service';

import { Component } from '@angular/core';
import { Contact } from './contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html'
})
export class ContactComponent {
    contacts:Contact[];
    contact:Contact;
    first_name:String;
    last_name:String;
    phone:String;
  constructor(private contactService:ContactService){
    this.ngOnInit();
  }
  ngOnInit(){
      console.log("ngOnInit");
      this.contactService.getContacts()
      .subscribe(contacts => this.contacts = contacts);
  }
}
