import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { Logout } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'conaug-assignment';
  loggedin = false;
  constructor(private store: Store<AppState>){}

  ngOnInit(){
    this.store.select('auth').subscribe(res=>{
      this.loggedin = res.user?true:false;
    })
  }

  logout(){
    this.store.dispatch(new Logout());
  }
}
