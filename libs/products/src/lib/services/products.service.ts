import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiURLProducts = environment.apiUrl + 'products';
  constructor(private http: HttpClient) {}

  product$ = this.http.get<Products[]>(this.apiURLProducts).pipe(
    tap((data) => console.log('categories', JSON.stringify(data))),
    catchError(this.handleError)
  );

  getProduct(productId: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiURLProducts}/${productId}`).pipe(
      tap((data) => console.log('categories', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createProduct(product: FormData): Observable<Products> {
    return this.http.post<Products>(this.apiURLProducts, product);
  }

  updateProduct(product: FormData, productId: string): Observable<Products> {
    console.log('updateProduct');
    return this.http.put<Products>(
      `${this.apiURLProducts}/${productId}`,
      product
    );
  }
  deleteCProduct(productId: string): Observable<Object> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
