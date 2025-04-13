import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Investor {
  id: string;
  name: string;
  expertise: string[];
  investmentRange: string;
}

@Component({
  selector: 'app-founder-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule
  ],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Founder Dashboard</h1>

      <div *ngIf="!hasProfile" class="mb-8">
        <mat-card>
          <mat-card-content>
            <div class="text-center py-8">
              <h2 class="text-xl mb-4">Complete Your Startup Profile</h2>
              <p class="text-gray-600 mb-4">Create your startup profile to connect with investors</p>
              <button mat-raised-button color="primary" (click)="createProfile()">
                Create Profile
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="hasProfile">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Available Investors</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="grid gap-4 mt-4">
                <div *ngFor="let investor of investors" class="border rounded-lg p-4">
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="text-lg font-semibold">{{investor.name}}</h3>
                      <p class="text-gray-600">Investment Range: {{investor.investmentRange}}</p>
                      <div class="mt-2">
                        <mat-chip-set>
                          <mat-chip *ngFor="let expertise of investor.expertise">
                            {{expertise}}
                          </mat-chip>
                        </mat-chip-set>
                      </div>
                    </div>
                    <button mat-raised-button color="primary" (click)="requestFunding(investor)">
                      Request Funding
                    </button>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card>
            <mat-card-header>
              <mat-card-title>Your Funding Requests</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="fundingRequests" class="w-full">
                <ng-container matColumnDef="investor">
                  <th mat-header-cell *matHeaderCellDef>Investor</th>
                  <td mat-cell *matCellDef="let request">{{request.investor}}</td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let request">
                    <mat-chip [color]="getStatusColor(request.status)" selected>
                      {{request.status}}
                    </mat-chip>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class FounderDashboardComponent implements OnInit {
  hasProfile = false;
  investors: Investor[] = [];
  fundingRequests: any[] = [];
  displayedColumns: string[] = ['investor', 'status'];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.checkProfile();
    this.loadInvestors();
    this.loadFundingRequests();
  }

  checkProfile() {
    const userId = localStorage.getItem('userId');
    this.http.get<any>(`http://localhost:3000/api/founders/${userId}/profile`)
      .subscribe(
        profile => {
          this.hasProfile = !!profile;
        },
        error => {
          this.hasProfile = false;
        }
      );
  }

  createProfile() {
    this.router.navigate(['/startup-profile']);
  }

  loadInvestors() {
    this.http.get<Investor[]>('http://localhost:3000/api/investors')
      .subscribe(investors => {
        this.investors = investors;
      });
  }

  loadFundingRequests() {
    const userId = localStorage.getItem('userId');
    this.http.get<any[]>(`http://localhost:3000/api/founders/${userId}/funding-requests`)
      .subscribe(requests => {
        this.fundingRequests = requests;
      });
  }

  requestFunding(investor: Investor) {
    const userId = localStorage.getItem('userId');
    this.http.post(`http://localhost:3000/api/funding-requests`, {
      founderId: userId,
      investorId: investor.id
    }).subscribe(() => {
      this.loadFundingRequests();
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'verified':
        return 'primary';
      case 'rejected':
        return 'warn';
      default:
        return 'accent';
    }
  }
}
