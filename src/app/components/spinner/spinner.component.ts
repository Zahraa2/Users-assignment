// src/app/components/spinner/spinner.component.ts
import { Component } from '@angular/core';
import { LoadingSpinnerService } from 'src/app/services/loading-spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="overlay" *ngIf="loadingSpinnerService.isLoading$ | async">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(public loadingSpinnerService: LoadingSpinnerService) {}
}
