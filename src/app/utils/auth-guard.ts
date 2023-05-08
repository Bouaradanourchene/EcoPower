import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'app/services/user.service';
import { AuthService } from 'app/services/auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.cookieService.get('token') != '') {
      console.log('found token!');
      let role = next.data['permittedRole'] as string;
      if (role) {
        if (this.authService.roleMatch(role)) {
          console.log('rolematch');
        } else {
          console.log("role not permitted")
          this.router.navigate(['/login']);
          return false;
        }
      }
      // console.log(this.service.roleMatch(roles));
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
