// user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the necessary form-related classes

import { User, Address } from '../user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    gender: ['', Validators.required],
    role: ['', Validators.required],
    addresses: this.fb.array([]),
  });; 

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();

    const userId = this.route.snapshot.params['id'];
    if (userId) {
      const existingUser = this.userService.getUserById(userId);
      if (existingUser) {
        this.userForm.patchValue(existingUser);
      } else {
        this.router.navigate(['/users']);
      }
    }
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Add email validation
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      addresses: this.fb.array([this.createAddress()]), // Initialize addresses with one empty address
    });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  addAddress(): void {
    const addresses = this.userForm.get('addresses') as FormArray;
    addresses.push(this.createAddress());
  }

  removeAddress(index: number): void {
    const addresses = this.userForm.get('addresses') as FormArray;
    addresses.removeAt(index);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      if (formValue.email) {
        const existingUser = this.userService.getUserById(formValue.email);
        if (existingUser) {
          this.userService.updateUser(formValue);
        } else {
          this.userService.createUser(formValue);
        }

        this.router.navigate(['/users']);
      }
    }
  }
}
