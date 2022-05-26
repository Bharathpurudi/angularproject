import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  catogoriesList: any[]=[
    {
      "catName":"Electronics",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/electronics_g9bpqa.jpg"
    },
    {
      "catName":"Grocery",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653555382/grocery_fykhhh.jpg"
    },
    {
      "catName":"Fashion",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/fashion_a7weeg.jpg"
    },
    {
      "catName":"Appliances",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/appliances_m6odvu.jpg"
    },
    {
      "catName":"Beauty",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/beauty_rona63.jpg"
    },
    {
      "catName":"Furniture",
      "catUrl":"https://res.cloudinary.com/dhyg2tdfb/image/upload/v1653549948/furniture_rdqo9z.jpg"
    }

  ]

}
