import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { url } from './../config';

@Injectable()

export class AuthorisationService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

public domain = url;
public authToken: any;
public userId: any;
public options: any;

  constructor( private http: Http) { }

  /**
    * Register User
    * params user, files
  */
  registerUser(user: any, files: any) {
    let formData: FormData = new FormData(),
    xhr: XMLHttpRequest = new XMLHttpRequest();
    for (let i = 0; i < files.length; i++) {
      formData.append("profileImg", files[i], files[i].name);
    }
    formData.append('email', user.email);
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    return this.http.post(this.domain + 'api/register', formData )
    .map((res: Response) => res.json())
    .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
    * Login User
    * params user
  */
  loginUser(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.domain + 'api/login', body, {headers: headers})
    .map((res: Response) => res.json())
    .catch((error: Response) => Observable.throw(error.json()));
  }

  /**
    * LogOut clear localstorage
    * 
  */
  logOut() {
    localStorage.clear();
  }

  /**
    * Authorisation Header
    *
  */
  authHeaders() {
    this.authToken = localStorage.getItem('token');
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization' : this.authToken
      })
    });
    return this.options;
  }

  /**
    * Store User Data in localstorage
    * @params token, userId
  */
  storeUserData(token: any, userId: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    this.authToken = token;
    this.userId = userId;
    this.emitUserID();
  }

  emitUserID () {
    let userId = localStorage.getItem('userId');
    this.getLoggedInName.emit(userId);  
  }
  /**
   * Get Current User ID
   */
  getUserId(){
    return localStorage.getItem('userId');
  }

  /**
    * Check if User logedin 
  */
  loggedIn() {
    return tokenNotExpired();
  }
}