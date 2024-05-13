import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService, private router: Router) {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.userService.getUserById(+term))
      )
      .subscribe(
        (user:User) => {
          if (user) {
            this.router.navigate(['/users', user.id]);
          }
        },
        (error) => console.log('User not found!', error)
      );
  }

  search(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerms.next(input.value);
  }
}
