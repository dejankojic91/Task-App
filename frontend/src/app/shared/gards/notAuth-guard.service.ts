import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorisationService } from '../../authorisation/authorisation.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private authService: AuthorisationService, 
    private router: Router) {}

  canActivate() {
    if(this.authService.loggedIn()){
        this.router.navigate(['/tasks']);
        return false;
    } else {
        return true;
    }
  }
}