import { Component, Output, EventEmitter } from '@angular/core';
import { JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule, angularMaterialRenderers } from '@jsonforms/angular-material';
import { teamInformationSchema } from '../../schemas/team-information.schema';
import { teamInformationUISchema } from '../../schemas/team-information.uischema';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-information',
  standalone: true,
  imports: [
    CommonModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MatButtonModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-6">Team Information</h2>

      <jsonforms
        [data]="data"
        [schema]="schema"
        [uischema]="uischema"
        [renderers]="renderers"
        (dataChange)="onDataChange($event)"
        class="block"
      ></jsonforms>

      <div class="flex justify-between mt-6">
        <button mat-button type="button" (click)="onBack()">Back</button>
        <button mat-raised-button color="primary" type="button" [disabled]="!isValid" (click)="onNext()">Next</button>
      </div>
    </div>
  `
})
export class TeamInformationComponent {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() formData = new EventEmitter<any>();

  data = {};
  schema = teamInformationSchema;
  uischema = teamInformationUISchema;
  renderers = angularMaterialRenderers;
  isValid = false;

  onDataChange(event: any): void {
    this.data = event.data;
    this.isValid = event.errors.length === 0;
    this.formData.emit(this.data);
  }

  onBack(): void {
    this.back.emit();
  }

  onNext(): void {
    if (this.isValid) {
      this.formData.emit(this.data);
      this.next.emit();
    }
  }
}
