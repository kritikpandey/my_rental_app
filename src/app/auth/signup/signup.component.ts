import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signUpForm!: FormGroup;
  signupError = '';

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getEmailError(): string {
    const emailCtrl = this.signUpForm.get('email');
    if (emailCtrl?.hasError('required')) {
      return 'Email is required.';
    }
    if (emailCtrl?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  getPasswordError(): string {
    const passCtrl = this.signUpForm.get('password');
    if (passCtrl?.hasError('required')) {
      return 'Password is required.';
    }
    if (passCtrl?.hasError('minlength')) {
      return 'Password must be at least 6 characters.';
    }
    return '';
  }

  onSignup() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.signUpForm.value;
    
    try {
      this.auth.signup(email, password);
      this.signupError = '';
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.signupError = error.message || 'Signup failed. Please try again.';
    }
  }
}
