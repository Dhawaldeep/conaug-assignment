import { Component, OnInit, Input } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmDeleteComponent } from '../modals/confirm-delete.component';
import { EditUserComponent } from '../modals/edit-user.component';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Observable } from 'rxjs';
import { DeleteUser } from './store/users.action';
import { filter, map } from 'rxjs/operators';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  trashIcon = faTrash;
  editIcon = faEdit;
  users$: Observable<{users: User[]}>;
  currentUser$: Observable<{user: User}>;
  constructor(private modalService: NgbModal, private store: Store<AppState>) { }

  ngOnInit() {
    this.users$ = this.store.select('users');
    this.currentUser$ = this.store.select('auth');
  }

  onDelete(user: User){
    const modalRef = this.modalService.open(ConfirmDeleteComponent);

    modalRef.result.then(()=>{
      this.store.dispatch(new DeleteUser(user.id))
    }).catch(()=>{
    })

    modalRef.componentInstance.name = `${user.fName} ${user.lName}`;
  }

  onEdit(user){
    const modalRef = this.modalService.open(EditUserComponent);
    // const user = new User('Dhawal', 'Gaur', 'Test@123', 'dhawalgaur17@gmail.com', '712123123');
    modalRef.componentInstance.user = user;
  }

  searchFilter(ev){
    this.users$ = this.users$.pipe(
      map(val=>{
        return{
          users: val.users.filter(user=>{
            return user.fName.includes(ev.target.value);
          })
        }
      })
    )
  }

}
