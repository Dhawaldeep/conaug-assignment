import * as fromAuthReducer from '../auth/store/auth.reducer';
import * as formUsersReducer from '../user-list/store/users.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
  auth: fromAuthReducer.State;
  users: formUsersReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuthReducer.authReducer,
  users: formUsersReducer.usersReducer
}
