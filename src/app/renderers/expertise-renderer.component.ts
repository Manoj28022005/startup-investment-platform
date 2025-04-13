import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { RankedTester, rankWith, and, schemaMatches, uiTypeIs } from '@jsonforms/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expertise-renderer',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule],
  template: `
    <div class="expertise-renderer">
      <label class="block text-sm font-medium text-gray-700 mb-2" [for]="id">
        {{ label }}
        <span class="text-red-500" *ngIf="isRequired">*</span>
      </label>
      
      <mat-chip-listbox
        [id]="id"
        [attr.aria-label]="label"
        [multiple]="true"
        (change)="onSelectionChange($event)"
        class="w-full"
      >
        <mat-chip-option
          *ngFor="let option of options"
          [selected]="isSelected(option)"
          [value]="option"
          class="mr-2"
        >
          {{ option }}
          <mat-icon matChipTrailingIcon *ngIf="isSelected(option)">check</mat-icon>
        </mat-chip-option>
      </mat-chip-listbox>

      <div class="text-xs text-red-500 mt-1" *ngIf="hasValidationErrors">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .expertise-renderer {
      @apply p-4 rounded-lg bg-white shadow-sm;
    }
    mat-chip-listbox {
      @apply flex flex-wrap gap-2;
    }
  `]
})
export class ExpertiseRendererComponent extends JsonFormsControl {
  constructor(service: JsonFormsAngularService) {
    super(service);
  }

  get options(): string[] {
    const schema = this.scopedSchema;
    if (schema.type === 'array' && schema.items && 'enum' in schema.items) {
      return schema.items.enum as string[];
    }
    return [];
  }

  get isRequired(): boolean {
    const required = this.rootSchema.required;
    return required ? required.includes(this.scopedSchema.title || '') : false;
  }

  get hasValidationErrors(): boolean {
    return this.error ? true : false;
  }

  isSelected(option: string): boolean {
    return Array.isArray(this.data) && this.data.includes(option);
  }

  override onChange(value: any): void {
    super.onChange(value);
  }

  onSelectionChange(event: any): void {
    this.onChange(event.value);
  }
}

export const expertiseControlTester: RankedTester = rankWith(
  5,
  and(
    uiTypeIs('Control'),
    schemaMatches(schema => {
      if (schema.type === 'array' && schema.items) {
        const items = schema.items as any;
        return items.enum?.includes('Technology') || false;
      }
      return false;
    })
  )
);
