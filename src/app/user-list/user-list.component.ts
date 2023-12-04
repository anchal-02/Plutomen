// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user.model';
import { FormBuilder, FormGroup } from '@angular/forms'; 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  uniqueRoles: string[] = [];
  uniqueGenders: string[] = [];
  selectedRole: string = '';
  selectedGender: string = '';
  filterForm!: FormGroup; 

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.uniqueRoles = this.userService.getUniqueRoles();
    this.uniqueGenders = this.userService.getUniqueGenders();

    this.initializeFilterForm(); 
  }

  initializeFilterForm(): void {
    this.filterForm = this.fb.group({
      role: [''],
      gender: [''],
    });

   
    this.filterForm.valueChanges.subscribe(() => {
      this.filterUsers();
    });
  }

  get filteredUsers(): User[] {
    return this.users.filter((user) => {
      return (
        (!this.selectedRole || user.role === this.selectedRole) &&
        (!this.selectedGender || user.gender === this.selectedGender)
      );
    });
  }

  filterUsers(): void {
    const filterValues = this.filterForm.value;
    this.selectedRole = filterValues.role;
    this.selectedGender = filterValues.gender;
  }

  editUser(user: User): void {
    this.router.navigate(['/users/edit', user.email]);
  }

  deleteUser(user: User): void {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.userService.deleteUser(user.email);
      // Refresh the user list
      this.users = this.userService.getUsers();
    }
  }
}
