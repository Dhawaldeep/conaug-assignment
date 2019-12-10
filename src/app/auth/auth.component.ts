import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { SignupStart, LoginStart } from './store/auth.actions';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  show = false;
  message = '';
  emailMessage = "We'll never share your email with anyone else."

  @ViewChild(NgbTabset, {static: false}) private authTab: NgbTabset;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      fName: new FormControl(null, { validators: Validators.required }),
      lName: new FormControl(null, { validators: Validators.required }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.min(6)] }),
      contactNumber: new FormControl(null, { validators: Validators.required }),
    });
    this.loginForm = new FormGroup({
      password: new FormControl(null, { validators: [Validators.required, Validators.min(6), Validators.min(6)] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
    })
    this.store.select('auth').subscribe(res=>{
      if(res.authError){
        this.message = res.authError;
        switch (res.authError) {
          case 'Already a User':
            this.authTab.select('login');
            break;
          case 'Not a User':
            this.authTab.select('register');
            break;
          default:
            break;
        }
      }
      this.show = res.authError? true: false;
    });
  }

  onRegister(){
    const {fName, lName, email, password, contactNumber} = this.registerForm.value;
    this.store.dispatch(new SignupStart({fName, lName, email, password, contactNumber}))
    this.registerForm.reset();
  }

  onLogin(){
    const {email, password} = this.loginForm.value;
    this.store.dispatch(new LoginStart({email, password}));
    this.loginForm.reset();
  }

}
