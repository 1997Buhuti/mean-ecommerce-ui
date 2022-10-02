import { Component, OnInit } from '@angular/core';
import { Products, ProductsService } from '@mean-ecommerce-ui/products';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mean-ecommerce-ui-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  errorMessage: any;
  destroy$ = new Subject<boolean>();
  constructor(private productsService: ProductsService) {}
  product$ = this.productsService.product$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  products: Products[] = [];
  ngOnInit(): void {
    this.productsService.product$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => (this.products = result));
  }

  deleteProduct(productId: string) {}

  updateProduct(productId: string) {}

  private getProducts() {}
}
