import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] }
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'asc';
  count = '12'
  countNum = 12
  productsSubscription: Subscription | undefined
  mockproductsSubscription: Subscription | undefined

  constructor(private cartService: CartService, private storeService: StoreService, private productService: ProductService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })


    this.getProducts();
    
  }

  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products) => {
      // this.products = _products;
      console.log(_products);
    })

    // this.mockproductsSubscription = this.productService.getProducts().subscribe((_products: Product[] | undefined) => {
    //   this.products = _products;
    // });
    this.products = this.productService.getProducts(this.countNum, this.sort, this.category);
  }

  onColumnsCountChanged(column: number): void {
    this.cols = column; 
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts(); 
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.countNum = newCount;
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnDestroy(): void {
      if(this.productsSubscription){
        this.productsSubscription.unsubscribe()
      }

      if(this.mockproductsSubscription) this.mockproductsSubscription.unsubscribe()
  }
}
