import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../../../entities/Event";
import {EventService} from "../../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {EventCommentService} from "../../../../services/event-comment.service";
import {EventComments} from "../../../../entities/EventComments";
import {User} from '../../../../entities/user';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit{


  @Input() event: Event;
  isSaving:boolean;
  eventId!:number;
  eventComment!:EventComments;
  comments!:EventComments[];
  commentForm = this.fb.group({
    content: ['', [Validators.required]]
  });

  displayedItems = 3;
  disabled:boolean;





  constructor(public eventService: EventService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private commentService: EventCommentService) {}



  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId=+id;
      this.loadData(this.eventId);
    }
  }

  loadData(id:number): void {
    this.eventService.getEventById(id).subscribe((res:Event) => {
     this.event=res;
      if(this.event.placeNumber<=0){
        this.disabled=true;

      }else{
        this.disabled=false;
      }

    });
    this.commentService.findByEvent(this.eventId).subscribe((res:EventComments[]) => {
      this.comments=res;
    });

  }

  save(): void {
    this.isSaving = false;
    this.eventComment = new EventComments();
    this.eventComment.content = this.commentForm.get(['content'])!.value;
    this.eventComment.event = this.event;
    this.eventComment.idUser = 1;
    this.commentService.addComment(this.eventComment).subscribe(()=>{
      this.loadData(this.eventId);
    });
  }
  showMore() {
    this.displayedItems =this.comments.length;
  }

  showless() {
    this.displayedItems =3;

  }

  joinNow(){
    this.event.placeNumber=this.event.placeNumber-1;
    if(this.event.placeNumber<=0){
      this.disabled=true;

    }else{
      this.disabled=false;
    }

    this.eventService.updateEvent(this.event).subscribe(()=>{
      this.loadData(this.eventId);
      console.log("hello"+this.event);
    });

  }

  like(){
    this.event.nblike+=1;
  }

}
