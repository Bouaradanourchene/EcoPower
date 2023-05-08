import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/entities/user';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  users!: User[];
  selectedUser!:User;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  searchTerm: string = '';
  title = 'Angular Search Using ng2-search-filter';
  searchText!:any;
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res)=>{
       this.users=res;
       console.log(res);
      }
          )
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.ngOnInit();
  }
  onDeletUser = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.userService.deleteUser(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }
  onUpdateuser(user: any ) {
      this.selectedUser = user;
      this.router.navigate(['/updateuser', user.id]);
  }

}
