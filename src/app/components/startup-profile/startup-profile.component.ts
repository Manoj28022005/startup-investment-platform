import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PitchInformationComponent } from '../pitch-information/pitch-information.component';
import { TeamTalentComponent } from '../team-talent/team-talent.component';
import { TractionMilestonesComponent } from '../traction-milestones/traction-milestones.component';
import { FundingRequirementsComponent } from '../funding-requirements/funding-requirements.component';
import { DocumentsComponent } from '../documents/documents.component';
import { PreviewSubmitComponent } from '../preview-submit/preview-submit.component';

@Component({
  selector: 'app-startup-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    PitchInformationComponent,
    TeamTalentComponent,
    TractionMilestonesComponent,
    FundingRequirementsComponent,
    DocumentsComponent,
    PreviewSubmitComponent
  ],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Create Your Startup Profile</h1>

      <mat-stepper linear #stepper>
        <mat-step>
          <ng-template matStepLabel>Pitch Information</ng-template>
          <app-pitch-information
            (next)="stepper.next()"
            (formData)="onPitchDataUpdate($event)">
          </app-pitch-information>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Team & Talent</ng-template>
          <app-team-talent
            (back)="stepper.previous()"
            (next)="stepper.next()"
            (formData)="onTeamDataUpdate($event)">
          </app-team-talent>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Traction & Milestones</ng-template>
          <app-traction-milestones
            (back)="stepper.previous()"
            (next)="stepper.next()"
            (formData)="onTractionDataUpdate($event)">
          </app-traction-milestones>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Funding Requirements</ng-template>
          <app-funding-requirements
            (back)="stepper.previous()"
            (next)="stepper.next()"
            (formData)="onFundingDataUpdate($event)">
          </app-funding-requirements>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Documents</ng-template>
          <app-documents
            (back)="stepper.previous()"
            (next)="stepper.next()"
            (formData)="onDocumentsUpdate($event)">
          </app-documents>
        </mat-step>

        <mat-step>
          <ng-template matStepLabel>Preview & Submit</ng-template>
          <app-preview-submit
            [data]="profileData"
            (back)="stepper.previous()"
            (submit)="onSubmit()">
          </app-preview-submit>
        </mat-step>
      </mat-stepper>
    </div>
  `
})
export class StartupProfileComponent {
  profileData: any = {
    pitch: null,
    team: null,
    traction: null,
    funding: null,
    documents: null
  };

  onPitchDataUpdate(data: any) {
    this.profileData.pitch = data;
  }

  onTeamDataUpdate(data: any) {
    this.profileData.team = data;
  }

  onTractionDataUpdate(data: any) {
    this.profileData.traction = data;
  }

  onFundingDataUpdate(data: any) {
    this.profileData.funding = data;
  }

  onDocumentsUpdate(data: any) {
    this.profileData.documents = data;
  }

  onSubmit() {
    console.log('Submitting profile:', this.profileData);
    // TODO: Implement API call to submit profile
  }
}
