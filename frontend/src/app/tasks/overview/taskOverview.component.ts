import { Component, OnInit } from '@angular/core';
import { TaskService } from './../task.service';

@Component({
    selector: 'task-overview',
    templateUrl: './taskOverview.component.html',
    styleUrls: ['./taskOverview.component.css']
})

export class TasksOverviewComponent implements OnInit{
    public allTasks: any;
    
    constructor(private taskService: TaskService){}

    ngOnInit() {
        this.getAllTasks();
    }

    /**
     * Get All Task
     */
    getAllTasks() {
        this.taskService.getAllTasks().subscribe(
            res => {
                this.allTasks = res.tasks;
            },
            error => { 
                console.log("Error happened" + error)
            }
        );
    }
}