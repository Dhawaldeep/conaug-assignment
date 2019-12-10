import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-confirm-delete',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Profile deletion</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Are you sure you want to delete <span class="text-primary">"{{name}}"</span> profile?</strong></p>
      <p>All information associated to this user profile will be permanently deleted.
      <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Confirm</button>
    </div>
  `
})
export class ConfirmDeleteComponent{
  @Input() name;

  constructor(public activeModal: NgbActiveModal){}

}
