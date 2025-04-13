import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface StartupProfile {
  startupName: string;
  websiteUrl: string;
  foundingYear: number;
  industryType: string;
  location: string;
  teamSize: string;
  startupStage: string;
}

export interface PitchInformation {
  pitchType: string;
  pitchSummary: string;
  problemStatement: string;
  solutionSummary: string;
  uniqueSellingPoint: string;
  pitchDeckFile?: File;
}

export interface FundingRequirements {
  fundingStage: string;
  amountRequired: number;
  useOfFunds: {
    [key: string]: number;  // Percentage allocation
  };
  timelineToRaise: string;
  previouslyRaised: boolean;
  previousInvestors?: string;
}

export interface FounderDetails {
  founderName: string;
  founderEmail: string;
  linkedinProfile: string;
  background: string;
  hasCoFounders: boolean;
  coFounders?: Array<{
    name: string;
    email: string;
    role: string;
    background: string;
  }>;
}

export interface TeamTalent {
  totalEmployees: number;
  keyTeamMembers: Array<{
    name: string;
    role: string;
    experience: string;
  }>;
  hiringPlans: string;
  techStack: string[];
}

export interface TractionMilestones {
  numberOfUsers: number;
  monthlyRevenue: number;
  keyMilestones: Array<{
    milestone: string;
    date: Date;
  }>;
  marketOpportunity: string;
}

export interface Documents {
  pitchDeck?: File;
  financials?: File;
  registrationCertificate?: File;
  productDemoUrl?: string;
}

export interface StartupFormData {
  startupProfile: StartupProfile;
  pitchInformation: PitchInformation;
  fundingRequirements: FundingRequirements;
  founderDetails: FounderDetails;
  teamTalent: TeamTalent;
  tractionMilestones: TractionMilestones;
  documents: Documents;
  currentStep: number;
}

const INITIAL_STATE: StartupFormData = {
  startupProfile: {
    startupName: '',
    websiteUrl: '',
    foundingYear: new Date().getFullYear(),
    industryType: '',
    location: '',
    teamSize: '',
    startupStage: ''
  },
  pitchInformation: {
    pitchType: '',
    pitchSummary: '',
    problemStatement: '',
    solutionSummary: '',
    uniqueSellingPoint: ''
  },
  fundingRequirements: {
    fundingStage: '',
    amountRequired: 0,
    useOfFunds: {},
    timelineToRaise: '',
    previouslyRaised: false
  },
  founderDetails: {
    founderName: '',
    founderEmail: '',
    linkedinProfile: '',
    background: '',
    hasCoFounders: false,
    coFounders: []
  },
  teamTalent: {
    totalEmployees: 0,
    keyTeamMembers: [],
    hiringPlans: '',
    techStack: []
  },
  tractionMilestones: {
    numberOfUsers: 0,
    monthlyRevenue: 0,
    keyMilestones: [],
    marketOpportunity: ''
  },
  documents: {},
  currentStep: 0
};

@Injectable({
  providedIn: 'root'
})
export class FormStateService {
  private formData = new BehaviorSubject<StartupFormData>(INITIAL_STATE);
  
  constructor() {
    // Load from localStorage if available
    const savedData = localStorage.getItem('startupFormData');
    if (savedData) {
      this.formData.next(JSON.parse(savedData));
    }
  }

  getFormData(): Observable<StartupFormData> {
    return this.formData.asObservable();
  }

  getCurrentStep(): number {
    return this.formData.value.currentStep;
  }

  updateStartupProfile(data: StartupProfile) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      startupProfile: data
    };
    this.saveData(newData);
  }

  updatePitchInformation(data: PitchInformation) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      pitchInformation: data
    };
    this.saveData(newData);
  }

  updateFundingRequirements(data: FundingRequirements) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      fundingRequirements: data
    };
    this.saveData(newData);
  }

  updateFounderDetails(data: FounderDetails) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      founderDetails: data
    };
    this.saveData(newData);
  }

  updateTeamTalent(data: TeamTalent) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      teamTalent: data
    };
    this.saveData(newData);
  }

  updateTractionMilestones(data: TractionMilestones) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      tractionMilestones: data
    };
    this.saveData(newData);
  }

  updateDocuments(data: Documents) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      documents: data
    };
    this.saveData(newData);
  }

  setStep(step: number) {
    const currentData = this.formData.value;
    const newData = {
      ...currentData,
      currentStep: step
    };
    this.saveData(newData);
  }

  private saveData(data: StartupFormData) {
    this.formData.next(data);
    localStorage.setItem('startupFormData', JSON.stringify(data));
  }

  resetForm() {
    localStorage.removeItem('startupFormData');
    this.formData.next(INITIAL_STATE);
  }
}
