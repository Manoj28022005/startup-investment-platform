import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-6">Upload Documents</h2>

      <div class="space-y-6">
        <mat-card>
          <mat-card-content>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <mat-icon class="text-4xl mb-4">cloud_upload</mat-icon>
                  <p class="mb-2 text-sm text-gray-500">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-500">
                    PDF, DOC, DOCX (MAX. 10MB)
                  </p>
                </div>
                <input type="file" class="hidden" (change)="onFileSelected($event)" multiple accept=".pdf,.doc,.docx"/>
              </label>
            </div>
          </mat-card-content>
        </mat-card>

        <div *ngIf="uploadedFiles.length > 0" class="space-y-4">
          <h3 class="text-lg font-semibold">Uploaded Documents</h3>
          <div *ngFor="let file of uploadedFiles" class="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div class="flex items-center">
              <mat-icon class="mr-2">description</mat-icon>
              <span>{{ file.name }}</span>
            </div>
            <button mat-icon-button color="warn" (click)="removeFile(file)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <button mat-button (click)="onBack()">Back</button>
        <button mat-raised-button color="primary" (click)="onNext()">Next</button>
      </div>
    </div>
  `
})
export class DocumentsComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() formData = new EventEmitter<any>();

  uploadedFiles: File[] = [];

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size <= 10 * 1024 * 1024) { // 10MB limit
          this.uploadedFiles.push(files[i]);
        }
      }
    }
  }

  removeFile(file: File) {
    const index = this.uploadedFiles.indexOf(file);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
    }
  }

  onNext() {
    this.formData.emit({
      documents: this.uploadedFiles
    });
    this.next.emit();
  }

  onBack() {
    this.back.emit();
  }
}
