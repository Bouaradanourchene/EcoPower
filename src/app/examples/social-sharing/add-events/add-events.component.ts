import {Component, OnInit} from '@angular/core';
import {Event} from '../../../entities/Event';
import {EventComments} from '../../../entities/EventComments';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from '../../../entities/user';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventCommentService} from '../../../services/event-comment.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.scss']
})
export class AddEventsComponent implements OnInit{


  isSaving:boolean;
  event!:Event;
  comments!:EventComments[];
  eventForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required,  Validators.minLength(25),  Validators.maxLength(3000)]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    placeNumber: ['', [Validators.required]],
  });

  user:User;

  displayedItems = 3;
  disabled:boolean;





  constructor(public eventService: EventService,
              private route: ActivatedRoute,
              private router:Router,
              private fb: FormBuilder,
              private commentService: EventCommentService,
              private toastr:ToastrService) {}

  ngOnInit(): void {


  }

  addEvent(){
    this.event= new Event();
    this.event.title = this.eventForm.get(['title'])!.value;
    this.event.description = this.eventForm.get(['description'])!.value;
    this.event.startDate = this.eventForm.get(['startDate'])!.value;
    this.event.endDate = this.eventForm.get(['endDate'])!.value;
    this.event.placeNumber=this.eventForm.get(['placeNumber'])!.value;
    this.event.approved=false;
    this.eventService.addEvent(this.event).subscribe((res:Event) => {
      console.log(res);
      this.router.navigate(['/events']);
    });

  }

  return(){
    this.router.navigate(['/events']);
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getendDate(): string {
    const currentDate = new Date(this.eventForm.get(['startDate'])!.value);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getmaxStartDate(): string {
    const currentDate = new Date(this.eventForm.get(['endDate'])!.value);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }





}
