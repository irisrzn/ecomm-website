import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messages: string[] = [];

  constructor() { }

  showAlert(message: string): void {
    this.messages.push(message);
  }

  clearAlerts(): void {
    this.messages = [];
  }

  getAlerts(): string[] {
    return this.messages;
  }

  removeAlert(message: string): void {
    const index = this.messages.indexOf(message);
    if (index !== -1) {
      this.messages.splice(index, 1);
    }
  }
}
