import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberMasterComponent } from './member-master/member-master.component';
import { MembersFormComponent } from './form/memberForm.component';
import { MembersDisplayComponent } from './display/memberDisplay.component';
import { MembersOverviewComponent } from './overview/memberOverview.component';

const accountRoutes: Routes = [
    {
        path: '',
        component: MemberMasterComponent,
        children: [
            { 
                path: '', 
                component: MembersOverviewComponent 
            },
            { 
                path: 'display/:id', 
                component: MembersDisplayComponent 
            },
            { 
                path: 'edit', 
                component: MembersFormComponent 
            },
            { 
                path: 'edit/:id', 
                component: MembersFormComponent 
            }
        ]
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(accountRoutes)
    ],
    exports: [RouterModule]
})

export class MembersRoutingModule{}