import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'app/entities/user';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cookieService:CookieService) { }
  private BASE_URL = 'http://localhost:9090/user/getUsers';
  private BASE_URL_DELETE = 'http://localhost:9090/user/remove-user';
  private BASE_URL_AJOUT ='http://localhost:9090/user/add-user';
  /*private BASE_URL_UpdateAccount ='http://localhost:8000/PI/user/updateaccountwithoutimage';*/
  private BASE_URL_UpdateUser ='http://localhost:9090/user/update';
  private BASE_URL_Getbyid='http://localhost:9090/user/get-user';
 

  getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL_DELETE}/${id}`, { responseType: 'text' });

  }
  addUser(User: any): Observable<any> {
    return this.http.post<User>(`${this.BASE_URL_AJOUT}` ,User)
  }
  getAuthToken(): string {
    return this.cookieService.get('token');
}
/* updateAccount(data:any){
    const authToken = this.getAuthToken();
    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    };
    const options = { headers: headers };
    return this.http.put(`${this.BASE_URL_UpdateAccount}`  ,data,  options )
  }*/
  updateUser(data:any){
    return this.http.put(`${this.BASE_URL_UpdateUser}`  ,data)
  }

  getUserById(id :any){
    return this.http.get(`${this.BASE_URL_Getbyid}/${id}`)
  }

}
