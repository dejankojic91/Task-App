import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { url } from './config';


@Injectable()
export class AppService {

  public domain = url;
  
  
  constructor( 
      private http: Http
    ) {
      

     }


  //Get Task by Id
  getCurrentUser(userId: any){
    console.log(userId);
    return this.http.get(this.domain + 'api/currentUser/' + userId)
    .map((res: Response)=> res.json());
  }



}