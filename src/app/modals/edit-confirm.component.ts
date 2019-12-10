import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.model';

@Component({
  selector: 'app-edit-confirm',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm User Profile</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" autocomplete="username" class="form-control" [placeholder]="user.fName" readonly>
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" autocomplete="username" class="form-control" [placeholder]="user.lName" readonly>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="text" class="form-control" [placeholder]="user.password" readonly>
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" autocomplete="email" [placeholder]="user.email" aria-describedby="emailHelp" readonly>
      </div>
      <div class="form-group">
        <label>Contact Number</label>
        <input type="number" class="form-control" autocomplete="mobile" [placeholder]="user.contactNumber" aria-describedby="emailHelp" readonly>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Confirm</button>
    </div>
  `
})
export class EditConfirmComponent {
  @Input() user: User;

  constructor(public activeModal: NgbActiveModal) {}
}
