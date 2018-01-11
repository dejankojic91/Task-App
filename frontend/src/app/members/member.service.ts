import { AuthorisationService } from './../authorisation/authorisation.service';


import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { url } from './../config';


@Injectable()
export class MemberService {

  public domain = url;
  public authToken: any;
  public headers: any;
  
  constructor( private http: Http, private authService: AuthorisationService) { }

  /**
   * Get All Members
   */
  getAllMembers(){
    return this.http.get(this.domain + 'api/members')
    .map((res: Response) => res.json());
  }

  /**
   * Get Member by Id
   * @param id 
   */
  getMemberById(id: any){
    console.log(id);
    return this.http.get(this.domain + 'api/member/' + id)
    .map((res: Response)=> res.json());
  }



  updateMember(member: any, id: any) {
    let options = this.authService.authHeaders();
    return this.http.put(this.domain + 'api/updateMember/' + id, member, {headers: options.headers})
    .map((res: Response) => res.json());
  }
}