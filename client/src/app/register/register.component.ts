import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  registrationError: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder, private router : Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.register(
        this.registrationForm.value.username,
        this.registrationForm.value.email,
        this.registrationForm.value.password
      ).subscribe(
        response => {
          // Registration successful, redirect or display success message
          console.log('Registration successful', response);
        },
        error => {
          // Handle registration error (e.g., display error message)
          this.registrationError = error.message; // Assuming error message is returned from the backend
          console.error('Registration failed', error);
        }
      );

      localStorage.setItem('username', this.registrationForm.value.username);

      // Redirect to the product page
      this.router.navigate(['/products']);
    }
  }
}
