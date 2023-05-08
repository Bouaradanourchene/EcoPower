import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { role } from 'app/entities/role';
import { User } from 'app/entities/user';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;

    user: User = {
      id:0,
      cin: 0,
      username: '',
      completname: '',
      email: '',
      password: '',
      phone: 0,
      address: '',
     active:true,
      companyname: '',
      role: 0
    };
    constructor(private authService: AuthService, private router:Router, private cookieService:CookieService) { }
  
    ngOnInit(): void {
    }
  
    Register() {
      this.authService.register(this.user).subscribe(
        user => {
          console.log('Utilisateur ajouté avec succès:', user);
          // Réinitialiser le formulaire
          this.user = {
            id:0,
            cin: 0,
            username: '',
            completname: '',
            email: '',
            password: '',
            phone: 0,
            address: '',
            active:true,
            companyname: '',
            role: 0
          };
          

        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
      );
    };
    isLogin(){
      this.router.navigateByUrl('/products');
      }
  
      isRegister(){
          this.router.navigateByUrl('/login');
          }
      isLogOut(){
          this.authService.logout();
          this.router.navigateByUrl('/dashboard');
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
