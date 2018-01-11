import { AppService } from './../../app.service';

import { Component, OnInit,  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthorisationService } from './../authorisation.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'login-navbar',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    formLogin: FormGroup;

    constructor( 
        private formBuilder: FormBuilder,
        private router: Router,
        private authorisationService: AuthorisationService,
        private appService: AppService,
        private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {
        this.formLogin = this.formBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    isFieldValid(field: string){
        return !this.formLogin.get(field).valid && this.formLogin.get(field).touched;
    }

    displayFieldCss(field: string){
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
              } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
              }
        })
    }
    
    /**
      * onSubmit function
    */
    onSubmit() {
        if(this.formLogin.valid){
            const user = {
                email: this.formLogin.value.email,
                password: this.formLogin.value.password,
            }
            this.authorisationService.loginUser(user).subscribe(
                (data: any) => {
                    if (!data.success) {
                        this._flashMessagesService.show(data.message, { cssClass: 'alert alert-danger', timeout: 1500 });
                    } else {
                        this._flashMessagesService.show(data.message, { cssClass: 'alert alert-success', timeout: 1500 });
                        this.authorisationService.storeUserData(data.token, data.userId);   
                                
                        this.router.navigate(['/tasks']);
                    }
                }
            );
        } else {
            this.validateAllFormFields(this.formLogin);
        }
    }
}