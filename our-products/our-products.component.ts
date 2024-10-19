import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-our-products',
  templateUrl: './our-products.component.html',
  styleUrls: ['./our-products.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1500ms ease-out', style({ opacity: 1, transform: 'translateY(80)' }))
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({ opacity: 0, transform: 'translateY(90px)' }))
      ])
    ])
  ]
})
export class OurProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private _dataS: DataService) {}

  ngOnInit(): void {
    this._dataS.getProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    });
  }
}
