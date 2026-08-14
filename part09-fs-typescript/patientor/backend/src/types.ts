import type { z } from 'zod';
import type {
  NewPatientSchema,
  DiagnosisSchema,
  HealthCheckEntrySchema,
  OccupationalHealthcareSchema,
  HospitalEntrySchema
} from './utils.ts';

export type DiagnosisEntry = z.infer<typeof DiagnosisSchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareSchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NewPatientEntry = z.infer<typeof NewPatientSchema>;

export interface PatientEntry extends NewPatientEntry {
  id: string,
  entries: Entry[]
};
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NonSensitiveDiagnosisEntry = Omit<DiagnosisEntry, 'latin'>;