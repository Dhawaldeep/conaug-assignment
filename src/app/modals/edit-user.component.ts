import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditConfirmComponent } from './edit-confirm.component';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { EditUser } from '../user-list/store/users.action';


@Component({
  selector: 'app-edit-user',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Edit Profile</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form [formGroup]="editForm">
      <div class="form-group">
        <label>First Name</label>
        <input type="text" formControlName="fName" autocomplete="username" class="form-control" placeholder="First Name">
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" formControlName="lName" autocomplete="username" class="form-control" placeholder="Last Name">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" formControlName="password" autocomplete="new-password" class="form-control" placeholder="Password">
      </div>
      <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" formControlName="email" autocomplete="email" placeholder="Email" aria-describedby="emailHelp">
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Contact Number</label>
        <input type="number" class="form-control" formControlName="contactNumber" autocomplete="mobile" placeholder="Contact Number" aria-describedby="emailHelp">
        <small class="form-text text-muted">Don't worry, we keep our user's information private</small>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="button" [disabled]="!editForm.valid" (click)="open()" class="btn text-white custom-bg">Submit</button>
        </div>
      </div>
    </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class EditUserComponent implements OnInit{
  editForm: FormGroup
  user: User;
  constructor(public activeModal: NgbActiveModal, private modal: NgbModal, private store: Store<AppState>){}

  ngOnInit(){
    this.editForm = new FormGroup({
      fName: new FormControl(this.user.fName, { validators: Validators.required }),
      lName: new FormControl(this.user.lName, { validators: Validators.required }),
      password: new FormControl(this.user.password, { validators: [Validators.required, Validators.min(6)] }),
      email: new FormControl(this.user.email, { validators: [Validators.required, Validators.email] }),
      contactNumber: new FormControl(this.user.contactNumber, { validators: Validators.required }),
    })
  }

  open(){
    const modalRef = this.modal.open(EditConfirmComponent);
    const user = new User(this.editForm.value.fName, this.editForm.value.lName, this.editForm.value.password, this.editForm.value.email, this.editForm.value.contactNumber, this.user.id)
    modalRef.componentInstance.user = user;
    modalRef.result.then(()=>{
      this.store.dispatch(new EditUser(user));
      this.activeModal.close();
    }).catch(()=>{
      // this.activeModal.close('Close click')
    })
  }
}
