import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User, UserResponse } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
  ];

  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalItems: number = 0;
  currentPagePaginator: number = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.fetchUsers();
  }

  setPageSize(e: PageEvent) {
    this.pageNumber = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.currentPagePaginator = e.pageIndex;
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers(this.pageNumber).subscribe({
      next: (response: UserResponse) => {
        this.dataSource.data = response.data;
        this.totalItems = response.total;
        this.totalPages = response.total_pages;
        this.pageSize = response.per_page;

        if (this.paginator) {
          this.paginator.length = this.totalItems;
          this.paginator.pageIndex = this.currentPagePaginator;
          this.paginator.pageSize = this.pageSize;
        }

      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  goToUserDetails(user: User) {
    this.router.navigate(['/users', user.id]);
  }
}
