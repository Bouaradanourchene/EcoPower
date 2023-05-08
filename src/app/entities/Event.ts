import {EventComments} from "./EventComments";
import {User} from './user';

export class Event {
    id?:number;
    title?: string;
    description?: string;
    image?: string;
    createdAt?:Date;
   iduser?:number;  //user id
    approved?: boolean;
    startDate?:Date;
    endDate?:Date;
    placeNumber?:number;
    eventComments?:EventComments[];
    nblike?:number;
}
