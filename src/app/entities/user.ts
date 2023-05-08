import { publicDecrypt } from "crypto";
import { role } from "./role";

export class User {
   constructor(
 public id?:number,
    public cin?:number,
    public email?:string,
    public password?:string,
    public username?:string,
    public completname?:string,
    public phone?:number,
    public address?:string,
    public  companyname?:string,
    public active?:boolean,
    public role?:role,
   ) {}
}
