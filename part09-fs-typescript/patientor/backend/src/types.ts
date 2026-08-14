import type { z } from 'zod';
import type { NewPatientSchema } from './utils.ts';

export const Gender = ['male', 'female', 'other'];

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string,
};
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
};

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string,
  entries: Entry[]
};

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NonSensitiveDiagnosisEntry = Omit<DiagnosisEntry, 'latin'>;