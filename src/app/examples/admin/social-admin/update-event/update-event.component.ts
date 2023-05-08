import {Component, OnInit} from '@angular/core';
import {Event} from '../../../../entities/Event';
import {EventComments} from '../../../../entities/EventComments';
import {FormBuilder, Validators} from '@angular/forms';
import {EventService} from '../../../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventCommentService} from '../../../../services/event-comment.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit{


  isSaving:boolean;
  event!:Event;
  idEvent!:number;
  comments!:EventComments[];
  eventForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required,  Validators.minLength(25),  Validators.maxLength(3000)]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    placeNumber: ['', [Validators.required]],
  });

  displayedItems = 3;
  disabled:boolean;





  constructor(public eventService: EventService,
              private route: ActivatedRoute,
              private router:Router,
              private fb: FormBuilder,
              private commentService: EventCommentService,
              private toastr:ToastrService) {}

  ngOnInit(): void {

    this.idEvent=this.route.snapshot.params['id'];

    this.eventService.getEventById(this.idEvent).subscribe((event:Event)=>{
      this.event=event;
      console.log(this.event.title);
      this.eventForm.patchValue({
        title:this.event.title,
        description: this.event.description

      })
      this.eventForm.get('endDate').patchValue(this.formatDate(this.event.endDate));
      this.eventForm.get('startDate').patchValue(this.formatDate(this.event.startDate));
      this.eventForm.controls['placeNumber'].patchValue(this.event.placeNumber.toString());
    })
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  updateEvent(){
    this.event.title = this.eventForm.get(['title'])!.value;
    this.event.description = this.eventForm.get(['description'])!.value;
    this.event.startDate = this.eventForm.get(['startDate'])!.value;
    this.event.endDate = this.eventForm.get(['endDate'])!.value;
    this.event.placeNumber=this.eventForm.get(['placeNumber'])!.value;
    this.event.approved=true;
    this.eventService.updateEvent(this.event).subscribe((res:Event) => {
      console.log(res);
     this.router.navigate(['/admin/listEvent']);
    });

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
