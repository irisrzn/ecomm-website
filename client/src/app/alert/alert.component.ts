import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  messages: string[];

  constructor(private alertService: AlertService) {
    this.messages = this.alertService.getAlerts();
  }

  removeAlert(message: string): void {
    this.alertService.removeAlert(message);
  }
}
