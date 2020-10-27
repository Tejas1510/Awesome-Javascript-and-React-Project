import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

export class CarouselComponent implements OnInit {


  images = [
    '../../../assets/images/carousel/mycollege1.JPG',
    '../../../assets/images/carousel/mycollege2.jpg',
    '../../../assets/images/carousel/mycollege3.jpg',
    '../../../assets/images/carousel/mycollege4.JPG',
    '../../../assets/images/carousel/mycollege5.JPG'
  ];

  imgText = [
    'Come, lets start your professional journey togeather to the road of success.',
    '100% success rate with happy student and parents.',
    'Alpine student stand out from the crowd!',
    // tslint:disable-next-line: max-line-length
    'The ACE campus spreads over 300 acres in a beautiful and serene atmosphere ideally suited for technical education. The infrastructure and facilities available on campus are amongst the very best. It is a wholly self-contained campus comprising of everything that students on campus would ever require. Come; see it to believe it. ',
    // tslint:disable-next-line: max-line-length
    'Alpine College of Education Saharanpur Road, Jalalabad, Shamli, Muzaffarnagar (ACESR) located at - Muzaffarnagar Uttar Pradesh is one of the popular colleges in India. The College has been rated by 39 people on iCBSE.'
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 2500;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
  }
}
