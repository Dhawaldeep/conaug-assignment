import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { NgbTabsetModule, NgbModule, NgbToastModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { UserListComponent} from './user-list/user-list.component';
import { ConfirmDeleteComponent } from './modals/confirm-delete.component';
import { EditConfirmComponent } from './modals/edit-confirm.component';
import { EditUserComponent } from './modals/edit-user.component';
import { appReducer } from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    UserListComponent,
    ConfirmDeleteComponent,
    EditConfirmComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects]),
    NgbModule,
    NgbTabsetModule,
    NgbToastModule,
    NgbTooltipModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDeleteComponent, EditConfirmComponent, EditUserComponent]
})
export class AppModule { }
