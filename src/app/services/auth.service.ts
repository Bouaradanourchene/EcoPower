import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'app/entities/user';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl_auth = 'http://localhost:9090/auth/authenticate';
  private register_ = ' http://localhost:9090/auth/register';
 
  constructor(private http: HttpClient, private cookieService: CookieService) { }


  register(User: User): Observable<any> {
    return this.http.post<User>(`${this.register_}` ,User)
  }
  roleMatch(role: string): boolean {
    var isMatch = false;
    var token = this.cookieService.get('token');
    if (token != null && token.length!=0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      var userRoles = payLoad.roles as string[];
      //console.log(payLoad.role);
      isMatch = userRoles.includes(role);
    }

    return isMatch;
  }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };

    return this.http.post<any>(`${this.baseUrl_auth}`, body);
  }


  logout(): void {
    this.cookieService.delete('token');
  }

  getToken(): string {
    return this.cookieService.get('token');
  }
 getIDFromcokis(): number {
    var token = this.cookieService.get("token");
    if (token != null && token.length != 0) {
      var payLoad = JSON.parse(window.atob(token.split('.')[1]));
      var id = payLoad.id as number;
      return id
    }
    return ;
  }
  authToken(): boolean {
    const token = this.cookieService.get('token');
    if (token) {
      // utilisateur connecté
      return true;
    } else {
      // utilisateur non connecté
      return false;
    }
  }
}
