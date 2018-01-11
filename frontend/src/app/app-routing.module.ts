
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './authorisation/register/register.component';
import { LoginComponent } from './authorisation/login/login.component';
import { AuthGuard } from './shared/gards/auth-guard.service';
import { NotAuthGuard } from './shared/gards/notAuth-guard.service';

const appRoutes: Routes = [
    { 
        path: '', 
        redirectTo: '/register', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        component: LoginComponent, 
        canActivate: [NotAuthGuard]
    },
    { 
        path: 'register', 
        component: RegisterComponent, 
        canActivate: [NotAuthGuard]
    },
    {
        path: '',  
        loadChildren: './account/account.module#AccountModule', 
        canActivate: [AuthGuard] 
    },
    {
        path: 'tasks',  
        loadChildren: './tasks/task.module#TasksModule', 
        canActivate: [AuthGuard] 
    },
    {
        path: 'members',  
        loadChildren: './members/member.module#MemberModule', 
        canActivate: [AuthGuard] 
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})

export class AppRoutingModule {}