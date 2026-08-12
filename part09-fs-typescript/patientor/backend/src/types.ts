import type { z } from 'zod';
import type { NewPatientSchema } from './utils.ts';

export const Gender = ['male', 'female', 'other'];

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string,
};

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string,
};

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
export type NonSensitiveDiagnosisEntry = Omit<DiagnosisEntry, 'latin'>;