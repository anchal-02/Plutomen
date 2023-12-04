// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User, Address } from '../../user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: User = { name: '', email: '', mobile: '', gender: '', role: '', addresses: [{ street: '', city: '', state: '', zipCode: '' }] };

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
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
        // Redirect to user list if the user is not found
        this.router.navigate(['/users']);
      }
    }
  }
}
