import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<string>();

  constructor() { }

  getAlert(): Observable<string> {
    return this.alertSubject.asObservable();
  }

  showAlert(message: string): void {
    this.alertSubject.next(message);
  }
}
