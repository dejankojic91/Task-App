import { Component, OnInit } from '@angular/core';

import { MemberService } from './../member.service';

@Component({
    selector: 'app-membersOverview',
    templateUrl: './memberOverview.component.html',
    styleUrls: ['./memberOverview.component.css']
})

export class MembersOverviewComponent implements OnInit{
    public members: any;

    constructor(public memberService: MemberService) {}

    ngOnInit() {
        this.getAllMembers();
    }

    /**
     * Get All Members
     */
    getAllMembers() {
        this.memberService.getAllMembers().subscribe(
            res => {
                this.members = res.members;
                console.log(this.members);
            },
            error => { 
                console.log("Error happened" + error)
            }
        );
    }

}