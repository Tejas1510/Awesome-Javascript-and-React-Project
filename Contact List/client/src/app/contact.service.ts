import { Contact } from './contact';
import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class ContactService {

  constructor(public http:Http) { }


  getContacts(){
    return this.http.get('http://localhost:3000/api/contacts')
    .map(res => res.json());  
    
  }
  addContact(newContact:Contact){
   var headers = new Headers();
   headers.append('Content-Type','Application/json');
   return this.http.post('http://localhost:3000/api/contacts',newContact,{headers:headers})
   .map(res =>res.json()); 
  }
  deleteContact(id){
    return this.http.delete('http://localhost:3000/api/contacts/'+id)
    .map(res => res.json());  
     
   }
}
