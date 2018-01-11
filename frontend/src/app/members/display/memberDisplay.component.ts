import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MemberService } from './../member.service';

@Component({
    selector: 'app-memberDisplay',
    templateUrl: './memberDisplay.component.html',
    styleUrls: ['./memberDisplay.component.css']
})

export class MembersDisplayComponent implements OnInit{
    private currentUrl: any;
    public member: any;

    constructor(
        private memberService: MemberService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.currentUrl = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        if (this.currentUrl.id) {
            this.getMemberById();
        }
    }

    /**
     * Get Member By Id
     */
    getMemberById() {
        //Get Current Id
        this.memberService.getMemberById(this.currentUrl.id).subscribe(
            res => {
                this.member = res.member;
                console.log('TaskDisplay::::', this.member);
            },
            error => { 
                console.log("Error happened" + error)
            }
        );

    }
}