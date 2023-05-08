import { Event } from "./event";
import {User} from './user';
export class EventComments {
    id?:number;
    idUser?:number;
    createdAt?:Date;
    content?:string;
    event?:Event;
}
