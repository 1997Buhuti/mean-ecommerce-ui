import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
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

  updateProduct(productId: string) {
    this.router.navigate([`products/form/${productId}`]);
  }

  private getProducts() {}
}
