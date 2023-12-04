
import { Injectable } from '@angular/core';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    // Mock data for testing
    this.users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: '123-456-7890',
        gender: 'Male',
        role: 'Admin',
        addresses: [
          { street: '123 Main St', city: 'Cityville', state: 'Stateville', zipCode: '12345' },
          { street: '456 Oak St', city: 'Townsville', state: 'Stateville', zipCode: '67890' },
        ],
      },
      
    ];
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  createUser(user: User): void {
    this.users.push(user);
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.email === updatedUser.email);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(email: string): void {
    this.users = this.users.filter(user => user.email !== email);
  }

  getUniqueRoles(): string[] {
    const roles = new Set<string>();
    this.users.forEach(user => roles.add(user.role));
    return Array.from(roles);
  }

  getUniqueGenders(): string[] {
    const genders = new Set<string>();
    this.users.forEach(user => genders.add(user.gender));
    return Array.from(genders);
  }
}
