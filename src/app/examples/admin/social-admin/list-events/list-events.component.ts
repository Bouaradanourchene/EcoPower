import {Component, Input} from '@angular/core';
import {Event} from '../../../../entities/Event';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventService} from '../../../../services/event.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent {

  @Input() events: Event[] = [];
  eventList!: Array<Event>;
  public form: FormGroup;
  currentPage = 1;
  itemsPerPage = 5;
  searchTerm: string;
  event:Event;





  constructor(public eventService: EventService,private fb: FormBuilder) {


  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe((res:Event[]) => {
      console.log(res);
      this.eventList = res;
    });

  }

  deleteEvent(id:number){

    this.eventService.deleteEvent(id).subscribe((event:Event)=>{
      this.getEvents();
    })
  }

  approved(event:Event){

    if(event.approved){
      event.approved=false;

    }else {
      event.approved=true;
    }
    this.eventService.updateEvent(event).subscribe((event:Event)=>{
      this.getEvents();
    })
  }


  onChange(value:any){


    if(value.target.value==0){
      console.log(value.target.value);
      this.getEvents();

    }
    if(value.target.value==1){
      this.upcomingEvents();
      console.log(value.target.value);
    }
    if(value.target.value==2){
      this.finishedEvents();
      console.log(value.target.value);
    }
    if(value.target.value==3){
      this.approvedEvents();
      console.log(value.target.value);
    }
    if(value.target.value==4){
      this.notApprovedEvents()
    }
  }



  upcomingEvents(){
    this.eventService.upcomingEvents().subscribe((events:Event[])=>{
      this.eventList=events;
    })
  }

  finishedEvents(){
    this.eventService.eventfinished().subscribe((events:Event[])=>{
      this.eventList=events;
    })
  }

  approvedEvents(){
    this.eventService.getEvents().subscribe((events:Event[])=>{
      this.eventList=events.filter((event:Event)=>event.approved==true);
    })
  }

  notApprovedEvents(){
    this.eventService.getEvents().subscribe((events:Event[])=>{
      this.eventList=events.filter((event:Event)=>event.approved==false);
    })
  }

}
