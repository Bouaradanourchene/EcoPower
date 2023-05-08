import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../entities/event";
import {CategoryProduct} from "../../../entities/category-product";
import {ProductService} from "../../../services/product.service";
import {EventService} from "../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit{

  @Input() events: Event[] = [];
  eventList!: Array<Event>;
  public form: FormGroup;
  currentPage = 1;
  itemsPerPage = 5;
  searchTerm: string;




  constructor(public eventService: EventService,private fb: FormBuilder,private toastr:ToastrService) {

  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((res:Event[]) => {
      console.log(res);
      this.eventList = res.filter((event:Event)=>event.approved==true);;
    });

  }


  upcomingEvents(){
    this.eventService.upcomingEvents().subscribe((events:Event[])=>{
      this.eventList=events.filter((event:Event)=>event.approved);
    })
  }

  finishedEvents(){
    this.eventService.eventfinished().subscribe((events:Event[])=>{
      this.eventList=events.filter((event:Event)=>event.approved);
    })
  }



}
