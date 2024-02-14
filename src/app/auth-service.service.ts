import { Router } from '@angular/router';
import { User } from './user.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  user = new BehaviorSubject<User | null>(null);
  timeout = new Subject<boolean>();
  private tokenExirationTimer: any;

  serviceUrl: string = "http://localhost:8080/api/v1.0/moviebooking/";

  constructor(private http: HttpClient, private router: Router) {
  }

  createCusomer(user: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl + "register", user);
  }

  loginCustomer(user: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl + "login", user);
  }

  forgot(username: any): Observable<any> {
    return this.http.get<any>(this.serviceUrl + "forgot/" + username);
  }
  updatePassword(user: any, userName: any): Observable<any> {
    return this.http.post<any>(this.serviceUrl + "updatePassword/" + userName, user);
  }

  checklogin() {
    const user = localStorage.getItem('userData');
    if (!user) {
      return false;
    }
    return true;
  }

  loginData(user: any,
    token: string,
    serverCurrentTime: number,
    tokenExpirationTime: number) {
    const data = new User(
      user,
      token,
      serverCurrentTime,
      tokenExpirationTime
    );
    this.storeUser(data);

  }

  autoLogin() {

    const user = localStorage.getItem('userData');
    if (!user) return;

    const parsedUser: {
      user: any;
      _token: string;
      serverCurrentTime: number;
      _tokenExpirationTime: number;
    } = JSON.parse(user);
    const loadedUser = new User(
      parsedUser.user,
      parsedUser._token,
      parsedUser.serverCurrentTime,
      parsedUser._tokenExpirationTime
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        loadedUser.tokenExpirationTime - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExirationTimer = setTimeout(() => {
      this.timeout.next(true);
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    this.removeUser();
    if (this.tokenExirationTimer) {
      clearTimeout(this.tokenExirationTimer);
    }
    this.tokenExirationTimer = null;
  }

  private storeUser(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private removeUser() {
    localStorage.removeItem('userData');
  }


}
