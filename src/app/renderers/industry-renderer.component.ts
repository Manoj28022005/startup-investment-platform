import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RankedTester, rankWith, isEnumControl } from '@jsonforms/core';

interface IndustrySchema {
  type: string;
  enum?: string[];
  required?: boolean;
}

@Component({
  selector: 'app-industry-renderer',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  template: `
    <mat-form-field class="w-full" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <mat-select
        [value]="data"
        (selectionChange)="handleChange($event)"
        [required]="isRequired"
      >
        <mat-option *ngFor="let option of options" [value]="option">
          <div class="flex items-center gap-2">
            <mat-icon>{{ getIndustryIcon(option) }}</mat-icon>
            <span>{{ option }}</span>
          </div>
        </mat-option>
      </mat-select>
      <mat-error *ngIf="showRequiredError">
        {{ label }} is required
      </mat-error>
    </mat-form-field>
  `
})
export class IndustryRendererComponent extends JsonFormsControl {
  constructor(jsonFormsService: JsonFormsAngularService) {
    super(jsonFormsService);
  }

  override getEventValue = (event: any) => event.value;

  get options(): string[] {
    const schema = this.scopedSchema as IndustrySchema;
    return schema?.enum || [];
  }

  get isRequired(): boolean {
    const schema = this.scopedSchema as IndustrySchema;
    return schema?.required === true;
  }

  handleChange(event: any): void {
    this.onChange(event);
  }

  get showRequiredError(): boolean {
    return this.isRequired && !this.data;
  }

  getIndustryIcon(industry: string): string {
    const icons: { [key: string]: string } = {
      'Technology': 'computer',
      'Healthcare': 'local_hospital',
      'Finance': 'attach_money',
      'Education': 'school',
      'E-commerce': 'shopping_cart',
      'Manufacturing': 'precision_manufacturing',
      'Real Estate': 'home',
      'Energy': 'bolt',
      'Transportation': 'directions_car',
      'Agriculture': 'grass',
      'Other': 'more_horiz'
    };
    return icons[industry] || 'business';
  }
}

export const industryControlTester: RankedTester = rankWith(
  3,
  isEnumControl
);
