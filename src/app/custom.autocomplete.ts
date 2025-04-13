import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {generate} from "random-words";
import {debounceTime, finalize, tap} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import type { UISchemaElement, JsonSchema } from '@jsonforms/core';

const words: string[] = generate(1000) as string[];

const fetchSuggestions = (input: string): Observable<string[]> => {
  const filtered: string[] = words.filter(word => word.startsWith(input));
  return of(filtered).pipe(delay(1000));
};

@Component({
  selector: 'jsonforms-custom-autocomplete',
  template: `
    <mat-form-field fxFlex>
      <mat-label>{{ label }}</mat-label>
      <input
        matInput
        type="text"
        [formControl]="form"
        [matAutocomplete]="auto"
        (input)="onChange($event)"
        placeholder="{{ description }}"
        [id]="id"
      >
      <mat-autocomplete
        #auto="matAutocomplete"
        (optionSelected)="onSelect($event)">
        <mat-option *ngIf="isLoading" class="is-loading">
          <mat-spinner diameter="30"></mat-spinner>
        </mat-option>
        <mat-option
          *ngFor="let option of filteredOptions | async"
          [value]="option">
          {{option}}
        </mat-option>
      </mat-autocomplete>
      <mat-error>{{ error }}</mat-error>
    </mat-form-field>
  `,
  standalone: false
})
export class CustomAutocompleteControlRenderer extends JsonFormsControl {
  override form: FormControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  isLoading = false;
  options: string[] = [];

  constructor(service: JsonFormsAngularService) {
    super(service);
    this.filteredOptions = this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  override ngOnInit() {
    super.ngOnInit();
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => fetchSuggestions(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((options: string[]) => this.options = options);
  }

  override onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.form.setValue(value);
  }

  onSelect(event: MatAutocompleteSelectedEvent) {
    this.form.setValue(event.option.value);
    this.onChange({ target: { value: event.option.value } } as any);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => 
      option.toLowerCase().includes(filterValue)
    );
  }
}

export const industryTester = () => 5;
