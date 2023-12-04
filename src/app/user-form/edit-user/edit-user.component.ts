// edit-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
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
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      addresses: this.fb.array([]),
    });
  }

  addAddress(): void {
    const newAddress = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.addresses.push(newAddress);
  }

  removeAddress(index: number): void {
    this.addresses.removeAt(index);
  }

  onSubmit(): void {
    console.log('Submit clicked:', this.userForm.value);
    
  }

  get addresses() {
    return this.userForm.get('addresses') as FormArray;
  }
}
