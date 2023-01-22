import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import getMockCategories from '../mocks/categories.mock';
import getMockProducts from '../mocks/product.mock';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Array<Product> = [];
  categories = getMockCategories;

  constructor() { 
    this.products = getMockProducts;
  }

  getLandingProducts(): Array<Product> {
    return this.products;
  }

  getProducts(limit: number, sort: string, category?: string): Array<Product> {
    // return this.sortProducts(this.setLimit(this.filterProducts(this.products, category),limit),sort);
    const filteredProducts = this.filterProducts(this.products, category);
    const limitedProducts = this.setLimit(filteredProducts, limit);
    const sortedProducts = this.sortProducts(limitedProducts, sort);
    return sortedProducts;
  }

  getCategories(): any {
    return this.categories;
  }

  filterProducts(products: Array<Product>, category?: string): Array<Product>{
    if(category){
      return products.filter( product => product.category === category);
    }
    return products;
  }

  setLimit(products: Array<Product>, limit: number): Array<Product>{
    return products.slice(0, limit);
  }

  sortProducts(products: Array<Product>, sort: string) : Array<Product> {
    (sort === 'desc') ? products.sort((a,b) => b.id - a.id) :  products.sort((a,b) => a.id - b.id);
    return products;
  }
}
