import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  showPassword = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log("Login successful.");

        // Successful login
        // Redirect to the product page or handle success as needed
      },
      (error) => {
        // Failed login
        this.errorMessage = error.message; // Display error message to the user
      }
    );

    localStorage.setItem('username', this.loginForm.value.username);

    // Redirect to the product page
    this.router.navigate(['/products']);
  }
}
