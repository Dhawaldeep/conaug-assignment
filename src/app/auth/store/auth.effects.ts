import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { SIGNUP_START, SignupStart, AuthenticateSuccess, AuthenticateFail, LOGIN_START, LoginStart, LOGOUT, AUTHENTICATE_FAIL, AUTHENTICATE_SUCCESS } from './auth.actions';
import { switchMap, catchError, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { User } from 'src/app/model/user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AddUser } from 'src/app/user-list/store/users.action';

@Injectable()
export class AuthEffects{
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(SIGNUP_START),
    map((action: SignupStart)=>action.payload),
    withLatestFrom(this.store.select('users')),
    switchMap(([user, state])=>{
      const found = state.users.find(val=>{
        return val.email == user.email
      });
      if(found){
        return of(new AuthenticateFail('Already a User'))
      }else{
        const newUser = new User(user.fName, user.lName, user.password, user.email, user.contactNumber);
        return [new AuthenticateSuccess(newUser), new AddUser(newUser)]
      }
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    map((action: LoginStart)=>action.payload),
    withLatestFrom(this.store.select('users')),
    switchMap(([user, state])=>{
      const found = state.users.find(val=>{
        return val.email === user.email
      });
      if(found){
        if(found.password === user.password){
          return of(new AuthenticateSuccess(found));
        }else{
          return of(new AuthenticateFail('Wrong Credentials'));
        }
      }else{
        return of(new AuthenticateFail('Not a User'));
      }
    })
  )

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(LOGOUT, AUTHENTICATE_FAIL),
    tap(()=>{
      this.router.navigate(['/'])
    })
  )

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AUTHENTICATE_SUCCESS),
    tap(()=>{
      this.router.navigate(['/users'])
    })
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ){}
}
