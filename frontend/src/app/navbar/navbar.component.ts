import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from '../authorisation/authorisation.service';
import { Router } from '@angular/router'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
    constructor( 
        private authorisationService: AuthorisationService,
        private router: Router
    ) {}

    ngOnInit() {

    }

    /**
     * LogOut User function
    */
    logOut() {
         this.authorisationService.logOut();
         this.router.navigate(['/login']);
    }

    /**
     * Check if User logedin
    */
    isLoggedIn() {
        return this.authorisationService.loggedIn();
    }
}