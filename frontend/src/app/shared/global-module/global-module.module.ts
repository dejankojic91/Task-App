import { SearchFilter } from './../components/search/search.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { MyDatePickerModule } from 'mydatepicker';
import { SelectModule } from 'ng2-select';
import { CommentsComponent } from '../components/comments/comments.component';
import { SearchComponent } from '../components/search/search.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  imports: [
      CommonModule,
      MyDatePickerModule,
      SelectModule,
      FlashMessagesModule
  ],
  declarations: [
    CommentsComponent,
    SearchComponent,
    SearchFilter
  ],
  providers: [

  ],
  exports: [
      TabsModule,
      MyDatePickerModule,
      SelectModule,
      CommentsComponent,
      SearchComponent,
      SearchFilter,
      FlashMessagesModule
  ]
})
export class GlobalModule { }
