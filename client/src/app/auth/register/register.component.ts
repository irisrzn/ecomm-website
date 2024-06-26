import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  registrationError: string | null = null;
  showPassword = false;
  showConfirmPassword = false; 

  constructor(private authService: AuthService, private fb: FormBuilder, private router : Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.register(
        this.registrationForm.value.username,
        this.registrationForm.value.email,
        this.registrationForm.value.password,
        this.registrationForm.value.fname,
        this.registrationForm.value.lname
      ).subscribe(
        response => {
          console.log('Registration successful', response);
          localStorage.setItem('username', this.registrationForm.value.username);
          this.router.navigate(['/home']);
  
        },
        error => {
          this.registrationError = error.message; // Assuming error message is returned from the backend
          console.error('Registration failed', error);
        }
      );
    }
  }
}
