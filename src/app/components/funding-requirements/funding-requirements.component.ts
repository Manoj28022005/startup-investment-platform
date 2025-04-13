import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface FundingRequirements {
  fundingStage: string;
  amountRequired: string;
  timelineToRaise: string;
  previouslyRaised: boolean;
  previousInvestors: string;
  useOfFunds: { [key: string]: number };
}

@Component({
  selector: 'app-funding-requirements',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCheckboxModule
  ],
  template: `
    <form [formGroup]="fundingForm" (ngSubmit)="onNext()" class="space-y-6">
      <mat-form-field class="w-full">
        <mat-label>Funding Stage</mat-label>
        <mat-select formControlName="fundingStage" required>
          <mat-option *ngFor="let stage of fundingStages" [value]="stage">
            {{stage}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="fundingForm.get('fundingStage')?.errors?.['required']">
          Funding stage is required
        </mat-error>
      </mat-form-field>

      <mat-form-field class="w-full">
        <mat-label>Amount Required (USD)</mat-label>
        <input matInput formControlName="amountRequired" required
               placeholder="$1,000,000">
        <mat-error *ngIf="fundingForm.get('amountRequired')?.errors?.['required']">
          Amount is required
        </mat-error>
        <mat-error *ngIf="fundingForm.get('amountRequired')?.errors?.['pattern']">
          Enter a valid amount (e.g., $1,000,000)
        </mat-error>
      </mat-form-field>

      <!-- Fund Allocation -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Fund Allocation</h3>
        <p class="text-sm text-gray-600" [class.text-red-500]="getTotalAllocation() !== 100">
          Specify how you plan to use the funds (in percentages). Total must equal 100%.
        </p>

        <div class="space-y-6">
          <div *ngFor="let category of fundCategories" class="space-y-2">
            <div class="flex justify-between">
              <label class="text-sm font-medium">{{category}}</label>
              <span class="text-sm">
                {{fundingForm.get('funds_' + category.toLowerCase().replace(' ', '_'))?.value || 0}}%
              </span>
            </div>
            <mat-slider min="0" max="100" step="5" discrete>
              <input matSliderThumb
                     [formControlName]="'funds_' + category.toLowerCase().replace(' ', '_')">
            </mat-slider>
          </div>

          <div class="text-right text-sm" [class.text-red-500]="getTotalAllocation() !== 100">
            Total Allocation: {{getTotalAllocation()}}%
            <span *ngIf="getTotalAllocation() !== 100">
              (Must equal exactly 100%)
            </span>
          </div>
        </div>
      </div>

      <mat-form-field class="w-full">
        <mat-label>Timeline to Raise</mat-label>
        <mat-select formControlName="timelineToRaise" required>
          <mat-option *ngFor="let timeline of timelines" [value]="timeline">
            {{timeline}}
          </mat-option>
        </mat-select>
        <mat-error *ngIf="fundingForm.get('timelineToRaise')?.errors?.['required']">
          Timeline is required
        </mat-error>
      </mat-form-field>

      <!-- Previous Funding -->
      <div class="space-y-4">
        <mat-checkbox formControlName="previouslyRaised">
          Have you raised funds before?
        </mat-checkbox>

        <mat-form-field class="w-full" *ngIf="fundingForm.get('previouslyRaised')?.value">
          <mat-label>Previous Investors</mat-label>
          <textarea matInput formControlName="previousInvestors" rows="3"
                    placeholder="List your previous investors and amounts raised (e.g., Acme VC - $500,000, Angel Investor - $100,000)"></textarea>
          <mat-hint align="start">Include investor names and amounts raised</mat-hint>
          <mat-hint align="end">
            {{fundingForm.get('previousInvestors')?.value?.length || 0}}/500 characters
          </mat-hint>
          <mat-error *ngIf="fundingForm.get('previousInvestors')?.errors?.['required']">
            Previous investors information is required
          </mat-error>
          <mat-error *ngIf="fundingForm.get('previousInvestors')?.errors?.['minlength']">
            Please provide more detailed information (at least 20 characters)
          </mat-error>
        </mat-form-field>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button mat-button type="button" (click)="onPrevious()">Previous</button>
        <button mat-raised-button color="primary" type="submit"
                [disabled]="!fundingForm.valid || getTotalAllocation() !== 100">Next</button>
      </div>
    </form>
  `
})
export class FundingRequirementsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() formData = new EventEmitter<any>();

  fundingForm: FormGroup;
  
  // Validation patterns
  private moneyPattern = '^\\$[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$';

  fundingStages = [
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C',
    'Series D+'
  ];

  fundCategories = [
    'Product Development',
    'Marketing',
    'Operations',
    'Team Expansion',
    'Research',
    'Other'
  ];

  timelines = [
    'Within 3 months',
    '3-6 months',
    '6-12 months',
    'More than 12 months'
  ];

  constructor(private fb: FormBuilder) {
    this.fundingForm = this.fb.group({
      fundingStage: ['', Validators.required],
      amountRequired: ['', [Validators.required, Validators.pattern(this.moneyPattern)]],
      timelineToRaise: ['', Validators.required],
      previouslyRaised: [false],
      previousInvestors: ['']
    });

    // Add form controls for fund allocation
    this.fundCategories.forEach(category => {
      const controlName = 'funds_' + category.toLowerCase().replace(' ', '_');
      this.fundingForm.addControl(controlName, new FormControl(0));
    });
    
    // Update validators based on previouslyRaised value
    this.fundingForm.get('previouslyRaised')?.valueChanges.subscribe(value => {
      const previousInvestorsControl = this.fundingForm.get('previousInvestors');
      if (value) {
        previousInvestorsControl?.setValidators([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500)
        ]);
      } else {
        previousInvestorsControl?.clearValidators();
      }
      previousInvestorsControl?.updateValueAndValidity();
    });
  }

  onNext() {
    if (this.fundingForm.valid && this.getTotalAllocation() === 100) {
      const formValue = this.fundingForm.value;
      const fundingData: FundingRequirements = {
        fundingStage: formValue.fundingStage,
        amountRequired: formValue.amountRequired,
        timelineToRaise: formValue.timelineToRaise,
        previouslyRaised: formValue.previouslyRaised,
        previousInvestors: formValue.previousInvestors,
        useOfFunds: {}
      };

      // Convert fund allocation controls to useOfFunds object
      this.fundCategories.forEach(category => {
        const controlName = 'funds_' + category.toLowerCase().replace(' ', '_');
        fundingData.useOfFunds[category] = formValue[controlName] || 0;
      });

      this.formData.emit(fundingData);
      this.next.emit();
    }
  }

  onPrevious() {
    this.previous.emit();
  }

  getTotalAllocation(): number {
    return this.fundCategories.reduce((total, category) => {
      const controlName = 'funds_' + category.toLowerCase().replace(' ', '_');
      return total + (this.fundingForm.get(controlName)?.value || 0);
    }, 0);
  }
}
