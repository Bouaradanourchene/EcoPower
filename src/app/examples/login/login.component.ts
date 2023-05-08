import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  error!: string;

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (result: any) => {
        console.log(result.token);
        if (result && result.token) {
          this.cookieService.set('token', result.token, 1, '/', 'localhost', true, 'Lax');
        }
        if (this.authService.roleMatch('Admin')) {
          this.router.navigateByUrl('/listuser');
        } else if (this.authService.roleMatch('User')) {
          this.router.navigateByUrl('/products');
        }
      },
      (err) => {
        console.log('error occured!');
      }
    );
  }
  

  ngOnInit(): void {}
}
