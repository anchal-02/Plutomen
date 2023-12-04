// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, Address } from '../user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = { name: '', email: '', mobile: '', gender: '', role: '', addresses: [{ street: '', city: '', state: '', zipCode: '' }] };

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // If there is a user ID in the route parameters, load the user for editing
    const userId = this.route.snapshot.params['id'];
    if (userId) {
      const existingUser = this.userService.getUserById(userId);
      if (existingUser) {
        this.user = { ...existingUser };
      } else {
        // Redirect to user list if the user is not found
        this.router.navigate(['/users']);
      }
    }
  }

  addAddress(): void {
    this.user.addresses.push({ street: '', city: '', state: '', zipCode: '' });
  }

  removeAddress(index: number): void {
    this.user.addresses.splice(index, 1);
  }

  onSubmit(): void {
    if (this.user.email) {
      const existingUser = this.userService.getUserById(this.user.email);
      if (existingUser) {
        // Update existing user
        this.userService.updateUser(this.user);
      } else {
        // Create a new user
        this.userService.createUser(this.user);
      }

      // Redirect to user list or user details page after submission
      this.router.navigate(['/users']);
    }
  }
}
