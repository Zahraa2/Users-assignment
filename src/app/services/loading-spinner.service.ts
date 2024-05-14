// src/app/services/loading-spinner.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  // Public observable for external components
  isLoading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingCount++;
    this.updateLoading();
  }

  hide() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
      this.updateLoading();
    }
  }

  private updateLoading() {
    this.loadingSubject.next(this.loadingCount > 0);
  }
}
