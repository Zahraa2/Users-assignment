// src/app/components/header/header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.searchTerms.pipe(
      switchMap((term: string) => term ? this.userService.getUserById(+term) : of(null)),
      catchError(error => {
        console.error('Search error:', error);
        return of(null);
      })
    ).subscribe(user => {
      if (user) {
        this.router.navigate(['/users', user.id]);
      }
    });
  }

  search(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
    console.log(input.value);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
