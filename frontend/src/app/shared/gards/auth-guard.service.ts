import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthorisationService } from '../../authorisation/authorisation.service';




@Injectable()
export class AuthGuard implements CanActivate {

  public redirectUrl: any;

  constructor(
    private authService: AuthorisationService, 
    private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}