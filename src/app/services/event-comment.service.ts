import { Injectable } from '@angular/core';
import {Event} from "../entities/event";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventComments} from "../entities/EventComments";

@Injectable({
  providedIn: 'root'
})
export class EventCommentService {

  baseUrl = 'http://localhost:9091/EventComment/'


  constructor(private httpClient: HttpClient) { }

  getComments(): Observable<EventComments[]> {
    return this.httpClient.get<EventComments[]>(this.baseUrl + 'all');
  }

  getCommentById(id: number): Observable<EventComments> {
    return this.httpClient.get<EventComments>(`${this.baseUrl}get/` + id);
  }
  addComment(eventComment: EventComments): Observable<EventComments> {
    return this.httpClient.post(this.baseUrl + 'add', eventComment);
  }


  updateComment(eventComment: EventComments): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'update', eventComment);
  }

  deleteComment(id:string): Observable<EventComments> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  findByEvent(id:number): Observable<EventComments[]> {
    return this.httpClient.get<EventComments[]>(`${this.baseUrl}getComments/${id}`);
  }
}
