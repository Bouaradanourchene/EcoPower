import { Component } from '@angular/core';
import { role } from 'app/entities/role';
import { User } from 'app/entities/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

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
    role: role.User
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onAddUser() {
    this.userService.addUser(this.user).subscribe(
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
          role: role.User
      
        };
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      }
    );
  }

}
