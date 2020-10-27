import { ContactService } from './../contact.service';
import { Contact } from './../contact';
import { HttpModule } from '@angular/http';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[ContactService,HttpModule]
})
export class ContactComponent implements OnInit {
result:any;
contacts:Contact[];
contact:Contact;
firstName:string;
lastName:string;
phone:string;

  constructor(private contactService:ContactService) { }

  ngOnInit() {
    console.log("ngOnInit");
      this.contactService.getContacts()
      .subscribe(contacts =>{
        console.log(contacts);
        this.contacts = contacts;
        console.log(this.contacts);
      },(err:any)=>{
           console.log("error: ", JSON.stringify(err));
      });
    console.log();
  }

  addContact(){
    const newContact:Contact = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone : this.phone
     }
     this.contactService.addContact(newContact)
     .subscribe(contact=>{
       this.contacts.push(contact);
       console.log("Added Successfully");
     });
     this.contactService.getContacts()
     .subscribe(contacts =>{
       this.contacts = contacts;
     },(err:any)=>{
          console.log("error: ", JSON.stringify(err));
     });
  }

  deleteContact(id:any){
    var contacts = this.contacts;
   this.contactService.deleteContact(id)
   .subscribe(data=>{
     if(data.n==1){
       for(var i = 0;i<contacts.length;i++){
          if(contacts[i]._id == id){
            contacts.splice(i,1);
          }
       }
     }
   })
  }
}