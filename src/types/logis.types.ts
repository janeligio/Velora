export type Organization = {
  id: string;
  name: string;
};

export type User = {
  id: number;
  displayName: string;
  email: string;
  organizationId: string;
  organization?: Organization;
  theme?: 'light' | 'dark';
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isSystemUser: boolean;
  isExternalUser: boolean;
  isInternalUser: boolean;
  isGuestUser: boolean;
};

export enum Status {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
  Rejected = 3,
}

export type Report = {
  id: number;
  title: string;
  source: string;
  actions: string;
  criticalInfo: string;
  status: Status;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number; // User ID of the creator
  createdByOrg: number; // Organization ID of the creator
};

export type Assessment = {
  id: number;
  status: Status;
  createdAt: string;
  updatedAt: string;
  organizationId: number;
  organization?: Organization;
};

export type SubAssessment = {
  id: number;
  status: Status;
  assessmentId: number; // ID of the parent assessment
  assessment?: Assessment; // Optional reference to the parent assessment
  bluf: string; // Bottom Line Up Front
  info: string; // Additional information
  createdAt: string;
  updatedAt: string;
  responsiblePersonId: number; // User ID of the responsible person
};

export type SubAssessmentFeedback = {
  id: number;
  subAssessmentId: number; // ID of the parent sub-assessment
  subAssessment?: SubAssessment; // Optional reference to the parent sub-assessment
  createdBy: number; // User ID of the creator
  createdAt: string;
  status: Status;
  information: string; // Feedback information
};

export type FinalOutput = {
  id: number;
  reportId: number; // ID of the associated report
  information: string; // Final output information
  status: Status; // Status of the final output
};
