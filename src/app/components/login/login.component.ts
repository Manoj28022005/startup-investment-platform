import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <mat-card class="max-w-md w-full space-y-8 p-6">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p class="mt-2 text-sm text-gray-600">Please sign in to continue</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="space-y-4">
            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Invalid email format</mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="w-full">
              <mat-label>Login As</mat-label>
              <mat-select formControlName="role" required>
                <mat-option value="investor">Investor</mat-option>
                <mat-option value="founder">Startup Founder</mat-option>
              </mat-select>
              <mat-error *ngIf="loginForm.get('role')?.hasError('required')">Role is required</mat-error>
            </mat-form-field>
          </div>

          <div class="flex items-center justify-between">
            <button type="button" mat-button color="primary" (click)="goToRegister()">
              Create new account
            </button>
            <button type="submit" mat-raised-button color="primary" [disabled]="!loginForm.valid">
              Sign in
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    ::ng-deep .mat-mdc-form-field-focus-overlay {
      background-color: transparent !important;
    }
    ::ng-deep .mat-mdc-form-field-underline {
      display: none !important;
    }
    ::ng-deep .mat-mdc-text-field-wrapper {
      background-color: white !important;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.user.role === 'investor') {
            this.router.navigate(['/investor-dashboard']);
          } else {
            this.router.navigate(['/founder-dashboard']);
          }
        },
        error: (error) => {
          this.snackBar.open(error.error.message || 'Login failed', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
