// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';


import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';
import { EditUserComponent } from './user-form/edit-user/edit-user.component';

const appRoutes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserFormComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, UserFormComponent, UserListComponent, EditUserComponent],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes),AppRoutingModule],
  providers: [UserService, AddressService],
  bootstrap: [AppComponent],
})
export class AppModule {}
