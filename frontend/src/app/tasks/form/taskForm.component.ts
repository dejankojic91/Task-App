import { TaskService } from './../task.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {IMyOptions, IMyDateModel} from 'mydatepicker';


@Component({
    selector: 'task-form',
    templateUrl: './taskForm.component.html',
    styleUrls: ['./taskForm.component.css']
})

export class TasksFormComponent implements OnInit{

    @ViewChild('f') taskForm: any;

    private currentUrl: any;
    public task: any;
    public Date: any;
    public formatedDate: any;
    public dateOfCompletion: any;
    public formatedDateOfCompletion: any;
    public taskHeader: String;

    public files: any;
    public uploadedFiles: any = [];
    public filesToDelete: any = [];

    constructor(
        private taskService: TaskService, 
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ){
        this.currentUrl = this.activatedRoute.snapshot.params;
    }

    ngOnInit() {
        if (this.currentUrl.id) {
            this.taskHeader="Update Task";
            this.getTaskById();
        } else {
            this.taskHeader="New Task";
        }
    }


    
    fileChangeEvent(event: any, input: any) {
        let files = event.target.files;
        console.log(files);
       let FileList: FileList = event.target.files;
        console.log(FileList);
        for (let i = 0, length = FileList.length; i < length; i++) {
            this.uploadedFiles.push(FileList.item(i));
        }
        console.log(this.uploadedFiles);
    }


    removeSelectedFile(array: any, index: any) {
        var removed = array.splice(index, 1);
        console.log(removed);
       /* var clean = [];
        for (let i = 0; i < removed.length; i++){
            if (removed[i].ID){
                clean.push(removed[i]);
            }
        }
        this.filesToDelete = this.filesToDelete.concat(clean);*/
    }

    onDateChanged(event: IMyDateModel) {
        // date selected
        console.log('Formatted date: ', event.formatted);
        this.formatedDate = event.formatted;
    }

    onDateOfCompletionChanged(event: IMyDateModel) {
        this.formatedDateOfCompletion = event.formatted;
    }

    //Creat new Task
    onSubmitTask(form: any, status: any) {
        let filesArray  = this.uploadedFiles;
        if(form.value.date) {
            this.Date = this.formatedDate;
            console.log(this.Date);
        }
        if(form.value.dateOfCompletion) {
            this.dateOfCompletion = this.formatedDateOfCompletion
            console.log(this.dateOfCompletion);
        }
        const taks = {
            title: form.value.title,
            date: this.Date,
            description: form.value.description,
            priority: form.value.priority,
            problemStatus: form.value.problemStatus,
            dateOfCompletion: this.dateOfCompletion,
            status: status
        }
        console.log('Task compon',taks);
        
        if(!this.currentUrl.id) {
            //Create New
            this.taskService.newTask(taks, filesArray).subscribe(
                (data: any) => {
                    console.log('New Task Created',data);
                    this.router.navigateByUrl('/tasks');
                }
            );
        } else {
            //Update
            this.taskService.updateTask(taks, filesArray, this.currentUrl.id).subscribe(
                (data: any) => {
                    console.log('Task Updated',data);
                    this.router.navigateByUrl('/tasks/display/' + this.currentUrl.id);
                }
            );
        }

    }

    //Set Status Draft
    saveAsDraft() {
        this.taskForm.value.status = "Draft";
        this.onSubmitTask(this.taskForm, this.taskForm.value.status);
    }
    //Set Status In Progress
    activateTask() {
        this.taskForm.value.status = "In Progress";
        this.onSubmitTask(this.taskForm, this.taskForm.value.status);
    }

    /**
     * Get Task By Id
     */
    getTaskById() {
        this.taskService.getTaskById(this.currentUrl.id).subscribe(
            res => {
                this.task = res.task;
                this.uploadedFiles = this.task.attachment;
                console.log('TaskDisplay::::', this.task);
                if(this.task.date) {
                    let d = new Date(this.task.date);
                    this.Date = { date: { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() } };    
                }
                if(this.task.dateOfCompletion) {
                    let dOfCompl = new Date(this.task.dateOfCompletion);
                    this.dateOfCompletion = { date: { year: dOfCompl.getFullYear(), month: dOfCompl.getMonth() + 1, day: dOfCompl.getDate() } };
                }
                this.taskForm.form.patchValue({
                    title: this.task.title,
                    date: this.Date,
                    description: this.task.description,
                    priority: this.task.priority,
                    problemStatus: this.task.problemStatus,
                    dateOfCompletion:  this.dateOfCompletion,
                    status: this.task.status
                });
                console.log(this.taskForm);
            },
            error => { 
                console.log("Error happened" + error)
            }
        );
    }

 
    isVisible() {
        if (this.task) {
            if(this.task.status == "In Progress"){
                console.log('uslo1');
                return false;
            } else if(this.task.status == "Draft"){
                return true;
            }
        } else {
            return true;
        }
    }

    closeForm() {
        if(!this.currentUrl.id) {
            this.router.navigate(['/tasks']);
        } else {
            this.router.navigate(['/tasks/display/', this.currentUrl.id]);
        }
    }



}