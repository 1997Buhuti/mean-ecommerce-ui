import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories');
  }

  getCategory(categoryId: string) {
    return this.http.get<Category[]>(
      `http://localhost:3000/api/v1/categories/${categoryId}`
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `http://localhost:3000/api/v1/categories/${category.id}`,
      category
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      'http://localhost:3000/api/v1/categories',
      category
    );
  }

  deleteCategory(categoryId: string): Observable<Object> {
    return this.http.delete<Object>(
      `http://localhost:3000/api/v1/categories/${categoryId}`
    );
  }
}
