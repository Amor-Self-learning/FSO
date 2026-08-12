export const GenderValues = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string,
};

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn?: string,
  gender: string,
  occupation: string
};

export type Gender = typeof GenderValues[keyof typeof GenderValues];
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NonSensitiveDiagnosisEntry = Omit<DiagnosisEntry, 'latin'>;