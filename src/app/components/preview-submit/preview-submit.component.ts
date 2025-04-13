import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-preview-submit',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    CurrencyPipe
  ],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-6">Preview Your Profile</h2>

      <div class="space-y-6">
        <!-- Pitch Information -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Pitch Information</mat-card-title>
          </mat-card-header>
          <mat-card-content class="mt-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold">Startup Name</p>
                <p>{{data?.pitch?.startupName}}</p>
              </div>
              <div>
                <p class="font-semibold">Industry</p>
                <p>{{data?.pitch?.industry}}</p>
              </div>
              <div class="col-span-2">
                <p class="font-semibold">One-Line Pitch</p>
                <p>{{data?.pitch?.oneLiner}}</p>
              </div>
              <div class="col-span-2">
                <p class="font-semibold">Problem</p>
                <p>{{data?.pitch?.problem}}</p>
              </div>
              <div class="col-span-2">
                <p class="font-semibold">Solution</p>
                <p>{{data?.pitch?.solution}}</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Team & Talent -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Team & Talent</mat-card-title>
          </mat-card-header>
          <mat-card-content class="mt-4">
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold mb-2">Team Members</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div *ngFor="let member of data?.team?.teamMembers" class="p-4 border rounded">
                    <p class="font-semibold">{{member.fullName}}</p>
                    <p>{{member.role}}</p>
                    <p>{{member.experience}} years experience</p>
                    <a *ngIf="member.linkedin" [href]="member.linkedin" target="_blank" 
                       class="text-blue-600 hover:underline">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-2">Tech Stack</h3>
                <div class="flex flex-wrap gap-2">
                  <span *ngFor="let tech of data?.team?.techStack" 
                        class="px-3 py-1 bg-gray-100 rounded-full">
                    {{tech}}
                  </span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Traction & Milestones -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Traction & Milestones</mat-card-title>
          </mat-card-header>
          <mat-card-content class="mt-4">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p class="font-semibold">Users/Customers</p>
                  <p>{{data?.traction?.userCount}}</p>
                </div>
                <div>
                  <p class="font-semibold">Monthly Revenue</p>
                  <p>{{data?.traction?.monthlyRevenue | currency:'USD'}}</p>
                </div>
                <div>
                  <p class="font-semibold">Growth Rate</p>
                  <p>{{data?.traction?.growthRate}}% per month</p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-2">Key Milestones</h3>
                <div class="space-y-2">
                  <div *ngFor="let milestone of data?.traction?.milestones" 
                       class="p-4 border rounded">
                    <p class="font-semibold">{{milestone.title}}</p>
                    <p>{{milestone.date | date}}</p>
                    <p>{{milestone.description}}</p>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Funding Requirements -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Funding Requirements</mat-card-title>
          </mat-card-header>
          <mat-card-content class="mt-4">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="font-semibold">Funding Stage</p>
                  <p>{{data?.funding?.fundingStage}}</p>
                </div>
                <div>
                  <p class="font-semibold">Amount Required</p>
                  <p>{{data?.funding?.amountRequired | currency:'USD'}}</p>
                </div>
                <div>
                  <p class="font-semibold">Equity Offered</p>
                  <p>{{data?.funding?.equityOffered}}%</p>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-2">Fund Allocation</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p>Product Development</p>
                    <p>{{data?.funding?.productDevelopment}}%</p>
                  </div>
                  <div>
                    <p>Marketing</p>
                    <p>{{data?.funding?.marketing}}%</p>
                  </div>
                  <div>
                    <p>Operations</p>
                    <p>{{data?.funding?.operations}}%</p>
                  </div>
                  <div>
                    <p>Team Expansion</p>
                    <p>{{data?.funding?.teamExpansion}}%</p>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Documents -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Documents</mat-card-title>
          </mat-card-header>
          <mat-card-content class="mt-4">
            <div class="space-y-2">
              <div *ngFor="let doc of data?.documents?.files" class="flex items-center gap-2">
                <mat-icon>description</mat-icon>
                <span>{{doc.name}}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="flex justify-between mt-6">
        <button mat-button type="button" (click)="onBack()">Back</button>
        <button mat-raised-button color="primary" (click)="onSubmit()">
          Submit Profile
        </button>
      </div>
    </div>
  `
})
export class PreviewSubmitComponent {
  @Input() data: any;
  @Output() back = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  onSubmit() {
    this.submit.emit();
  }
}
