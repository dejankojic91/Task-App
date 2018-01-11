import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'


import { AppService } from './../app.service';
import { AuthorisationService } from './../authorisation/authorisation.service';



//------Napravi typove i za ostalo odvojeni fajl------ 
export interface User {
    _id: String,
    firstName: String,
    lastName: String,
    profileImage: String
}

@Component({
    selector: 'left-navbar',
    templateUrl: './left-navigation.component.html',
    styleUrls: ['./left-navigation.component.css']
})

export class LeftNavbarComponent implements OnInit{
    public user: any;
    public currentUserId: any;
 
    constructor( 
        private appService: AppService,
        private authorisationService: AuthorisationService
    ) {
        this.authorisationService.getLoggedInName.subscribe((userId: any) => {this.getCurrentUser(userId)});
    }

    ngOnInit() {
        this.currentUserId = this.authorisationService.getUserId();
        if(this.currentUserId){
            this.getCurrentUser(this.currentUserId);
        }
    }

    /**
     * Get Curent User Id
     */
    getCurrentUser(id:any) {
        this.appService.getCurrentUser(id).subscribe(
            (res: any) => {
                this.user = res;
                console.log('User', this.user);
            }
        );
      }

    /**
      * Check if User logedin 
    */
    isLoggedIn() {
        return this.authorisationService.loggedIn();
    }
    
}