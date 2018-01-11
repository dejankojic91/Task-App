import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GlobalModule } from './../shared/global-module/global-module.module';
import { TaskMasterComponent } from './task-master/task-master.component';
import { TaskService } from './task.service';
import { TaskRoutingModule } from './task-routing.module';
import { TasksOverviewComponent } from './overview/taskOverview.component';
import { TasksDisplayComponent } from './display/taskDisplay.component';
import { TasksFormComponent } from './form/taskForm.component';

@NgModule({
    declarations: [
        TasksOverviewComponent,
        TasksDisplayComponent,
        TasksFormComponent,
        TaskMasterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TaskRoutingModule,
        GlobalModule
        
    ],
    providers: [TaskService]
})

export class TasksModule{}