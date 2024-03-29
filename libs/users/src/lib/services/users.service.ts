import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'users';
  constructor(private http: HttpClient) {}

  users$ = this.http.get<User[]>(this.apiURLUsers).pipe(
    tap((data) => console.log('users', JSON.stringify(data))),
    catchError(this.handleError)
  );

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`).pipe(
      tap((data) => console.log('users', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, user);
  }
  deleteUser(userId: string): Observable<Object> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
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
