import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskMasterComponent } from './task-master/task-master.component';
import { TasksFormComponent } from './form/taskForm.component';
import { TasksDisplayComponent } from './display/taskDisplay.component';
import { TasksOverviewComponent } from './overview/taskOverview.component';

const accountRoutes: Routes = [
    {
        path: '',
        component: TaskMasterComponent,
            children: [
                { 
                    path: '', 
                    component: TasksOverviewComponent 
                },
                { 
                    path: 'display/:id', 
                    component: TasksDisplayComponent 
                },
                { 
                    path: 'new', 
                    component: TasksFormComponent 
                },
                { 
                    path: 'edit/:id', 
                    component: TasksFormComponent 
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

export class TaskRoutingModule{}