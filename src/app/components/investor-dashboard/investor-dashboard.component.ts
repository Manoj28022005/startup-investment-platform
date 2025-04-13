import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';

interface RequestStats {
  key: string;
  value: number;
}

interface FundingRequest {
  startupName: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-investor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatMenuModule,
    DecimalPipe
  ],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Investor Dashboard</h1>
      
      <div class="grid grid-cols-4 gap-4 mb-8">
        <div *ngFor="let stat of requestStats" class="bg-white p-4 rounded-lg shadow">
          <div class="text-gray-600 capitalize">{{stat.key.replace('_', ' ')}}</div>
          <div class="text-2xl font-semibold mt-1">{{stat.value}}</div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow">
        <table mat-table [dataSource]="fundingRequests" class="w-full">
          <!-- Startup Name Column -->
          <ng-container matColumnDef="startupName">
            <th mat-header-cell *matHeaderCellDef>Startup Name</th>
            <td mat-cell *matCellDef="let request">{{request.startupName}}</td>
          </ng-container>

          <!-- Amount Column -->
          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let request">\${{request.amount | number}}</td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let request">
              <mat-chip-set>
                <mat-chip [color]="getStatusColor(request.status)" selected>
                  {{request.status}}
                </mat-chip>
              </mat-chip-set>
            </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let request">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item (click)="viewDetails(request)">
                  <mat-icon>visibility</mat-icon>
                  <span>View Details</span>
                </button>
                <button mat-menu-item (click)="updateStatus(request, 'verified')" *ngIf="request.status === 'pending'">
                  <mat-icon>check_circle</mat-icon>
                  <span>Verify</span>
                </button>
                <button mat-menu-item (click)="updateStatus(request, 'rejected')" *ngIf="request.status === 'pending'">
                  <mat-icon>cancel</mat-icon>
                  <span>Reject</span>
                </button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class InvestorDashboardComponent implements OnInit {
  requestStats: RequestStats[] = [
    { key: 'total_requests', value: 25 },
    { key: 'pending_verification', value: 10 },
    { key: 'verified', value: 12 },
    { key: 'rejected', value: 3 }
  ];

  fundingRequests: FundingRequest[] = [
    {
      startupName: 'Tech Innovators',
      amount: 500000,
      status: 'pending'
    },
    {
      startupName: 'Green Energy Solutions',
      amount: 750000,
      status: 'verified'
    },
    {
      startupName: 'AI Research Labs',
      amount: 1000000,
      status: 'rejected'
    }
  ];

  displayedColumns: string[] = ['startupName', 'amount', 'status', 'actions'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDashboardStats();
    this.loadFundingRequests();
  }

  loadDashboardStats() {
    this.http.get<RequestStats[]>('http://localhost:3000/api/investors/dashboard-stats')
      .subscribe(stats => {
        this.requestStats = stats;
      });
  }

  loadFundingRequests() {
    this.http.get<FundingRequest[]>('http://localhost:3000/api/investors/requests')
      .subscribe(requests => {
        this.fundingRequests = requests;
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

  viewDetails(request: FundingRequest): void {
    // Implement view details logic
  }

  updateStatus(request: FundingRequest, newStatus: string): void {
    this.http.patch(`http://localhost:3000/api/investors/requests/${request.startupName}/status`, { status: newStatus })
      .subscribe(() => {
        this.loadDashboardStats();
        this.loadFundingRequests();
      });
  }
}
