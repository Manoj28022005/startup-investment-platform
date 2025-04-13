import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-traction-milestones',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  template: `
    <form [formGroup]="tractionForm" (ngSubmit)="onSubmit()" class="p-6">
      <h2 class="text-xl font-bold mb-6">Traction & Milestones</h2>

      <div class="grid grid-cols-1 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Current Traction</h3>
          
          <mat-form-field>
            <mat-label>Users/Customers</mat-label>
            <input matInput type="number" formControlName="userCount" required>
            <mat-error *ngIf="tractionForm.get('userCount')?.errors?.['required']">
              User count is required
            </mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Monthly Revenue (USD)</mat-label>
            <input matInput type="number" formControlName="monthlyRevenue">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Growth Rate (% per month)</mat-label>
            <input matInput type="number" formControlName="growthRate">
          </mat-form-field>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Key Milestones</h3>
          
          <div formArrayName="milestones" class="space-y-4">
            <div *ngFor="let milestone of milestones.controls; let i=index" 
                 [formGroupName]="i" class="p-4 border rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <mat-form-field>
                  <mat-label>Title</mat-label>
                  <input matInput formControlName="title" required>
                </mat-form-field>

                <mat-form-field>
                  <mat-label>Date</mat-label>
                  <input matInput [matDatepicker]="picker" formControlName="date" required>
                  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                  <mat-datepicker #picker></mat-datepicker>
                </mat-form-field>

                <mat-form-field class="col-span-2">
                  <mat-label>Description</mat-label>
                  <textarea matInput formControlName="description" rows="2" required></textarea>
                </mat-form-field>
              </div>
              
              <button mat-icon-button color="warn" type="button" 
                      (click)="removeMilestone(i)" class="mt-2">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>

          <button mat-stroked-button type="button" (click)="addMilestone()">
            <mat-icon>add</mat-icon> Add Milestone
          </button>
        </div>

        <mat-form-field>
          <mat-label>Future Goals</mat-label>
          <textarea matInput formControlName="futureGoals" rows="4" required></textarea>
          <mat-error *ngIf="tractionForm.get('futureGoals')?.errors?.['required']">
            Future goals are required
          </mat-error>
        </mat-form-field>
      </div>

      <div class="flex justify-between mt-6">
        <button mat-button type="button" (click)="onBack()">Back</button>
        <button mat-raised-button color="primary" type="submit" 
                [disabled]="!tractionForm.valid">
          Next
        </button>
      </div>
    </form>
  `
})
export class TractionMilestonesComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() formData = new EventEmitter<any>();

  tractionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tractionForm = this.fb.group({
      userCount: [0, [Validators.required, Validators.min(0)]],
      monthlyRevenue: [0, Validators.min(0)],
      growthRate: [0, Validators.min(0)],
      milestones: this.fb.array([]),
      futureGoals: ['', Validators.required]
    });
  }

  get milestones() {
    return this.tractionForm.get('milestones') as FormArray;
  }

  addMilestone() {
    const milestoneForm = this.fb.group({
      title: ['', Validators.required],
      date: [null, Validators.required],
      description: ['', Validators.required]
    });

    this.milestones.push(milestoneForm);
  }

  removeMilestone(index: number) {
    this.milestones.removeAt(index);
  }

  onSubmit() {
    if (this.tractionForm.valid) {
      this.formData.emit(this.tractionForm.value);
      this.next.emit();
    }
  }

  onBack() {
    this.back.emit();
  }
}
