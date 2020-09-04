import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/Services/modal-service/ModalService';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit, OnDestroy {

  private eventSubSendModal: any;
  public modalType: string;
  public modalID: string;
  public modalBTN: string;
  public modalHeadline: string;
  public modalText: string;

  constructor(private modalService: ModalService) {
    this.eventSubSendModal = this.modalService.sendModal.subscribe(modal => {
      this.openModal(modal.type, modal.ID, modal.BTN, modal.headline, modal.text);
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.eventSubSendModal.unsubscribe();
  }

  openModal(modalType: string, modalID: string, modalBTN: string, modalHeadline: string, modalText: string) {

    this.modalType = modalType;
    this.modalID = modalID;
    this.modalBTN = modalBTN;
    this.modalHeadline = modalHeadline;
    this.modalText = modalText;
    setTimeout(() => {
      document.getElementById(this.modalBTN).click();
    }, 100);
  }

  deleteObject() {
    let val = '';
    if (this.modalID.includes('deleteProduct')) {
      val = 'deleteProduct';
    } else if (this.modalID.includes('delete')) {
      val = 'delete';
    } else {
      val = 'confirm';
    }
    this.modalService.sendConfirmation(val);
  }


}
