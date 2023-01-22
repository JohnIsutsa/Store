import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined

  categories: Array<string> | undefined

  constructor(private storeService: StoreService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoriesSubscription =  this.storeService.getAllCategories()
    .subscribe((response) => {
      console.log(response)
    })

    this.categories = this.productService.getCategories();
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }


  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

}
