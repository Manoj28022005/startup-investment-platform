import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-team-talent',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <form [formGroup]="teamForm" (ngSubmit)="onSubmit()" class="p-6">
      <h2 class="text-xl font-bold mb-6">Team & Talent</h2>

      <div class="grid grid-cols-1 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Team Members</h3>
          
          <div formArrayName="teamMembers" class="space-y-4">
            <div *ngFor="let member of teamMembers.controls; let i=index" 
                 [formGroupName]="i" class="p-4 border rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <mat-form-field>
                  <mat-label>Full Name</mat-label>
                  <input matInput formControlName="fullName" required>
                  <mat-error *ngIf="member.get('fullName')?.hasError('required')">Name is required</mat-error>
                  <mat-error *ngIf="member.get('fullName')?.hasError('pattern')">Must be properly formatted (e.g., John Smith)</mat-error>
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Role</mat-label>
                  <input matInput formControlName="role" required>
                  <mat-error *ngIf="member.get('role')?.hasError('required')">Role is required</mat-error>
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Experience (years)</mat-label>
                  <input matInput type="number" formControlName="experience" required>
                  <mat-error *ngIf="member.get('experience')?.hasError('required')">Experience is required</mat-error>
                  <mat-error *ngIf="member.get('experience')?.hasError('min')">Cannot be negative</mat-error>
                  <mat-error *ngIf="member.get('experience')?.hasError('max')">Cannot exceed 50 years</mat-error>
                </mat-form-field>

                <mat-form-field>
                  <mat-label>LinkedIn Profile</mat-label>
                  <input matInput formControlName="linkedin" placeholder="https://linkedin.com/in/username">
                  <mat-error *ngIf="member.get('linkedin')?.hasError('pattern')">Must be a valid LinkedIn URL (https://linkedin.com/in/username)</mat-error>
                  <mat-error *ngIf="member.get('linkedin')?.hasError('required')">LinkedIn profile is required</mat-error>
                </mat-form-field>
              </div>
              
              <button mat-icon-button color="warn" type="button" 
                      (click)="removeMember(i)" class="mt-2">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>

          <button mat-stroked-button type="button" (click)="addMember()">
            <mat-icon>add</mat-icon> Add Team Member
          </button>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Tech Stack</h3>
          
          <mat-form-field class="w-full">
            <mat-label>Add Technology</mat-label>
            <mat-chip-grid #chipGrid>
              <mat-chip-row *ngFor="let tech of techStack" 
                           (removed)="removeTech(tech)">
                {{tech}}
                <button matChipRemove>
                  <mat-icon>cancel</mat-icon>
                </button>
              </mat-chip-row>
            </mat-chip-grid>
            <input matInput [formControl]="techInput"
                   [matChipInputFor]="chipGrid"
                   [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                   (matChipInputTokenEnd)="addTech($event)">
          </mat-form-field>
        </div>

        <mat-form-field>
          <mat-label>Additional Notes</mat-label>
          <textarea matInput formControlName="notes" rows="4"></textarea>
        </mat-form-field>
      </div>

      <div class="flex justify-between mt-6">
        <button mat-button type="button" (click)="onBack()">Back</button>
        <button mat-raised-button color="primary" type="submit" 
                [disabled]="!teamForm.valid || teamMembers.length === 0">
          Next
        </button>
      </div>
    </form>
  `
})
export class TeamTalentComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() formData = new EventEmitter<any>();

  teamForm: FormGroup;
  techStack: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA];
  techInput: FormControl;
  
  // LinkedIn validation pattern
  private linkedinPattern = '^https:\\/\\/(?:www\\.)?linkedin\\.com\\/in\\/[a-zA-Z0-9-]{5,100}\\/?$';
  private namePattern = '^[A-Z][a-z]+(?:\\s[A-Z][a-z]+)+$';

  constructor(private fb: FormBuilder) {
    this.techInput = this.fb.control('');
    this.teamForm = this.fb.group({
      teamMembers: this.fb.array([]),
      notes: ['']
    });
    
    // Add at least one team member by default
    this.addMember();
  }

  get teamMembers() {
    return this.teamForm.get('teamMembers') as FormArray;
  }

  addMember() {
    const memberForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      role: ['', Validators.required],
      experience: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      linkedin: ['', [Validators.required, Validators.pattern(this.linkedinPattern)]]
    });

    this.teamMembers.push(memberForm);
  }

  removeMember(index: number) {
    this.teamMembers.removeAt(index);
  }

  addTech(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    if (value) {
      this.techStack.push(value);
    }
    event.chipInput?.clear();
    this.techInput.setValue('');
  }

  removeTech(tech: string) {
    const index = this.techStack.indexOf(tech);
    if (index >= 0) {
      this.techStack.splice(index, 1);
    }
  }

  onSubmit() {
    if (this.teamForm.valid && this.teamMembers.length > 0) {
      const formData = {
        ...this.teamForm.value,
        techStack: this.techStack
      };
      this.formData.emit(formData);
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}
