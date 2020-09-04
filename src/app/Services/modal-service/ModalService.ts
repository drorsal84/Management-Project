import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Modal } from 'src/app/Models/Modal';
import { StringService } from 'src/app/Services/string-service/StringService';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private stringService: StringService) { }

  sendModal: Subject<Modal> = new Subject();
  triggerConfirm: Subject<any> = new Subject();

  public createModalObject(type: string, ID: string,
    BTN: string, headline: string, text: string) {
    const modal = new Modal(type, ID, BTN, headline, text);
    return modal;
  }

  openModal(modal: Modal) {
    this.sendModal.next(modal);
  }

  sendConfirmation(val) {
    this.triggerConfirm.next(val);
  }

}