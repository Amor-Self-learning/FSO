import type { z } from 'zod';
import type { NewPatientSchema } from './utils.ts';

export const Gender = ['male', 'female', 'other'];
const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

export interface DiagnosisEntry {
  code: string,
  name: string,
  latin?: string,
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnosisEntry['code']>;
};
type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
};

interface Discharge {
  date: string,
  criteria: string
};

interface SickLeave {
  startDate: string,
  endDate: string
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: SickLeave
};

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
};

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