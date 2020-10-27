import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/core/services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  //we make an empty array in which we fetch loop data which will come in JSON
  events = [];

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
    this.get_html_text();
  }

  async get_html_text() {


    let responseData = await this.baseService.getGallery();


    //we have start FOR Loop in which we will take the lenght of data which we have store in our backend
    //1st LOOP Start
    for (let i = 0; i < responseData.data.rows.length; i++) {

      // we have make JSON in which we fetch backend data and this have LOOP so [i] will make JSON which is equal to backend data 
      let model = {
        event_no: responseData.data.rows[i].event_number,
        event_title: responseData.data.rows[i].title,
        event_sub_title: responseData.data.rows[i].sub_title,
        event_description: responseData.data.rows[i].description,
        event_image_count: responseData.data.rows[i].images_count,
        event_images: []
      }
      //we push the data MODEL i.e JSON in (events) which is an empty array
      this.events.push(model);

      //2nd LOOP Start (Loop in Loop) 
      for (let j = 1; j <= model.event_image_count; j++) {
        let model2 = { hellow: j }
        model.event_images.push(model2);
      }
      //2nd Loop End

    }
    //1st LOOP END

  }


}
