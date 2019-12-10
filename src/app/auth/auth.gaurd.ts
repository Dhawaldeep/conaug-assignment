import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGaurd implements CanActivate{
  constructor(private store: Store<AppState>, private router: Router){}

  canActivate(){
    return this.store.select('auth').pipe(
      take(1),
      map(authState=>authState.user),
      map(user=>{
        if(user){
          return true;
        }else{
          return this.router.createUrlTree(['/']);
        }
      })
    )
  }
}
