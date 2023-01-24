import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-landing-product-box',
  templateUrl: './landing-product-box.component.html',
  styleUrls: ['./landing-product-box.component.css']
})
export class LandingProductBoxComponent implements OnInit {
  @Input() product: Product | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
