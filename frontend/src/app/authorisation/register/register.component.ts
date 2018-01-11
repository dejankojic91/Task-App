
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthorisationService } from './../authorisation.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'register-navbar',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
    formRegister: FormGroup;
    public file: any;
    public filesToUpload: Array<File> = [];
    public imgSrc: any;
    @ViewChild('fileInput') fileInput : ElementRef;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authorisationService: AuthorisationService,
        private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {
        this.formRegister = this.formBuilder.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            username: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
        });
    }

    isFieldValid(field: string){
        return !this.formRegister.get(field).valid && this.formRegister.get(field).touched;
    }

    displayFieldCss(field: string){
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        }
    }

    /**
      * fileChangeEvent function upload User profile image
      * @params fileInput 
    */
    fileChangeEvent(fileInput: any) {
        let file = fileInput.target.files[0];
        let FileList: FileList = fileInput.target.files;
        for (let i = 0, length = FileList.length; i < length; i++) {
            this.filesToUpload.push(FileList.item(i));
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
              this.imgSrc = reader.result;
         }
    }

    /**
      * onSubmit function
    */
    onSubmit() {
        if(this.formRegister.valid){
            this.file  = this.filesToUpload;
            const user = {
                email: this.formRegister.value.email,
                username: this.formRegister.value.username,
                password: this.formRegister.value.password,
                firstName: this.formRegister.value.firstName,
                lastName: this.formRegister.value.lastName
            }
            this.authorisationService.registerUser(user, this.file).subscribe(
                (data: any) => {
                    if (!data.success) {
                        this._flashMessagesService.show(data.message, { cssClass: 'alert alert-danger', timeout: 2000 });
                    } else {
                        this._flashMessagesService.show(data.message, { cssClass: 'alert alert-success', timeout: 2000 });
                        this.router.navigate(['/login']);
                    }
                }
            );
        } else {
            this.validateAllFormFields(this.formRegister);
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

    
}