import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobalModule } from './../shared/global-module/global-module.module';
import { AccountMasterComponent } from './account-master/account-master.component';
import { AccountRoutingModule } from './account-routing.module';
import { EditAccountComponent } from './editAccount/editAccount.component';
import { AccountService } from './account.service';


@NgModule({
    declarations: [
        EditAccountComponent,
        AccountMasterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AccountRoutingModule,
        GlobalModule
    ],
    providers: [AccountService]
})

export class AccountModule{}