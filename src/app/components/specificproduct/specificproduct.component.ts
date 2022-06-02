import { Component, OnInit } from '@angular/core';
import { StoreserviceService } from 'src/app/services_folder/storeservice.service';

@Component({
  selector: 'app-specificproduct',
  templateUrl: './specificproduct.component.html',
  styleUrls: ['./specificproduct.component.css']
})
export class SpecificproductComponent implements OnInit {

  constructor(private storeService:StoreserviceService) { }

  ngOnInit(): void {
    console.log(this.storeService.getProduct())
  }

}
