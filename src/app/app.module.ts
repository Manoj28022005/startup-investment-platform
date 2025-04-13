import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InvestorDashboardComponent } from './components/investor-dashboard/investor-dashboard.component';
import { FounderDashboardComponent } from './components/founder-dashboard/founder-dashboard.component';
import { StartupProfileComponent } from './components/startup-profile/startup-profile.component';
import { PitchInformationComponent } from './components/pitch-information/pitch-information.component';
import { FundingRequirementsComponent } from './components/funding-requirements/funding-requirements.component';
import { FounderDetailsComponent } from './components/founder-details/founder-details.component';
import { TeamTalentComponent } from './components/team-talent/team-talent.component';
import { TractionMilestonesComponent } from './components/traction-milestones/traction-milestones.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { PreviewSubmitComponent } from './components/preview-submit/preview-submit.component';

// Services
import { FormStateService } from './services/form-state.service';

import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    
    // Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatStepperModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,

  ],
  providers: [FormStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
