import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: string = '';
  modalRef: NgbModalRef | undefined;

  @ViewChild('alertContent', { static: true }) alertContent!: TemplateRef<any>;

  constructor(private alertService: AlertService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.alertService.getAlert().subscribe((message: string) => {
      this.message = message;
      this.openModal();
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(this.alertContent, { centered: true });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
