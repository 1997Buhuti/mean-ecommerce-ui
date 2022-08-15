import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@mean-ecommerce-ui/products';

@Component({
  selector: 'mean-ecommerce-ui-catogories-table',
  templateUrl: './catogories-table.component.html',
  styleUrls: ['./catogories-table.component.scss'],
})
export class CatogoriesTableComponent implements OnInit {
  categories: Category[] = [];
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }
}
