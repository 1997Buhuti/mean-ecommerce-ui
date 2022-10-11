import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products, ProductsService } from '@mean-ecommerce-ui/products';
import { ConfirmationService } from 'primeng/api';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'mean-ecommerce-ui-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  errorMessage: any;
  destroy$ = new Subject<boolean>();
  categoryService: any;
  messageService: any;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}
  product$ = this.productsService.product$.pipe(
    catchError((err) => {
      this.errorMessage = err;
      return EMPTY;
    })
  );
  products: Products[] = [];
  ngOnInit(): void {
    this.getCategories();
  }

  deleteProduct(productId: string) {
    console.log(productId);
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteCProduct(productId).subscribe(
          () => {
            this.getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!',
            });
          }
        );
      },
    });
  }
  getCategories() {
    this.productsService.product$
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => (this.products = result));
  }

  updateProduct(productId: string) {
    console.log(productId);
    this.router.navigate([`products/form/${productId}`]);
  }

  private getProducts() {}
}
