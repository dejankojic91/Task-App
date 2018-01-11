import { AppService } from './../../../app.service';
import { Component, ChangeDetectionStrategy, EventEmitter, Input, ViewChild, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'comments-panel',
    templateUrl: './comments.component.html',
   // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {

    
    private currentUserId: any;
    private saving: boolean = false;

    @Input() data: any;
    @Input() privilages: any;
    private comments: any = [];
    private iCanAddNew = false;
    @Output()
    public save: EventEmitter<any> = new EventEmitter();
    @Output()
    public update: EventEmitter<any> = new EventEmitter();
    

    //@ViewChild('newComment') newComment; 

    constructor(private appService: AppService) {
        
    }

    ngOnInit() {
       /* this.appSvc.getCurrentUserInfo((data) => {
            this.defaultUserImage = this.appSvc.keywordValue.WiW.PhotoDefaultPicture;
            this.currentUserId = data.user.userId;
        });*/


        //this.appService.getCurrentUser


        console.log(this.data);
    }




}