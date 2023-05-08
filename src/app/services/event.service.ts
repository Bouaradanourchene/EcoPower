import { Injectable } from '@angular/core';
import {Event} from "../entities/event";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseUrl = 'http://localhost:9091/Event/'


  public dataForm!: FormGroup;

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.baseUrl + 'all');
  }

  getEventById(id: number): Observable<Event> {
    return this.httpClient.get<Event>(`${this.baseUrl}get/` + id);
  }
  addEvent(event: Event): Observable<Event> {
    return this.httpClient.post(this.baseUrl + 'add', event);
  }


  updateEvent(event: Event): Observable<any> {
    return this.httpClient.put(this.baseUrl + 'update', event);
  }

  deleteEvent(id:number): Observable<Event> {
    return this.httpClient.delete(`${this.baseUrl}delete/${id}`);
  }

  upcomingEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.baseUrl + 'upcomingEvents');
  }

  eventfinished(): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.baseUrl + 'eventFinished');
  }
}
