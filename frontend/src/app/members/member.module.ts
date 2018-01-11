import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemberMasterComponent } from './member-master/member-master.component';
import { MemberService } from './member.service';
import { MembersOverviewComponent } from './overview/memberOverview.component';
import { MembersFormComponent } from './form/memberForm.component';
import { MembersDisplayComponent } from './display/memberDisplay.component';
import { MembersRoutingModule } from './member-routing.module';

@NgModule({
    declarations: [
        MembersOverviewComponent,
        MembersDisplayComponent,
        MembersFormComponent,
        MemberMasterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MembersRoutingModule
    ],
    providers: [MemberService]
})

export class MemberModule{}