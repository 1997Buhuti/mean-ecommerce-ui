import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@mean-ecommerce-ui/products';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'mean-ecommerce-ui-catogories-table',
  templateUrl: './catogories-table.component.html',
  styleUrls: ['./catogories-table.component.scss'],
})
export class CatogoriesTableComponent implements OnInit {
  categories: Category[] = [];
  position: string = '';
  constructor(
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            this.getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!',
            });
          }
        );
      },
    });
  }

  updateCategory(categoryId: string) {
    this.router.navigate([`categories/form/${categoryId}`]);
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }
}
