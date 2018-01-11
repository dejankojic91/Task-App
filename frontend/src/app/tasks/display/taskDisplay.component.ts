import { AuthorisationService } from './../../authorisation/authorisation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ElementRef } from '@angular/core';
import { TaskService } from '../task.service';
import { AppService } from '../../app.service';


@Component({
    selector: 'task-display',
    templateUrl: './taskDisplay.component.html',
    styleUrls: ['./taskDisplay.component.css']
})

export class TasksDisplayComponent implements OnInit{

    private currentUrl: any;
    public task: any;
    public comments: any[];
    private newComment: any;
    public currentUser: any;
    public currentUserId: any;
    public livevisible: Boolean = false;
    public updateCommentData: any;


    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private authorisationService: AuthorisationService,
        private appService: AppService
    ) {}

    ngOnInit() {
        this.currentUrl = this.activatedRoute.snapshot.params;

        this.getTaskById();
        this.getCurrentUser();
    }


    getCurrentUser() {
        this.currentUserId = this.authorisationService.getUserId();
        this.appService.getCurrentUser(this.currentUserId).subscribe(
            res => {
                this.currentUser = res;
            },
            error => { 
                console.log("Error happened" + error)
            }
        );
    }

    getTaskById() {
        this.taskService.getTaskById(this.currentUrl.id).subscribe(
            res => {
                this.task = res.task;
                this.comments = res.task.comments;

                console.log(this.comments);
                console.log('TaskDisplay::::', this.task);
            },
            error => { 
                console.log("Error happened" + error);
            }
        );
    }

    deleteTaks(taskId: any){
        this.taskService.deleteTask(taskId).subscribe(
            res => {
                console.log('Task Deletes');
                this.router.navigateByUrl('/tasks');
            },
            error => {
                console.log("Error happened" + error);
            }
        );
    }

    submitComment(event: any){
        event.stopPropagation();
        console.log(this.newComment);
        let commentData = {
            id: this.currentUrl.id,
            comment: this.newComment,
            userId:  this.currentUser._id,
            livevisible: this.livevisible
        }
        this.taskService.newComment(commentData).subscribe(
            res => {
                console.log('New Comment', res);
                this.newComment = '';
                this.getTaskById();
            },
            error => {
                console.log("Error happened" + error);
            }
        );
    }

    submitUpdateComment(event: any, id: any) {
        event.stopPropagation();
        console.log('uslo', this.currentUser);
        let updateCommentData = {
            commentId: id,
            comment: this.updateCommentData,
            userId:  this.currentUser._id,
            livevisible: this.livevisible
        }

        this.taskService.updateComment(updateCommentData, this.currentUrl.id).subscribe(
            res => {
                console.log('Update Comment', res);
                this.updateCommentData = '';
                this.getTaskById();
            },
            error => {
                console.log("Error happened" + error);
            }
        );
    }


    resolvePriorityColor(status: any) {
        switch (status) {
            case 'High': return 'color-high';
            case 'Middle': return 'color-middle';
            case 'Low': return 'color-low';
        }
    }



    showCommentArea(comment: any) {
        console.log(comment);
        if (this.currentUserId == comment.createdBy._id) {
            for (let x in this.comments) {
                if (this.comments[x].livevisible) {
                    this.comments[x].livevisible = false;
                }
            }
            comment.livevisible = true;
            this.updateCommentData = comment.comment;
        }  
    }

    hideCommentArea(event: any, comment: any) {
        event.stopPropagation();
        comment.livevisible = false;
    }

}