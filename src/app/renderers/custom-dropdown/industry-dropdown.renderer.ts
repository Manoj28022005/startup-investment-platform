import { Component } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { rankWith, scopeEndsWith } from '@jsonforms/core';

@Component({
  selector: 'app-industry-dropdown',
  templateUrl: './industry-dropdown.renderer.html',
})
export class IndustryDropdownRenderer extends JsonFormsControl {}

export const industryTester = rankWith(3, scopeEndsWith('industry'));
