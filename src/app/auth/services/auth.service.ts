import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/enviroments';
import { User } from '../interfaces/user.interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = enviroments.baseUrl;
  private user?: User;

  constructor(
    private http: HttpClient,
  ) { }

  get currentUser(): User|undefined {
    if(!this.user) return undefined
    return structuredClone(this.user);
  }

  login(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem("token", "asdhkaKJHAKSHKAJKHDSalsd"))
    )
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem("token");
  }

  checkAuthentication(): Observable<boolean> | boolean {
    if( !localStorage.getItem("token")) return false;
    const token = localStorage.getItem("token");
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(error => of(false))
    )
  }

}
