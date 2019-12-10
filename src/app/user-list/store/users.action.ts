import { Action } from '@ngrx/store';
import { User } from 'src/app/model/user.model';

export const ADD_USER = '[USER] ADD';
export const DELETE_USER = '[USER] DELETE';
export const EDIT_USER = '[USER] EDIT';

export class AddUser implements Action{
  readonly type = ADD_USER;

  constructor(public payload: User){}
}

export class DeleteUser implements Action{
  readonly type = DELETE_USER;

  constructor(public payload: string){}
}

export class EditUser implements Action{
  readonly type = EDIT_USER;

  constructor(public payload: User){}
}

export type UserActions =
  | AddUser
  | DeleteUser
  | EditUser;
