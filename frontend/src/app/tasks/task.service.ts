import { AuthorisationService } from './../authorisation/authorisation.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { url } from './../config';

@Injectable()
export class TaskService {
  public domain = url;
  public authToken: any;
  public headers: any;
  public options: any;
 
  constructor( 
    private http: Http,
    private authorisationService: AuthorisationService) {}

  /**
   * Authorisation Header
   */
  authHeaders() {
    this.authToken = localStorage.getItem('token');
    this.options = new RequestOptions({
        headers: new Headers({
            'Authorization' : this.authToken
        })
    });
    return this.options;
  }

  /**
   * New Task
   * @param task 
   * @param files 
  */
  newTask(task: any, files: any) {
    let formData: FormData = new FormData(),
    xhr: XMLHttpRequest = new XMLHttpRequest();
    for (let i = 0; i < files.length; i++) {
      formData.append("taskFiles", files[i], files[i].name);
    }
    formData.append('title', task.title);
    formData.append('date', task.date);
    formData.append('description', task.description);
    formData.append('priority', task.priority);
    formData.append('problemStatus', task.problemStatus);
    formData.append('dateOfCompletion', task.dateOfCompletion);
    formData.append('status', task.status);
    this.options = this.authHeaders();
    
    return this.http.post(this.domain + 'api/new', formData , {headers: this.options.headers})
    .map((res: Response) => res.json());
  }

  /**
   * Get All Tasks
   */
  getAllTasks(){
    return this.http.get(this.domain + 'api/tasks')
    .map((res: Response) => res.json());
  }

  /**
   * Get Task By Id
   * @param id 
   */
  getTaskById(id: any){
    console.log(id);
    return this.http.get(this.domain + 'api/task/' + id)
    .map((res: Response)=> res.json());
  }

  /**
   * Update task
   * @param task 
   * @param id 
   */
  updateTask(task: any, files: any, id: any) {
    let formData: FormData = new FormData(),
    xhr: XMLHttpRequest = new XMLHttpRequest();
    for (let i = 0; i < files.length; i++) {
      formData.append("taskFiles", files[i], files[i].name);
    }
    formData.append('title', task.title);
    formData.append('date', task.date);
    formData.append('description', task.description);
    formData.append('priority', task.priority);
    formData.append('problemStatus', task.problemStatus);
    formData.append('dateOfCompletion', task.dateOfCompletion);
    formData.append('status', task.status);
    this.options = this.authHeaders();
    
    return this.http.put(this.domain + 'api/update/' + id, formData , {headers: this.options.headers})
    .map((res: Response) => res.json());
  }
  
  /**
   * Delete Task
   * @param id 
   */
  deleteTask(id: any){
    this.options = this.authorisationService.authHeaders();
    return this.http.delete(this.domain + 'api/delete/' + id, {headers: this.options.headers})
    .map((res: Response) => res.json());
  }

  /**
   * New Comment Task
   * @param commentData 
   */
  newComment(commentData: any) {
    this.options = this.authorisationService.authHeaders();
    return this.http.post(this.domain + 'api/comment', commentData , {headers: this.options.headers})
    .map((res: Response) => res.json());
  }

  /**
   * Update Comment Task
   * @param updatecommentData 
   * @param id 
  */
  updateComment(updatecommentData: any, id: any) {
    this.options = this.authorisationService.authHeaders();
    return this.http.put(this.domain + 'api/commentUpdate/' + id, updatecommentData , {headers: this.options.headers})
    .map((res: Response) => res.json());
  }

}