



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountMasterComponent } from './account-master/account-master.component';
import { EditAccountComponent } from './editAccount/editAccount.component';



const accountRoutes: Routes = [
    {path: '',
    component: AccountMasterComponent,
    children: [
        { path: 'editAccount', component: EditAccountComponent }
    ]}
];


@NgModule({
    imports:[
        RouterModule.forChild(accountRoutes)
    ],
    exports: [RouterModule]
})

export class AccountRoutingModule{}