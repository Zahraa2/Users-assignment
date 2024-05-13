import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
  ];
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

 fetchUsers(page: number = 1) {
    this.isLoadingResults = true;
    this.userService.getUsers(page).subscribe(response => {
      this.dataSource.data = response.data;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    });
  }

  goToUserDetails(user: User) {
    this.router.navigate(['/users', user.id]);
  }
}
