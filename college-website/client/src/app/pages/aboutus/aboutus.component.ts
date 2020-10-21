import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  images: any = [
    '../../../assets/images/aboutus/Principal.JPG',
    '../../../assets/images/aboutus/Director.jpg',
    '../../../assets/images/aboutus/Boby.jpg',
    '../../../assets/images/aboutus/Chinki.jpg',
    '../../../assets/images/aboutus/Himanshi.jpg',
    '../../../assets/images/aboutus/Navneet.jpg',
    '../../../assets/images/aboutus/sachin_sign.jpg',
    '../../../assets/images/aboutus/Sachin_rana.jpg',
    '../../../assets/images/aboutus/Vandana.jpg',
    '../../../assets/images/aboutus/vidhi.jpg',
    '../../../assets/images/aboutus/Stories.jpg',
    '../../../assets/images/aboutus/Mission.jpg',
    '../../../assets/images/aboutus/Vision.jpg'
  ]
}
