import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export class BaseFormStepComponent {
  @Input() formGroup!: FormGroup;
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  onNext() {
    if (this.formGroup.valid) {
      this.save.emit(this.formGroup.value);
      this.next.emit();
    } else {
      this.markFormGroupTouched(this.formGroup);
    }
  }

  onPrevious() {
    this.previous.emit();
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
