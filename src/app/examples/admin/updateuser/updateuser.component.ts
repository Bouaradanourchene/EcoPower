import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/entities/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})
export class UpdateuserComponent implements OnInit{
  selectedUser: any;
  id: any;
  obj: any = {};
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

  constructor(private router:Router, private userService: UserService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(res => {
      this.selectedUser = res
      this.user = this.selectedUser
    })
   }

  ngOnInit(): void {
  }

  onUpdateUser() {
    this.userService.updateUser(this.user).subscribe(res => {
      this.router.navigate(['/listuser'])
    }, err => {
      this.router.navigate(['/listuser'])

    })
  }
}
