import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { EditUserComponent } from './user-form/edit-user/edit-user.component';



export const routes: Routes = [
    { path: 'users', component: UserListComponent },
  { path: 'users/create', component: UserFormComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];
