import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SingleUserResponse, User, UserResponse } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private userCache = new Map<number, User>(); // Cache for user details
  private usersListCache = new Map<number, UserResponse>(); // Cache for list of users

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<UserResponse> {
    // Check if the page has already been cached
    if (this.usersListCache.has(page)) {
      // Return the cached Observable if available
      return of(this.usersListCache.get(page)!);
    }

    const url = `${this.baseUrl}?page=${page}`;
    return this.http.get<UserResponse>(url).pipe(
      map(response => {
        // Cache the response using the page number as the key
        this.usersListCache.set(page, response);
        return response;
      })
    );
  }

  getUserById(id: number): Observable<User> {
    // Check if the user details have already been cached
    if (this.userCache.has(id)) {
      // Return the cached Observable if available
      return of(this.userCache.get(id)!);
    }

    const url = `${this.baseUrl}/${id}`;
    return this.http.get<SingleUserResponse>(url).pipe(
      map(response => {
        // Cache the user details using the user ID as the key
        this.userCache.set(id, response.data);
        return response.data;
      })
    );
  }
}
