import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-founder-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <form [formGroup]="founderForm" (ngSubmit)="onSubmit()" class="p-6">
      <h2 class="text-xl font-bold mb-6">Founder Details</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <mat-form-field>
          <mat-label>Full Name</mat-label>
          <input matInput formControlName="fullName" required placeholder="John Smith">
          <mat-error *ngIf="founderForm.get('fullName')?.errors?.['required']">
            Full name is required
          </mat-error>
          <mat-error *ngIf="founderForm.get('fullName')?.errors?.['pattern']">
            Enter a valid name (e.g., John Smith)
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" required placeholder="john@example.com">
          <mat-error *ngIf="founderForm.get('email')?.errors?.['required']">
            Email is required
          </mat-error>
          <mat-error *ngIf="founderForm.get('email')?.errors?.['pattern']">
            Please enter a valid email
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" required placeholder="+1 (555) 123-4567">
          <mat-error *ngIf="founderForm.get('phone')?.errors?.['required']">
            Phone number is required
          </mat-error>
          <mat-error *ngIf="founderForm.get('phone')?.errors?.['pattern']">
            Enter a valid phone number
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>LinkedIn Profile</mat-label>
          <input matInput formControlName="linkedIn" required placeholder="https://linkedin.com/in/username">
          <mat-error *ngIf="founderForm.get('linkedIn')?.errors?.['required']">
            LinkedIn profile is required
          </mat-error>
          <mat-error *ngIf="founderForm.get('linkedIn')?.errors?.['pattern']">
            Must be a valid LinkedIn URL (https://linkedin.com/in/username)
          </mat-error>
        </mat-form-field>

        <mat-form-field class="col-span-2">
          <mat-label>Brief Bio</mat-label>
          <textarea matInput formControlName="bio" rows="4" required></textarea>
          <mat-error *ngIf="founderForm.get('bio')?.errors?.['required']">
            Bio is required
          </mat-error>
          <mat-error *ngIf="founderForm.get('bio')?.errors?.['minlength']">
            Bio must be at least 50 characters
          </mat-error>
          <mat-error *ngIf="founderForm.get('bio')?.errors?.['maxlength']">
            Bio must be less than 500 characters
          </mat-error>
        </mat-form-field>
      </div>

      <div class="flex justify-end mt-6">
        <button mat-raised-button color="primary" type="submit" [disabled]="!founderForm.valid">
          Next
        </button>
      </div>
    </form>
  `
})
export class FounderDetailsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() formData = new EventEmitter<any>();

  founderForm: FormGroup;
  
  // Validation patterns
  private namePattern = '^[A-Z][a-z]+(?:\\s[A-Z][a-z]+)+$';
  private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';
  private phonePattern = '^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$';
  private linkedinPattern = '^https:\\/\\/(?:www\\.)?linkedin\\.com\\/in\\/[a-zA-Z0-9-]{5,100}\\/?$';

  constructor(private fb: FormBuilder) {
    this.founderForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      linkedIn: ['', [Validators.required, Validators.pattern(this.linkedinPattern)]],
      bio: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]]
    });
  }

  onSubmit() {
    if (this.founderForm.valid) {
      this.formData.emit(this.founderForm.value);
      this.next.emit();
    }
  }
}
