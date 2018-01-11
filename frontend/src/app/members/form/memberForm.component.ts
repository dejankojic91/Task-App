
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


import { MemberService } from './../member.service';

@Component({
    selector: 'app-memberForm',
    templateUrl: './memberForm.component.html',
    styleUrls: ['./memberForm.component.css']
})

export class MembersFormComponent implements OnInit{
    private currentUrl: any;
    public member: any;
    @ViewChild('f') memberForm: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private memberService: MemberService
    ) {
        this.currentUrl = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        if (this.currentUrl.id) {
            this.getMemberById();
        }
    }

    getMemberById() {
        this.memberService.getMemberById(this.currentUrl.id).subscribe(
            res => {
                this.member = res.member;
                console.log('TaskDisplay::::', this.member);
                this.memberForm.form.patchValue({
                    function: this.member.function,
                    phoneNumber: this.member.phoneNumber,
                    mobilePhoneNumber: this.member.mobilePhoneNumber,
                    group: this.member.group
                });

            },
            error => { 
                console.log("Error happened" + error)
            }
        );
    }


    onSubmit() {
        const member = {
            function: this.memberForm.value.function,
            phoneNumber: this.memberForm.value.phoneNumber,
            mobilePhoneNumber: this.memberForm.value.mobilePhoneNumber,
            group: this.memberForm.value.group
        }
        console.log(member);
        this.memberService.updateMember(member, this.currentUrl.id).subscribe(
            (data: any) => {
                console.log('Task Updated',data);
                this.router.navigateByUrl('/members/display/' + this.currentUrl.id);
            }
        );

    }

    closeForm() {
        if(!this.currentUrl.id) {
            this.router.navigate(['/members']);
        } else {
            this.router.navigate(['/members/display/', this.currentUrl.id]);
        }
    }


}